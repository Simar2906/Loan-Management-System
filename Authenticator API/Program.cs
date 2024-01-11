
using Authenticator_API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Authenticator_API
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.
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
      // Register UserDataService
      builder.Services.AddSingleton<UserDataService>();

      // Register AuthController
      builder.Services.AddScoped<AuthController>();
      var app = builder.Build();


      // Configure the HTTP request pipeline.
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
  
    public static async Task<List<User>> fetchUserData()
    {
      try
      {
        // Replace the URL with the actual endpoint of your local JSON server
        string apiUrl = "http://localhost:3000/user";

        using (HttpClient client = new HttpClient())
        {
          // Make a GET request to the API endpoint
          HttpResponseMessage response = await client.GetAsync(apiUrl);

          // Check if the request was successful
          if (response.IsSuccessStatusCode)
          {
            // Read and print the content of the response
            string jsonContent = await response.Content.ReadAsStringAsync();


            // You can deserialize the JSON content into your C# objects if needed
            // For example, using Newtonsoft.Json.JsonConvert:
            var data = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(jsonContent);
            foreach (var dat in data)
            {
              Console.WriteLine(dat.name);
            }
            return data;
          }
          else
          {
            Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
            return new List<User>();
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Exception: {ex.Message}");
        return new List<User>();
      }
    }
  }
}
