using System.ComponentModel.DataAnnotations;

namespace WarehouseManagerS.Dto
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(25)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }    

    }
}
