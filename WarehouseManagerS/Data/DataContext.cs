using Microsoft.EntityFrameworkCore;
using WarehouseManagerS.Entities;
using WarehouseManagerS.Entities.Users;


namespace WarehouseManagerS.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Item> Items { get; set; }

    public DbSet<AppUser> Users { get; set; }
}
