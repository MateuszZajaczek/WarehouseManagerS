using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Interfaces
{
    public interface IOrderRepository
    {
        Task<bool> SaveAllAsync(); 
        void Update(Order order); 
        Task<IEnumerable<Order>> GetAllAsync(); 
        Task<Order> GetOrderByIdAsync(int id); 
        Task<Order> AddOrderAsync(Order order); 
    }
}
