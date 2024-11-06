namespace WarehouseManagerS.Entities
{
    public class Product
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string Description { get; set; }

        public string SKU { get; set; } // Stock Keeping Unit, unique identifier

        public int QuantityInStock { get; set; }

        public decimal UnitPrice { get; set; }

        public int? CategoryId { get; set; } // Foreign key to Category

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public Category Category { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public ICollection<InventoryTransaction> InventoryTransactions { get; set; }
    }
}
