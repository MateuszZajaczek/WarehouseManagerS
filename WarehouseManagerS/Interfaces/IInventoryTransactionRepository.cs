using WarehouseManager.API.Entities;

public interface IInventoryTransactionRepository
{
    Task AddTransactionAsync(InventoryTransaction transaction); // Add a transaction
    Task<bool> SaveAllAsync(); // Save changes to the database
}
