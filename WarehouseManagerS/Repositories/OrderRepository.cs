using Microsoft.EntityFrameworkCore;
using WarehouseManager.API.Data;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Interfaces;

namespace WarehouseManager.API.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context; // Database context

        public OrderRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Order> AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order); // Add new order to context
            return order; // Return the added order
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .ToListAsync();
        }


        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.User) // Add user to order
                .Include(o => o.OrderItems) // Add position to order
                    .ThenInclude(oi => oi.Product) // Add product to every position in order.
                .FirstOrDefaultAsync(o => o.OrderId == id);
        }


        public void Update(Order order)
        {
            _context.Entry(order).State = EntityState.Modified; // Mark order as modified
        }

        public async Task<bool> SaveAllAsync()
        {
            // Save changes and return true if successful
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
