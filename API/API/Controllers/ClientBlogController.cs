using API.Models;
using API.Repository.Interface;
using API.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/client-blog")]
    [ApiController]
    public class ClientBlogController : ControllerBase
    {
        private readonly IClientBlog _clientBlogRepository;

        public ClientBlogController(IClientBlog clientBlogRepository)
        {
            _clientBlogRepository = clientBlogRepository;
        }

        [HttpGet("get-blogs")]
        public async Task<Response> GetBlogs(int displayLength, string? isPublish, string? searchText) =>
            await _clientBlogRepository.GetBlogs(displayLength, isPublish, searchText);

        [HttpGet("get-blog")]
        public async Task<Response> GetBlog(string code) =>
            await _clientBlogRepository.GetBlog(code);

        [HttpPost("update-blog-read-count")]
        public async Task<Response> BlogReadCount(string code) =>
            await _clientBlogRepository.BlogReadCount(code);

        [HttpPost("share-blog")]
        public async Task<Response> ShareBlog(string code) =>
           await _clientBlogRepository.ShareBlog(code);

        [HttpPost("add-blog")]
        public async Task<Response> AddBlog([FromForm] BlogVm blogVM) =>
         await _clientBlogRepository.AddBlog(blogVM);

        [HttpPost("update-blog")]
        public async Task<Response> UpdateBlog([FromForm] BlogVm blogVM) =>
         await _clientBlogRepository.UpdateBlog(blogVM);

        [HttpPost("delete-blog")]
        public async Task<Response> DeleteBlog(string code) =>
         await _clientBlogRepository.DeleteBlog(code);

        [HttpPost("publish-toggle-blog")]
        public async Task<Response> PublishToggleBlog(string code) =>
         await _clientBlogRepository.PublishToggleBlog(code);
    }
}
