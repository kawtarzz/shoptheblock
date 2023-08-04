using Fullstack_ECommerce_.Models;

using System.Collections.Generic;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IShoppingCartRepository
    {
        public List<ShoppingCart> GetShoppingCarts();
        public ShoppingCart GetById(int cartId);

        public void Add(ShoppingCart shoppingCart);

        public List<ShoppingCart> GetUserCartByFirebaseId(string firebaseUserId);

        public void Delete(int cartId);
    }
}