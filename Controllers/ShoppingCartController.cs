using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Fullstack_ECommerce_.Repositories;
using Fullstack_ECommerce_.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpGet]
        public IActionResult Get()
        {
            List<ShoppingCart> carts = _shoppingCartRepository.GetShoppingCarts();
            return Ok(carts);
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            var shoppingCart = _shoppingCartRepository.GetById(id);
            if (shoppingCart == null)
            {
                return NotFound();
            }
            return Ok(shoppingCart);

        }

        [HttpGet("GetUserCartByFirebaseId/{firebaseUserId}")]
        public IActionResult GetCartByUserId(string firebaseUserId)
        {
            var usersCart = _shoppingCartRepository.GetUserCartByFirebaseId(firebaseUserId);

            if (usersCart == null)
            {
                return NotFound();
            }
            return Ok(usersCart);
        }

        [HttpPost]
        public IActionResult AddShoppingCart([FromBody] ShoppingCart newCart)
        {
            _shoppingCartRepository.Add(newCart);
            return CreatedAtAction("GET", new { newCart.Id }, newCart);
          
        }

        [HttpDelete("{cartId}")]
        public IActionResult Delete([FromRoute] int cartId)
        {
            try
            {
                _shoppingCartRepository.Delete(cartId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}

