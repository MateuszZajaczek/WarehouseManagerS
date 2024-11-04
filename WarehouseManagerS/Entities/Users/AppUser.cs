namespace WarehouseManagerS.Entities.Users
{
    public class AppUser
    {
        public int Id { get; set; }


        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        string Email { get; set; }


        public Role Role { get; set; }

    }
    public enum Role
    {
        Admin, Menager, Staff
    }

}
