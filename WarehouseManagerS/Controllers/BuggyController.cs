using Microsoft.AspNetCore.Mvc;
using WarehouseManagerS.Controllers;
using WarehouseManagerS.Data;
using WarehouseManagerS.Entities;

namespace WarehouseManagerS
{
    public class BuggyController(DataContext context) : BaseApiController
    {
        

        [HttpGet("auth")]

        public ActionResult<string> GetAuth()
        {
            return "Secret Text";
        }

        [HttpGet("not-found")]

        public ActionResult<string> GetNotFound()
        {
            var thing = context.Products.Find(-1);

            if (thing == null) return NotFound();

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
            return BadRequest("Bad request, try something else");
        }
    }
}

