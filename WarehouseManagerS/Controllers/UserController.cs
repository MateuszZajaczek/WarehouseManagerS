﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseManager.API.Data;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Controllers;

// Future Feature for listing existing users.

namespace WarehouseManager.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[Controller]")]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }
        // Get all users.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        // Get user by specific ID.
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
