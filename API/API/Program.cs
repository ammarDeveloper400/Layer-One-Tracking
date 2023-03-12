using API.Infrastructure.ApiDbContext;
using API.Middleware;
using API.Repository;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//For Entity Framework, to connect with DB
builder.Services.AddDbContextPool<MyDbContext>
    (db => db.UseSqlServer(builder.Configuration.GetConnectionString("connectionString")));

builder.Services.AddScoped<IClientBlog, ClientBlogRepository>();
builder.Services.AddScoped<IAminBlog, AdminBlogRepository>();
builder.Services.AddScoped<IAuth, AuthRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
    "CorsPolicy",
      builder => builder.WithOrigins("http://localhost:4200")
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyHeader();
    builder.AllowAnyMethod();
    builder.WithOrigins("http://localhost:4200");
    builder.AllowCredentials();
});
app.UseMiddleware<OAuth>();
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
