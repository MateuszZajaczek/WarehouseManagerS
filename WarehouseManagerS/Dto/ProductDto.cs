namespace WarehouseManager.API.Dto;
public class ProductDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int QuantityInStock { get; set; }
    public string CategoryName { get; set; }
    public decimal UnitPrice { get; set; }
}

