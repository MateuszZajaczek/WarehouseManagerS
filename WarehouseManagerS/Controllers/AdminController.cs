using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WarehouseManager.API.Controllers;
using WarehouseManager.API.Data;
using WarehouseManager.API.Dto;
using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : BaseApiController
    {
        private readonly DataContext _context;
        public AdminController(DataContext context)

        {
            _context = context;
        }
    }
}
