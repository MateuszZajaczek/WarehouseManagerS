using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WarehouseManager.API.Middleware;
using WarehouseManager.API.Data;
using WarehouseManager.API.Interfaces;
using WarehouseManager.API.Services;
using WarehouseManager.API.Repositories;
using System.Text.Json.Serialization;


namespace WarehouseManagerS
{
    public class Program
    {
        
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews()

                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });


            builder.Services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); // DB connection
            });
            builder.Services.AddCors();

            builder.Services.AddScoped<ITokenService, TokenService>(); // Token service.

            builder.Services.AddScoped<IOrderRepository, OrderRepository>();
            builder.Services.AddScoped<IOrderService, OrderService>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();
            builder.Services.AddScoped<IInventoryTransactionRepository, InventoryTransactionRepository>();
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); //  AutoMapper, Delete or useful??? // Considerating //  Maybe in future

            // Authentication method with TokenKey JWT
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
                    };
                });

            // Authorization method based on roles.
            builder.Services.AddAuthorization(options =>
                {
                    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                    options.AddPolicy("RequireManagerRole", policy => policy.RequireRole("Admin", "Manager"));
                    options.AddPolicy("RequireStaffRole", policy => policy.RequireRole("Admin", "Manager", "Staff"));
                });

            var app = builder.Build();

            app.UseMiddleware<ExceptionMiddleware>();  // Errors handling middleware
            app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200")); //  CORS added for policy rules to avoid https problems.
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }


    }
}

