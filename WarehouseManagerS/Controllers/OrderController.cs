using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Interfaces;
using WarehouseManager.API.DTOs;

namespace WarehouseManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService; 
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();

            var ordersDto = orders.Select(order => new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                UserName = order.User.UserName,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                OrderStatus = order.OrderStatus,
                CreatedAt = order.CreatedAt,
                OrderItems = order.OrderItems.Select(item => new OrderItemDto
                {
                    OrderItemId = item.OrderItemId,
                    ProductId = item.ProductId,
                    ProductName = item.Product.ProductName,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.TotalPrice
                }).ToList()
            }).ToList();

            return Ok(ordersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id); // Pobierz zamówienie o danym ID
            if (order == null)
            {
                return NotFound(); // Zwróć NotFound, jeśli zamówienie nie istnieje
            }

            // Ręczne mapowanie do OrderDto, aby uniknąć cyklicznych referencji
            var orderDto = new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                UserName = order.User.UserName,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                OrderStatus = order.OrderStatus,
                CreatedAt = order.CreatedAt,
                OrderItems = order.OrderItems.Select(item => new OrderItemDto
                {
                    OrderItemId = item.OrderItemId,
                    ProductId = item.ProductId,
                    ProductName = item.Product.ProductName,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.TotalPrice
                }).ToList()
            };

            return Ok(orderDto);
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder(OrderDto orderDto)
        {
            var order = new Order
            {
                UserId = orderDto.UserId,
                OrderItems = orderDto.OrderItems.Select(oiDto => new OrderItem
                {
                    ProductId = oiDto.ProductId,
                    Quantity = oiDto.Quantity
                }).ToList()
            };

            var success = await _orderService.CreateOrderAsync(order);

            if (!success)
                return BadRequest("Error creating order.");

            return Ok("Order created successfully.");
        }

        [HttpPost("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(int orderId)
        {
            var result = await _orderService.CancelOrderAsync(orderId);

            if (!result)
                return BadRequest("Unable to cancel the order.");

            return Ok("Order canceled successfully.");
        }

        [HttpPut("{id}/accept")]
        public async Task<ActionResult> AcceptOrder(int id)
        {
            var success = await _orderService.AcceptOrderAsync(id); // Accept the order

            if (!success)
                return BadRequest("Unable to accept order due to insufficient stock or order not found."); // Error response

            return Ok("Order accepted and stock updated."); // Success response
        }
    }
}
