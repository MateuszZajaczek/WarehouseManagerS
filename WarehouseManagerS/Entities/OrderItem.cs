﻿using System.ComponentModel.DataAnnotations.Schema;

namespace WarehouseManagerS.Entities
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; } // Foreign key to Order

        public int ProductId { get; set; } // Foreign key to Product

        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; } // Captured at order time

        public decimal TotalPrice => Quantity * UnitPrice;

        // Navigation Properties
        [ForeignKey("OrderId")]
        public Order Order { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
        public ICollection<ReturnItem> ReturnItems { get; set; }
    }
}