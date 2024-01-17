
using Authenticator_API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Authenticator_API
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      
      builder.Services.AddControllers().AddNewtonsoftJson();
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowOrigin",
            builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
      });
     
      builder.Services.AddSingleton<UserDataService>();
      var app = builder.Build();


      
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseHttpsRedirection();

      app.UseCors("AllowOrigin");
      app.UseAuthorization();


      app.MapControllers();

      await app.RunAsync();
    }
  }
}
