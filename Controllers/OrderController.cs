using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Fullstack_ECommerce_.Models;
using Fullstack_ECommerce_.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fullstack_ECommerce_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet("GetOrderById/{orderId}")]
        public IActionResult GetById(int orderId)
        {
            return Ok(_orderRepository.GetOrderById(orderId));
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Order> orders = _orderRepository.GetAll();
            return Ok(orders);
        }
    }
}
