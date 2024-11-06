using System.ComponentModel.DataAnnotations;
using WarehouseManagerS.Entities;

namespace WarehouseManagerS.Dto
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(25, ErrorMessage = "Username must be less than 25 characters")]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public Role Role { get; set; }

    }
}
