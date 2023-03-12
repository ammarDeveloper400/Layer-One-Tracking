using API.Responses;

namespace API.Repository.Interface
{
    public interface IAminBlog
    {
        Task<Response> GetBlogs(int displayLength, string? isPublish, string? searchText);
        Task<Response> GetBlog(string code);
        Task<Response> GetGraphData(int initialDaysCount);
    }
}
