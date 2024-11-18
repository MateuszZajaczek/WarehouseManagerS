using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManager.API.Entities
{
    public class Return
    {
        public int ReturnId { get; set; }

        public int OrderId { get; set; } // Foreign key to Order

        public int UserId { get; set; } // Foreign key to AppUser

        public DateTime ReturnDate { get; set; } = DateTime.UtcNow;

        public decimal TotalRefunded { get; set; }

        public string ReturnStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public ICollection<ReturnItem> ReturnItems { get; set; }
    }
}
