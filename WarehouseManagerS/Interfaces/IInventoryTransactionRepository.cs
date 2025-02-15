using WarehouseManager.API.Entities;

public interface IInventoryTransactionRepository
{
    Task AddTransactionAsync(InventoryTransaction transaction); 
    Task<bool> SaveAllAsync(); 
}
