using Authenticator_API.DTos;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop.Implementation;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Authenticator_API.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly UserDataService _userDataService;

    public AuthController(UserDataService userDataService)
    {
      _userDataService = userDataService;
    }

    [HttpGet]
    public IActionResult Get()
    {
      // Use _userData as needed
      return Ok("Hello World");
    }
    [HttpPost]
    [EnableCors("AllowOrigin")] // Make sure to add this attribute
    public async Task<IActionResult> Post([FromBody] LoginFormData loginDetails)
    {
      var _userData = await _userDataService.FetchUserData();
      var isAuthenticated = AuthenticateUser(_userData, loginDetails);
      //foreach(var item in _userData)
      //{
      //  await Console.Out.WriteLineAsync(item.name);
      //}
      await Console.Out.WriteLineAsync("auth: "+isAuthenticated);
      //send token back
      return Ok(loginDetails);
    }

    private bool AuthenticateUser(List<User> userList, LoginFormData loginDetails)
    {
      return userList.Exists(u=>u.email == loginDetails.email && u.password == loginDetails.password);
    }
  }
}
