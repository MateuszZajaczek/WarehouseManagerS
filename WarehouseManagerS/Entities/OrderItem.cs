using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManager.API.Entities
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; } // Foreign key to Order

        public int ProductId { get; set; } // Foreign key to Product

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; } // Captured at order time
        public decimal TotalPrice { get; set; } // Store calculated total price

        // Navigation Properties
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public ICollection<ReturnItem> ReturnItems { get; set; }
    }
}
