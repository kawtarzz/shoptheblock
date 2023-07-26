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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<User> users = _userRepository.GetUsers();
            return Ok(users);
        }

       [HttpGet("{firebaseUserId}")]
       public IActionResult GetFirebaseProfile(string firebaseUserId)
       {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
       }
        
        [HttpGet("GetById/{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(
                nameof(GetFirebaseProfile),
                new { firebaseUserId = user.FirebaseUserId }, user);
        }
       
        
    }
}
