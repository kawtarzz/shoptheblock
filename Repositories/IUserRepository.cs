using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IUserRepository
    {
        public void Add(User user); //
        public User GetByFirebaseUserId(string firebaseUserId); //
        public User GetById(int id); //
        public List<User> GetUsers(); //
        public void Update(User user);
    }
}