using Microsoft.EntityFrameworkCore;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Interfaces;

namespace WarehouseManager.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository; 
        private readonly IProductRepository _productRepository; 
        private readonly IInventoryTransactionRepository _inventoryTransactionRepository;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IInventoryTransactionRepository inventoryTransactionRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _inventoryTransactionRepository = inventoryTransactionRepository;
        }


        public async Task<bool> CreateOrderAsync(Order order)
        {
            decimal totalAmount = 0;

            foreach (var item in order.OrderItems)
            {
                var product = await _productRepository.GetProductByIdAsync(item.ProductId);
                if (product == null)
                {
                    return false;
                }

                // Check if enough stock is available
                if (product.QuantityInStock < item.Quantity)
                {
                    // Not enough stock available
                    return false;
                }

                // Subtract the stock if enough in stock
                product.QuantityInStock -= item.Quantity;
                _productRepository.Update(product);

                item.UnitPrice = product.UnitPrice; 
                item.TotalPrice = item.Quantity * item.UnitPrice; 

                totalAmount += item.TotalPrice; 

                // Record inventory transaction
                var transaction = new InventoryTransaction
                {
                    ProductId = product.ProductId,
                    TransactionDate = DateTime.UtcNow,
                    QuantityChange = -item.Quantity, 
                    TransactionType = "Zamówienie utworzone",
                    ReferenceId = order.OrderId,
                    Notes = $"Stworzono zamówienie. ID zamówienia: {order.OrderId}"
                };
                await _inventoryTransactionRepository.AddTransactionAsync(transaction);
            }

            order.TotalAmount = totalAmount; 
            order.OrderStatus = "W trakcie przygotowania"; // default status 

            await _orderRepository.AddOrderAsync(order); 

            // Save changes
            var orderSaved = await _orderRepository.SaveAllAsync();
            return orderSaved;
        }
        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllAsync(); // Get all orders
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetOrderByIdAsync(id); // Get order by ID
        }

        public async Task<bool> CancelOrderAsync(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null)
                return false; // Order not found

            if (order.OrderStatus != "W trakcie przygotowania")
            {
                // Only "In Progres" orders can be canceled
                return false;
            }

            foreach (var item in order.OrderItems)
            {
                var product = await _productRepository.GetProductByIdAsync(item.ProductId);
                if (product == null)
                    return false; // Product not found

                // When Order is canceled, +items back to stock
                product.QuantityInStock += item.Quantity;
                _productRepository.Update(product);

                // Record inventory transaction
                var transaction = new InventoryTransaction
                {
                    ProductId = product.ProductId,
                    TransactionDate = DateTime.UtcNow,
                    QuantityChange = item.Quantity, // Stock returned
                    TransactionType = "Anulowanie zamówienia",
                    ReferenceId = order.OrderId,
                    Notes = $"Zamówienie anulowano. ID zamówienia: {order.OrderId}"
                };
                await _inventoryTransactionRepository.AddTransactionAsync(transaction);
            }

            order.OrderStatus = "Anulowane";
            _orderRepository.Update(order);

            // Save changes
            var orderSaved = await _orderRepository.SaveAllAsync();
            var productSaved = await _productRepository.SaveAllAsync();
            var transactionSaved = await _inventoryTransactionRepository.SaveAllAsync();

            return orderSaved && productSaved && transactionSaved;
        }


        public async Task<bool> AcceptOrderAsync(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null)
                return false; // Order not found

            if (order.OrderStatus != "W trakcie przygotowania")
            {
                return false;
            }

            // Update order status
            order.OrderStatus = "Wysłane";
            _orderRepository.Update(order);

            // Save changes
            return await _orderRepository.SaveAllAsync();
        }
    }
}

