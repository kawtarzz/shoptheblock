using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Fullstack_ECommerce_.Repositories;
using Fullstack_ECommerce_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Fullstack_ECommerce_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Product> products = _productRepository.GetProducts();

            return Ok(products);
        }

        [HttpGet("{productId}")]
        public IActionResult GetById(int productId)
        {
            var product = _productRepository.GetProduct(productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult Post(Product newProduct)
        {
            try
            {
                _productRepository.Add(newProduct);
                return CreatedAtAction("GET", new { newProduct.Id }, newProduct);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{productId}")]
        public IActionResult Delete([FromRoute] int productId, Product product)
        {
            try
            {

            _productRepository.Delete(productId);
            return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{productId}")]
        public IActionResult Edit(int productId, Product product)
        {
            if (productId != product.Id)
            {
                return BadRequest();
            }
            _productRepository.Update(product);
            return NoContent();
        }
    }
}
