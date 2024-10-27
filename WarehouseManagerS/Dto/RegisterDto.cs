using System.ComponentModel.DataAnnotations;
using WarehouseManagerS.Entities.Users;

namespace WarehouseManagerS.Dto
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(25)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public Role Role { get; set; }

    }
}
