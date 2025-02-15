using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Dto;
using WarehouseManager.API.Interfaces;
using WarehouseManager.API.Controllers;
using WarehouseManager.API.Entities;


namespace WarehouseManagerS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class ProductsController(IProductRepository productRepository) : BaseApiController
    {
        // Get all products
        [Authorize(Policy = "RequireStaffRole")]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await productRepository.GetProductsAsync();
            var productDtos = products.Select(p => new ProductDto
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                QuantityInStock = p.QuantityInStock,
                CategoryName = p.Category.CategoryName, // Assuming Category has a Name property
                UnitPrice = p.UnitPrice,
            }).ToList();

            return Ok(productDtos);
        }

        // Get product by unique ID
        [Authorize(Policy = "RequireStaffRole")]
        [HttpGet("{id}")]
        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await productRepository.GetProductByIdAsync(id);

            if (product == null)
            {
                return null; 
            }

            // Manual mapping to avoid loop reference.
            return new ProductDto
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                QuantityInStock = product.QuantityInStock,
                CategoryName = product.Category?.CategoryName,
                UnitPrice = product.UnitPrice,
            };
        }

        // NotImplementedYet. /////////////////////////////////

        [HttpPost]
        public async Task<ActionResult<ProductDto>> AddProduct(Product Product)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            throw new NotImplementedException();
        }

        private bool ProductExists(int id)
        {
            throw new NotImplementedException();
        }
    }
}
