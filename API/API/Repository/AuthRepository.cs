using API.Infrastructure.ApiDbContext;
using API.Models;
using API.Repository.Interface;
using API.Responses;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class AuthRepository: IAuth
    {
        private readonly MyDbContext _context;

        public AuthRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<Response> SignIn(SignInDto signInDto)
        {
            var user = await _context.User
            .Where(x => x.Email.Trim() == signInDto.Email.Trim()).AsNoTracking()
            .FirstOrDefaultAsync();

            if (user is null) throw new ApplicationException("User Does Not Exists");
            if (user.Password != signInDto.Password) throw new ApplicationException("Incorrect Password");

            return new Response()
            {
                Data = user.Email
            };
        }
    }
}
