using System.ComponentModel.DataAnnotations;
using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Dto
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(25, ErrorMessage = "Nazwa użytkownik nie może być dłuższa niż 25 znaków")]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public Role Role { get; set; }
    }
}
