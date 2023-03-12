using System.Net;
using System.Text.Json.Serialization;

namespace API.Responses
{
    public class Response
    {
        [JsonIgnore]
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;
        public string Message { get; set; }
        public dynamic Data { get; set; }
        public bool Status { get { return StatusCode == HttpStatusCode.OK; } }
    }
}
