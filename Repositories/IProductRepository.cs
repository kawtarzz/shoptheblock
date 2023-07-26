using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IProductRepository
    {
         void Add(Product product);
         Product GetProduct(int productId);
         List<Product> GetProducts();
         void Update(Product product);
         void Delete(int productId);
    }
}