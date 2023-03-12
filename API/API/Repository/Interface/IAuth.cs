using API.Models;
using API.Responses;

namespace API.Repository.Interface
{
    public interface IAuth
    {
        Task<Response> SignIn(SignInDto signInDto);
    }
}
