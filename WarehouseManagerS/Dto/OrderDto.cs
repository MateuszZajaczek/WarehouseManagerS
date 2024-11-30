﻿// DTOs/OrderDto.cs
namespace WarehouseManager.API.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; } // Matches 'orderId' in Angular model
        public int UserId { get; set; }
        public string UserName { get; set; } // User's username
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }
}