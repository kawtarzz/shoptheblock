using Fullstack_ECommerce_.Repositories;

namespace Fullstack_ECommerce_.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirebaseUserId { get; set; }
        public string ProfilePic { get; set; }
    }
}
