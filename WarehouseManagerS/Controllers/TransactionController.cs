using Microsoft.AspNetCore.Mvc;
using WarehouseManager.API.Dto;
using WarehouseManager.API.Repositories;

namespace WarehouseManager.API.Controllers
{
    public class TransactionController
    {
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetTransactions()
        {
            throw new NotImplementedException();
        }
    }
}
