using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WarehouseManagerS.Controllers;
using WarehouseManagerS.Data;
using WarehouseManagerS.Dto;
using WarehouseManagerS.Entities;

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
