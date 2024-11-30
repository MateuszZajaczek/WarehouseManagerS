using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Interfaces
{
    public interface IOrderService
    {
        Task<bool> CreateOrderAsync(Order order); // Create a new order
        Task<IEnumerable<Order>> GetAllOrdersAsync(); // Get all orders
        Task<bool> AcceptOrderAsync(int orderId); // Accept an order
        Task<Order> GetOrderByIdAsync(int id);
        Task<bool> CancelOrderAsync(int orderId);
    }
}
