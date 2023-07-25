using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Fullstack_ECommerce_.Models;
using Fullstack_ECommerce_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace Fullstack_ECommerce_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            List<Customer> customers = _customerRepository.GetCustomers();
            return Ok(customers);
        }

       [HttpGet("{firebaseUserId}")]
       public IActionResult GetFirebaseProfile(string firebaseUserId)
       {
            return Ok(_customerRepository.GetByFirebaseUserId(firebaseUserId));
       }
        
        [HttpGet("GetById/{id}")]
        public IActionResult GetCustomerById(int id)
        {
            var customer = _customerRepository.GetById(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        public IActionResult Post(Customer customer)
        {
            _customerRepository.Add(customer);
            return CreatedAtAction(
                nameof(GetFirebaseProfile),
                new { firebaseUserId = customer.FirebaseUserId }, customer);
        }
       
        
    }
}
