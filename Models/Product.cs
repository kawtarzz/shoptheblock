using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Fullstack_ECommerce_.Repositories;

namespace Fullstack_ECommerce_.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ProductImage { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }

    }
}
