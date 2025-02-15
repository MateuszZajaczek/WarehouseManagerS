using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Data;

// Future extension, for any admin things & inserting or withdrawing items from database.
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
