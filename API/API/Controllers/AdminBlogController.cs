using API.Repository;
using API.Repository.Interface;
using API.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/admin-blog")]
    [ApiController]
    public class AdminBlogController : ControllerBase
    {
        private readonly IAminBlog _adminRepository;

        public AdminBlogController(IAminBlog adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet("get-blogs")]
        public async Task<Response> GetBlogs(int displayLength, string? isPublish, string? searchText) =>
            await _adminRepository.GetBlogs(displayLength, isPublish, searchText);

        [HttpGet("get-blog")]
        public async Task<Response> GetBlog(string code) =>
            await _adminRepository.GetBlog(code);

        [HttpGet("get-graph-data")]
        public async Task<Response> GetGraphData(int initialDaysCount) =>
            await _adminRepository.GetGraphData(initialDaysCount);
    }
}
