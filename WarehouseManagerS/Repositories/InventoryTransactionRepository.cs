using WarehouseManager.API.Data;
using WarehouseManager.API.Entities;

public class InventoryTransactionRepository : IInventoryTransactionRepository
{
    private readonly DataContext _context;

    public InventoryTransactionRepository(DataContext context)
    {
        _context = context;
    }

    public async Task AddTransactionAsync(InventoryTransaction transaction)
    {
        await _context.InventoryTransactions.AddAsync(transaction); 
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0; 
    }
}
