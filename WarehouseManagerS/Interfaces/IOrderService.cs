using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Interfaces
{
    public interface IOrderService
    {
        Task<bool> CreateOrderAsync(Order order); 
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<bool> AcceptOrderAsync(int orderId);
        Task<Order> GetOrderByIdAsync(int id);
        Task<bool> CancelOrderAsync(int orderId);
    }
}
