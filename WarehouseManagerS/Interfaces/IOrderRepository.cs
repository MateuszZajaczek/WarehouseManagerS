using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Interfaces
{
    public interface IOrderRepository
    {
        Task<bool> SaveAllAsync(); // Save changes to the database
        void Update(Order order); // Update an existing order

        Task<IEnumerable<Order>> GetAllAsync(); // Get all orders with related data
        Task<Order> GetOrderByIdAsync(int id); // Get an order by its ID
        Task<Order> AddOrderAsync(Order order); // Add a new order
    }
}
