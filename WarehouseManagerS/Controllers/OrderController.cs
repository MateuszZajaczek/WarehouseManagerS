using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Entities;
using WarehouseManager.API.Interfaces;
using WarehouseManager.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WarehouseManager.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        // Get all orders.
        [Authorize(Policy = "RequireStaffRole")]
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

        // Get the order by unique ID
        [Authorize(Policy = "RequireStaffRole")]
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            // Manual mapping to avoid reference loop |
            // Stayed with this solution to keep higher control instead of using automapper.
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

        // Create new order
        [Authorize(Policy = "RequireAdminRole")]
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

            return Ok(new { message = "Order created successfully." });
        }

        // Cancel the order
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(int orderId)
        {
            var result = await _orderService.CancelOrderAsync(orderId);

            if (!result)
                return BadRequest("Unable to cancel the order.");

            return Ok("Order canceled successfully.");
        }

        // Accept the order
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}/accept")]
        public async Task<ActionResult> AcceptOrder(int id)
        {
            var success = await _orderService.AcceptOrderAsync(id);

            if (!success)
                return BadRequest("Unable to accept order due to insufficient stock or order not found.");

            return Ok(new { message = "Zamówienie przyjęte." });
        }
    }
}
