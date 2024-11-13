using WarehouseManagerS.Entities;

namespace WarehouseManagerS.Interfaces
{
    public interface IProductRepository
    {
    void Update(Product product);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<Product?> GetProductByIdAsync(int id);
    Task<Product?> GetProductByNameAsync(string name);  
    }
};


