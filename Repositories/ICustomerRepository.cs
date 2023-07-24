using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface ICustomerRepository
    {
        void Add(Customer customer);
        Customer GetByFirebaseUserId(string firebaseUserId);
        Customer GetById(int id);
        List<Customer> GetCustomers();
        void Update(Customer customer);
    }
}