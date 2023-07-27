using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fullstack_ECommerce_.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal TotalPrice { get; set; }
        public string ShippingAddress { get; set; }
        public int PaymentTypeId { get; set; }
        public DateTime OrderDate { get; set; }
        public string ConfirmNum { get; set; }
        public int OrderStatus { get; set; }
        public int ShoppingCartId { get; set; }

    }
}
