using API.Models;
using API.Responses;
using Microsoft.AspNetCore.Mvc;

namespace API.Repository.Interface
{
    public interface IClientBlog
    {
        Task<Response> GetBlogs(int displayLength, string isPublish, string searchText);
        Task<Response> GetBlog(string code);
        Task<Response> BlogReadCount(string code);
        Task<Response> ShareBlog(string code);
        Task<Response> AddBlog(BlogVm blogVM);
        Task<Response> UpdateBlog(BlogVm blogVM);
        Task<Response> DeleteBlog(string code);
        Task<Response> PublishToggleBlog(string code);
    }
}
