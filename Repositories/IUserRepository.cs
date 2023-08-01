using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IUserRepository
    {
         void Add(User user); //
         User GetByFirebaseUserId(string firebaseUserId); //
         User GetById(int userId); //
         List<User> GetUsers(); //
         void Update(User user);
    }
}