using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WarehouseManager.API.Data;
using WarehouseManager.API.Dto;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Interfaces;


namespace WarehouseManager.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenservice;

        public AccountController(DataContext context, ITokenService tokenService)
        {

            _context = context;
            _tokenservice = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("Użytkownik nie istnieje");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Błędny login lub hasło");
            }

            var token = _tokenservice.CreateToken(user);

            var userDto = new UserDto
            {
                UserId = user.Id,
                UserName = user.UserName,
                Token = token,
                Role = user.Role.ToString() 
            };
            return Ok(userDto);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("register")] // POST account register

        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            Console.WriteLine($"Received payload: {registerDto}");
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                Email = registerDto.Email,
                Role = registerDto.Role,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [Authorize(Policy = "RequireAdminRole")]
        public ActionResult GetUsers()
        {
            return Ok();
        }
    }
}
