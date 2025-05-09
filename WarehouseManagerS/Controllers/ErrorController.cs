using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Data;
using WarehouseManager.API.Entities;
using Microsoft.AspNetCore.Authorization;

namespace WarehouseManager.API.Controllers
{
    public class ErrorController(DataContext context) : BaseApiController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "Autentykacja";
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var thing = context.Products.Find(-1);

            if (thing == null) return NotFound("Nie znaleziono produktu");

            return "";
        }

        [HttpGet("server-error")]
        public ActionResult<User> GetServerError()
        {
            var thing = context.Users.Find(-1) ?? throw new Exception("Błąd serwera");
            return thing;   
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Błąd żądania, spróbuj czegoś innego");
        }
    }
}

