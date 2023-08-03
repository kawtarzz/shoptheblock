using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IUserProfileRepository
    {
         void Add(UserProfile user); //
         UserProfile GetByFirebaseUserId(string firebaseUserId); //
         UserProfile GetById(int userId); //
         List<UserProfile> GetUsers(); //
         void Update(UserProfile userProfile);
    }
}