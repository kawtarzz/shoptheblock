using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface IPaymentTypeRepository
    {
        PaymentType GetPaymentTypeById(int id);
        List<PaymentType> GetPaymentTypes();
    }
}