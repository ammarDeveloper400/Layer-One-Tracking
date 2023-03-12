using API.Models;
using API.Repository;
using API.Repository.Interface;
using API.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth _authRepository;

        public AuthController(IAuth authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("signin")]
        public async Task<Response> SignIn(SignInDto signInDto) =>
            await _authRepository.SignIn(signInDto);
    }
}
