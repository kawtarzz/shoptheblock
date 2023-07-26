using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fullstack_ECommerce_.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fullstack_ECommerce_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ShoppingCartController : ControllerBase
    {

        private readonly IShoppingCartRepository _shoppingCartRepository;

        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
        }

        [HttpGet("GetShoppingCartById/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_shoppingCartRepository.GetShoppingCartById(id));

        }
    }
}
