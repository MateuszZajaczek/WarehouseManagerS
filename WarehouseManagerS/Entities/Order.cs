﻿using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManager.API.Entities
{
    public class Order
    {
        public int OrderId { get; set; }

        public int UserId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; }

        public string OrderStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relation
        [ForeignKey("UserId")]
        public User User { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
