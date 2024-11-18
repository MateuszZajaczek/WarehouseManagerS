using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Dto;
using WarehouseManager.API.Interfaces;
using WarehouseManager.API.Controllers;


namespace WarehouseManagerS.Controllers
{
    //[Authorize(Policy = "RequireStaffRole")]
    [ApiController]
    [Route("api/[controller]")]

    public class ProductsController(IProductRepository productRepository) : BaseApiController
    {

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

        [HttpGet("{id}")]
        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await productRepository.GetProductByIdAsync(id);

            if (product == null)
            {
                return null; // Jeśli produkt nie istnieje, zwróć null
            }

            // Mapowanie na ProductDto
            return new ProductDto
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                QuantityInStock = product.QuantityInStock,
                CategoryName = product.Category?.CategoryName, // Mapowanie kategorii
                UnitPrice = product.UnitPrice,
            };
        }

        //[HttpPost]
        //public async Task<ActionResult<Product>> AddProduct(Product Product)
        //{
        //    productRepository.Products.Add(Product);
        //    await _context.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetProduct), new { id = Product.ProductId }, Product);
        //}


        //[HttpPut("{id}")]
        //public async Task<IActionResult> EditProduct(int id, Product Product)
        //{
        //    if (id != Product.ProductId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(Product).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProduct(int id)
        //{
        //    var Product = await _context.Products.FindAsync(id);
        //    if (Product == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Products.Remove(Product);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ProductExists(int id)
        //{
        //    return _context.Products.Any(e => e.ProductId == id);
        //}
    }
}
