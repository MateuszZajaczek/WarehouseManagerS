using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManager.API.Entities
{
    public class InventoryTransaction
    {
        public int TransactionId { get; set; }

        public int ProductId { get; set; } 

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        public int QuantityChange { get; set; } 

        public string TransactionType { get; set; } 

        public int? ReferenceId { get; set; } 

        public string Notes { get; set; }

        // Relation
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
