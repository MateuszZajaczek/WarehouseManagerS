using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManagerS.Entities
{
    public class InventoryTransaction
    {
        public int TransactionId { get; set; }

        public int ProductId { get; set; } // Foreign key to Product

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        public int QuantityChange { get; set; } // Positive or negative

        public string TransactionType { get; set; } // e.g., "Order", "Return", "Adjustment"

        public int? ReferenceId { get; set; } // OrderId, ReturnId, etc.

        public string Notes { get; set; }

        // Navigation Properties
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
