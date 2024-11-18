using Microsoft.EntityFrameworkCore;
using WarehouseManager.API.Dto;
using WarehouseManager.API.Data;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Interfaces;


namespace WarehouseManager.API.Repositories
{
    public class ProductRepository(DataContext context) : IProductRepository
    {
        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await context.Products
                .Include(p => p.Category) // Dołączenie kategorii do produktu
                .FirstOrDefaultAsync(p => p.ProductId == id);
        }


        public async Task<Product?> GetProductByNameAsync(string productname)
        {
            return await context.Products.SingleOrDefaultAsync(x => x.ProductName == productname);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await context.Products
                .Include(p => p.Category)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            context.Entry(product).State = EntityState.Modified;
        }
    }
}
