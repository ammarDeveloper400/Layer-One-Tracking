using API.Extensions;
using API.Infrastructure.ApiDbContext;
using API.Models;
using API.Repository.Interface;
using API.Responses;

namespace API.Repository
{
    public class AdminBlogRepository : IAminBlog
    {
        private readonly MyDbContext _context;

        public AdminBlogRepository(MyDbContext context)
        {
            _context = context;
        }
        public async Task<Response> GetBlogs(int displayLength, string isPublish, string searchText)
        {
            IList<BlogListDto> blogs = await _context.StoredProcedure("[dbo].[GetBlogs]")
                .Params(
                ("DisplayLength", displayLength),
                ("DisplayStart", 0),
                ("Search", searchText),
                ("IsPublish", isPublish))
                .ExecuteAsync<BlogListDto>();

            return new Response()
            {
                Data = blogs
            };
        }

        public async Task<Response> GetBlog(string code)
        {
            var blog = (await _context.StoredProcedure("[dbo].[GetBlogSetup]")
                .Params(("Id", code.Decode().ToInt()))
                .ExecuteAsync<BlogDto>()).FirstOrDefault();

            return new Response()
            {
                Data = blog
            };
        }

        public async Task<Response> GetGraphData(int initialDaysCount)
        {
            var graphData = (await _context.StoredProcedure("[dbo].[GetGraphData]")
                .Params(("initialDaysCount", initialDaysCount))
                .ExecuteAsync<GraphDto>()).FirstOrDefault();

            return new Response()
            {
                Data = graphData
            };
        }
    }
}
