using Authenticator_API.DTos;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop.Implementation;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Authenticator_API.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly List<User> _userData;

    public AuthController(List<User> userData)
    {
      _userData = userData ?? throw new ArgumentNullException(nameof(userData));
    }

    [HttpGet]
    public IActionResult Get()
    {
      // Use _userData as needed
      return Ok("Hello World");
    }
    [HttpPost]
    [EnableCors("AllowOrigin")] // Make sure to add this attribute
    public IActionResult Post([FromBody] LoginFormData loginDetails)
    {
      // Your login logic here...
      foreach(var dat in _userData)
      {
        Console.WriteLine(dat.password);
      }
      return Ok(loginDetails);
    }
  }
}
