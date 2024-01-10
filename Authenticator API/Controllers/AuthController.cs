using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Authenticator_API.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    [HttpGet]
    public async Task<IActionResult> Get()
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
            Console.WriteLine(jsonContent);

            // You can deserialize the JSON content into your C# objects if needed
            // For example, using Newtonsoft.Json.JsonConvert:
            // var data = Newtonsoft.Json.JsonConvert.DeserializeObject<YourDataType>(jsonContent);
          }
          else
          {
            Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
          }
        }

        return Ok("API request successful");
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Exception: {ex.Message}");
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }
  }
}
