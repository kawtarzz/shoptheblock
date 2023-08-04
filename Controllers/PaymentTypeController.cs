using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Fullstack_ECommerce_.Models;
using Fullstack_ECommerce_.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fullstack_ECommerce_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class PaymentTypeController : ControllerBase
    {
        private readonly IPaymentTypeRepository _paymentTypeRepository;

        public PaymentTypeController(IPaymentTypeRepository paymentTypeRepository)
        {
            _paymentTypeRepository = paymentTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<PaymentType> paymentTypes = _paymentTypeRepository.GetPaymentTypes();
            return Ok(paymentTypes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var paymentType = _paymentTypeRepository.GetPaymentTypeById(id);
            if (paymentType == null)
            {
                return NotFound();
            }
            return Ok(paymentType);
        }
    }
}
