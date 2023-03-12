using API.Extensions;
using API.Infrastructure.ApiDbContext;
using API.Infrastructure.Entities;
using API.Models;
using API.Repository.Interface;
using API.Responses;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Repository
{
    public class ClientBlogRepository : IClientBlog
    {
        private readonly IWebHostEnvironment _env;
        private readonly MyDbContext _context;
        private readonly IConfiguration _configuration;

        public ClientBlogRepository(MyDbContext context, IWebHostEnvironment env, IConfiguration Configuration)
        {
            _env = env;
            _context = context;
            _configuration = Configuration;
        }

        public async Task<Response> GetBlogs(int displayLength, string isPublish, string searchText)
        {
            BlogListDto latestBlog = new BlogListDto();
            IList<BlogListDto> blogs = await _context.StoredProcedure("[dbo].[GetBlogs]")
                .Params(
                ("DisplayLength", displayLength),
                ("DisplayStart", 0),
                ("Search", searchText),
                ("IsPublish", isPublish))
                .ExecuteAsync<BlogListDto>();

            if(blogs.Count > 0)
            {
                latestBlog = blogs?[0];
                blogs.RemoveAt(0);
            }

            return new Response()
            {
                Data = new
                {
                    LatestBlog = latestBlog,
                    BlogList = blogs
                }
            };
        }

        public async Task<Response> GetBlog(string code)
        {
            var blog = (await _context.StoredProcedure("[dbo].[GetBlog]")
                .Params(("Id", code.Decode().ToInt()))
                .ExecuteAsync<BlogDto>()).FirstOrDefault();

            return new Response()
            {
                Data = blog
            };
        }

        public async Task<Response> BlogReadCount(string code)
        {
            await _context.StoredProcedure("[dbo].[UpdateBlogReadCount]")
                .Params(("Id", code.Decode().ToInt()))
                .ExecuteAsync<UpdateBlogReadCountDto>();

            return new Response(){};
        }

        public async Task<Response> AddBlog(BlogVm blogVM)
        {
            Blog blog = new Blog
            {
                Title = blogVM.BlogDto.Title,
                SubTitle = blogVM.BlogDto.SubTitle,
                Description = blogVM.BlogDto.Description,
                IsPublish = blogVM.BlogDto.IsPublish,
                ReadCount = 0,
                ViewCount = 0,
                RecommendCount = 0,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            if (blogVM.BlogDto.ProfileImage != null)
                blog.ImageUrl = await blogVM.BlogDto.ProfileImage.FileUpload("blogs", Guid.NewGuid().ToString("N"), _env.WebRootPath);

            _context.Blog.Add(blog);
            await _context.SaveChangesAsync();

            return new Response() { Message = "Blog Added Successfully" };
        }

        public async Task<Response> UpdateBlog(BlogVm blogVM)
        {
            if (blogVM.BlogDto.Code == null) throw new ApplicationException("Unable to update this blog");

            var blog = await _context.Blog
                .Where(x => x.Id == blogVM.BlogDto.Code.Decode().ToInt()).FirstOrDefaultAsync();

            if(blog is null) throw new ApplicationException("Unable to update this blog");

            blog.Title = blogVM.BlogDto.Title;
            blog.SubTitle = blogVM.BlogDto.SubTitle;
            blog.Description = blogVM.BlogDto.Description;
            blog.IsPublish = blogVM.BlogDto.IsPublish;
            blog.UpdatedAt = DateTime.UtcNow;

            if (blogVM.BlogDto.ProfileImage != null)
                blog.ImageUrl = await blogVM.BlogDto.ProfileImage.FileUpload("blogs", Guid.NewGuid().ToString("N"), _env.WebRootPath);

            await _context.SaveChangesAsync();

            return new Response() { Message = "Blog Updated Successfully" };
        }

        public async Task<Response> DeleteBlog(string code)
        {
            if (code is null) throw new ApplicationException("Unable to delete this blog");

            var blog = await _context.Blog
                .Where(x => x.Id == code.Decode().ToInt()).FirstOrDefaultAsync();

            if (blog is null) throw new ApplicationException("Unable to delete this blog");

            blog.IsDelete = true;
            await _context.SaveChangesAsync();

            return new Response() { Message = "Blog Deleted Successfully" };
        }

        public async Task<Response> PublishToggleBlog(string code)
        {
            if (code is null) throw new ApplicationException("Unable to change status");

            var blog = await _context.Blog
                .Where(x => x.Id == code.Decode().ToInt()).FirstOrDefaultAsync();

            if (blog is null) throw new ApplicationException("Unable to change status");

            blog.IsPublish = !blog.IsPublish;
            await _context.SaveChangesAsync();

            return new Response() { Message = $"Blog {(blog.IsPublish ? "Published" : "UnPublished")} Successfully" };
        }

        public async Task<Response> ShareBlog(string code)
        {
            if (code is null) throw new ApplicationException("Unable to share blog");

            await _context.StoredProcedure("[dbo].[UpdateBlogRecommendCount]")
                .Params(("Id", code.Decode().ToInt()))
                .ExecuteAsync<UpdateBlogReadCountDto>();

            return new Response() { Data = $"{_configuration["Url:Portal"]}/view-blog?code={code}" };
        }
    }
}
