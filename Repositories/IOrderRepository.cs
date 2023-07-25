using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAll();
        Order GetOrderById(int orderId);
    }
}