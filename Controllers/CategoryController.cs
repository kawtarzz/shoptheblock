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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Category> categories = _categoryRepository.GetAll();

            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public IActionResult Get(int categoryId)
        {
            var category = _categoryRepository.GetById(categoryId);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult AddCategory([FromBody] Category newCategory)
        {
            try
            {
                _categoryRepository.Add(newCategory);

                return CreatedAtAction("GET", new { newCategory.Id }, newCategory);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpDelete("{categoryId}")]
        public IActionResult Delete([FromRoute] int categoryId)
        {
            try
            {
                _categoryRepository.Delete(categoryId);    
               return NoContent();
            }
            catch
            {
                return BadRequest();
            } 
           
        }

        [HttpPut]
        public IActionResult Edit([FromQuery] string oldName, [FromQuery] string newName)
        {
            try
            {
                _categoryRepository.Edit(oldName, newName);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
