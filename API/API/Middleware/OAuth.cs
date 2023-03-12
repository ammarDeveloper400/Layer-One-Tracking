using API.Extensions;
using API.Responses;
using System.Net;

namespace API.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class OAuth
    {
        private readonly RequestDelegate _next;

        public OAuth(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next.Invoke(httpContext);
            }
            catch(Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            return;
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var response = context.Response;

            var errorResponse = new Response();
            switch (exception)
            {
                case ApplicationException ex:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    errorResponse.Message = ex.Message;
                    break;
                case BadHttpRequestException ex:
                    response.StatusCode = (int)HttpStatusCode.Redirect;
                    errorResponse.Message = ex.Message;
                    break;
                default:
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    errorResponse.Message = "Internal Server Error";
                    break;
            }
            errorResponse.StatusCode = (HttpStatusCode)context.Response.StatusCode;

            await context.Response.WriteAsync(errorResponse.Serialize());
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class OAuthExtensions
    {
        public static IApplicationBuilder UseOAuth(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<OAuth>();
        }
    }
}
