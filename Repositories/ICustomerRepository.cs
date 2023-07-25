using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface ICustomerRepository
    {
        public void Add(Customer customer); //
        public Customer GetByFirebaseUserId(string firebaseUserId); //
        public Customer GetById(int id); //
        public List<Customer> GetCustomers(); //
        public void Update(Customer customer);
    }
}