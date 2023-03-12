using API.Extensions;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class BlogDto
    {
        [JsonIgnore]
        public string Id { get; set; }
        [NotMapped]
        public string Code { get { return this.Id?.Encode(); } set { Id = value?.Decode(); } }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int ViewCount { get; set; }
        public int ReadCount { get; set; }
        public int RecommendCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsPublish { get; set; }
        [NotMapped]
        public IFormFile ProfileImage { get; set; }
    }
    public class UpdateBlogReadCountDto { }

    public class BlogVm
    {
        public string Data { get; set; }
        public IFormFile ProfileImage { get; set; }
        public BlogDto BlogDto
        {
            get
            {
                BlogDto _blogDto = Data?.Deserialize<BlogDto>();
                _blogDto.ProfileImage = this.ProfileImage;
                return _blogDto;
            }
        }
    }
}
