using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManagerS.Entities
{
    public class Order
    {
        public int OrderId { get; set; }

        public int UserId { get; set; } // Foreign key to AppUser

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; }

        public string OrderStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("UserId")]
        public AppUser User { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
