using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Data;
using WarehouseManager.API.Entities;
using Microsoft.AspNetCore.Authorization;

namespace WarehouseManager.API.Controllers
{
    public class BuggyController(DataContext context) : BaseApiController
    {
        
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "Secret Text";
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var thing = context.Products.Find(-1);

            if (thing == null) return NotFound("Nie znaleziono produktu");

            return "Secret Text";
        }

        [HttpGet("server-error")]

        public ActionResult<AppUser> GetServerError()
        {
            var thing = context.Users.Find(-1) ?? throw new Exception("Server Error");
            return thing;   
        }

        [HttpGet("bad-request")]

        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Błąd żadania, spróbuj czegoś innego");
        }
    }
}

