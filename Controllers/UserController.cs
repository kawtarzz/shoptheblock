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
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
       public IActionResult DoesUserExist(string firebaseUserId)
       {
            var user = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
       }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userRepository.GetUsers());
        }

        
        [HttpGet("details/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User newUser)
        {
            try
            {

            _userRepository.Add(newUser);
                return CreatedAtAction(
                    "GET", new { newUser.Id }, newUser);
            } catch
            {
                return BadRequest();
            }
           
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, User user)
        {
            var currentUserProfile = GetCurrentUser();

            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(user);
            return NoContent();

        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
