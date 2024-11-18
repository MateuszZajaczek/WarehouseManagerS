namespace WarehouseManager.API.Entities;
public class AppUser
{
    public int Id { get; set; }

    public string UserName { get; set; }

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

    public string Email { get; set; }

    public Role Role { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation Properties
    public ICollection<Order> Orders { get; set; }
    public ICollection<Return> Returns { get; set; }
}

public enum Role
{
    Admin,
    Manager,
    Staff
}
