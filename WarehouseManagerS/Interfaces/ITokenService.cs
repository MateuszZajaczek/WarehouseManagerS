using WarehouseManager.API.Entities;

namespace WarehouseManager.API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
