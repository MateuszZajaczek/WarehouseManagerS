namespace WarehouseManager.API.Entities
{
    public class Product
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string Description { get; set; }

        public string SKU { get; set; } // Stock identificator used in WarehouseS

        public int QuantityInStock { get; set; }

        public decimal UnitPrice { get; set; }

        public int? CategoryId { get; set; } 

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relation
        public Category Category { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<InventoryTransaction> InventoryTransactions { get; set; }
    }
}
