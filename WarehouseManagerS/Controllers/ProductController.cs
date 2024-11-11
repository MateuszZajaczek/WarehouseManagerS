using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseManagerS.Data;
using WarehouseManagerS.Entities;
using WarehouseManager.Dto;

namespace WarehouseManagerS.Controllers
{
    [Authorize(Policy = "RequireStaffRole")]
    [ApiController]
    [Route("api/[controller]")]

    public class ProductsController : BaseApiController
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Select(p => new ProductDto
                {
                    Id = p.ProductId,
                    Name = p.ProductName,
                    Quantity = p.QuantityInStock,
                    Category = p.Category.CategoryName // Assuming Category has a Name property
                                               // Map other properties as needed
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Where(p => p.ProductId == id)
                .Select(p => new ProductDto
                {
                    Id = p.ProductId,
                    Name = p.ProductName,
                    Quantity = p.QuantityInStock,
                    Category = p.Category.CategoryName
                    // Map other properties as needed
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product Product)
        {
            _context.Products.Add(Product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = Product.ProductId }, Product);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, Product Product)
        {
            if (id != Product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(Product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var Product = await _context.Products.FindAsync(id);
            if (Product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(Product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
