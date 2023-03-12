using API.Extensions;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class BlogListDto
    {
        public int Id { get; set; }
        [NotMapped]
        public string Code { get { return this.Id.Encode(); } }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int ViewCount { get; set; }
        public int ReadCount { get; set; }
        public int RecommendCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsPublish { get; set; }
        public bool DisableButton { get; set; }
    }

    public class GraphDto
    {
        public string Date { get; set; }
        public string TotalViewCount { get; set; }
        public string TotalReadCount { get; set; }
        public string TotalRecommendCount { get; set; }
        [NotMapped]
        public string[] DateIds { get { return Date?.Split(",").Select(x => x).ToArray(); } }
        [NotMapped]
        public string[] ViewCountIds { get { return TotalViewCount?.Split(",").Select(x => x).ToArray(); } }
        [NotMapped]
        public string[] ReadCountIds { get { return TotalReadCount?.Split(",").Select(x => x).ToArray(); } }
        [NotMapped]
        public string[] TotalRecommendIds { get { return TotalRecommendCount?.Split(",").Select(x => x).ToArray(); } }
        public int SumViewCount { get; set; }
        public int SumReadCount { get; set; }
        public int SumRecommendCount { get; set; }
    }
}