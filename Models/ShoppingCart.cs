using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Fullstack_ECommerce_.Repositories;

namespace Fullstack_ECommerce_.Models
{
    public class ShoppingCart
    {   public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public bool ShoppingComplete { get; set; }

    }
}
