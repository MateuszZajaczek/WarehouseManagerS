using WarehouseManagerS.Entities;

namespace WarehouseManagerS.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
