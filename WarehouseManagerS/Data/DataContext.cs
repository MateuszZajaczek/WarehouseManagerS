using Microsoft.EntityFrameworkCore;
using WarehouseManagerS.Entities;


namespace WarehouseManagerS.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Item> Items { get; set; }
}
