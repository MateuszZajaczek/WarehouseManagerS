using Microsoft.EntityFrameworkCore;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Interfaces;

namespace WarehouseManager.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository; // Order repository
        private readonly IProductRepository _productRepository; // Product repository
        private readonly IInventoryTransactionRepository _inventoryTransactionRepository;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IInventoryTransactionRepository inventoryTransactionRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _inventoryTransactionRepository = inventoryTransactionRepository;
        }

        // Create order method.
        public async Task<bool> CreateOrderAsync(Order order)
        {
            // Calculate total amount
            decimal totalAmount = 0;

            foreach (var item in order.OrderItems)
            {
                // Get product details
                var product = await _productRepository.GetProductByIdAsync(item.ProductId);
                if (product == null)
                {
                    // Handle product not found
                    return false;
                }

                // Check if enough stock is available
                if (product.QuantityInStock < item.Quantity)
                {
                    // Not enough stock available
                    return false;
                }

                // Subtract the stock immediately
                product.QuantityInStock -= item.Quantity;
                _productRepository.Update(product);

                item.UnitPrice = product.UnitPrice; // Capture unit price at order time
                item.TotalPrice = item.Quantity * item.UnitPrice; // Calculate total price for item

                totalAmount += item.TotalPrice; // Accumulate total amount

                // Record inventory transaction
                var transaction = new InventoryTransaction
                {
                    ProductId = product.ProductId,
                    TransactionDate = DateTime.UtcNow,
                    QuantityChange = -item.Quantity, // Physical stock deduction
                    TransactionType = "Zamówienie utworzone",
                    ReferenceId = order.OrderId,
                    Notes = $"Stworzono zamówienie. ID zamówienia: {order.OrderId}"
                };
                await _inventoryTransactionRepository.AddTransactionAsync(transaction);
            }

            order.TotalAmount = totalAmount; // Set total amount for the order
            order.OrderStatus = "W trakcie przygotowania"; // Set initial status to "In Progress"

            await _orderRepository.AddOrderAsync(order); // Add order to repository

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
                // Only "In Progress" orders can be canceled
                return false;
            }

            foreach (var item in order.OrderItems)
            {
                var product = await _productRepository.GetProductByIdAsync(item.ProductId);
                if (product == null)
                    return false; // Product not found

                // Add the stock back
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
                // Only "In Progress" orders can be accepted
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

