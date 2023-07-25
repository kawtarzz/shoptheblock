using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IShoppingCartRepository
    {
        ShoppingCart GetShoppingCartById(int id);
    }
}