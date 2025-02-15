namespace WarehouseManager.API.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public string Description { get; set; }

        // Relation
        public ICollection<Product> Products { get; set; }
    }
}
