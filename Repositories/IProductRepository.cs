using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IProductRepository
    {
        public void Add(Product product);
        public Product GetProduct(int productId);
        public List<Product> GetProducts();
        public void Update(Product product);
        public void Delete(int productId);
    }
}