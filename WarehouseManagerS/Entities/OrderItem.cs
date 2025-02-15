using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManager.API.Entities
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; } 

        public int ProductId { get; set; } 

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; } 
        public decimal TotalPrice { get; set; } 

        // Relation
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public ICollection<ReturnItem> ReturnItems { get; set; }
    }
}
