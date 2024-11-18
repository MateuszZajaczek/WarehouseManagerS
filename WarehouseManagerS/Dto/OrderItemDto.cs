// DTOs/OrderItemDto.cs
namespace WarehouseManager.API.DTOs
{
    public class OrderItemDto
    {
        public int OrderItemId { get; set; } // Matches 'orderItemId' in Angular model
        public int ProductId { get; set; }
        public string ProductName { get; set; } // For display purposes
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
