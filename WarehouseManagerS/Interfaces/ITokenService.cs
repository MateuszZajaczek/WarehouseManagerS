using WarehouseManagerS.Entities.Users;

namespace WarehouseManagerS.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
