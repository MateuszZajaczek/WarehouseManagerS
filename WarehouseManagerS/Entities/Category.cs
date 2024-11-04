﻿namespace WarehouseManagerS.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public string Description { get; set; }

        // Navigation Properties
        public ICollection<Product> Products { get; set; }
    }
}
