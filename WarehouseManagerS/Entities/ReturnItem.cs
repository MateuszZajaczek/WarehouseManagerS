using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManager.API.Entities
{
    public class ReturnItem
    {
        public int ReturnItemId { get; set; }

        public int ReturnId { get; set; } // Foreign key to Return

        public int OrderItemId { get; set; } // Foreign key to OrderItem

        public int Quantity { get; set; }

        public string Reason { get; set; }

        public decimal RefundAmount { get; set; } // Calculated as Quantity * UnitPrice

        // Navigation Properties
        [ForeignKey("ReturnId")]
        public Return Return { get; set; }
        [ForeignKey("OrderItemId")]
        public OrderItem OrderItem { get; set; }
    }
}
