using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManager.API.Entities
{
    public class ReturnItem
    {
        public int ReturnItemId { get; set; }

        public int ReturnId { get; set; } 

        public int OrderItemId { get; set; } 

        public int Quantity { get; set; }

        public string Reason { get; set; }

        public decimal RefundAmount { get; set; } 

        // Relation
        [ForeignKey("ReturnId")]
        public Return Return { get; set; }
        [ForeignKey("OrderItemId")]
        public OrderItem OrderItem { get; set; }
    }
}
