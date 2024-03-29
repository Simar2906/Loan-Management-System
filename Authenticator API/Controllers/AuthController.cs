using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

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
      return Ok("Hello World");
    }
    [HttpPost]
    [EnableCors("AllowOrigin")]
    public async Task<IActionResult> Post([FromBody] LoginFormData loginDetails)
    {
      var _userData = await _userDataService.FetchUserData();
      var isAuthenticated = AuthenticateUser(_userData, loginDetails);

      //foreach(var item in _userData)
      //{
      //  await Console.Out.WriteLineAsync(item.name);
      //}
      await Console.Out.WriteLineAsync("auth: "+isAuthenticated.Item1);

      //sending token back if user authenticated
      if (isAuthenticated.Item1)
      {
        var token = GenerateToken(isAuthenticated.Item2);
        return Ok(token);
      }

      return Unauthorized();
    }
    private Tuple<bool, User> AuthenticateUser(List<User> userList, LoginFormData loginDetails)
    {
      for(int i = 0; i<userList.Count; i++)
      {
        User us = userList[i];
        if (us.email == loginDetails.email && us.password == loginDetails.password)
        {
          return new Tuple<bool, User>(true, us);
        }
      }
      return new Tuple<bool, User>(false, new User());
    }
    private string GenerateToken(User userDetails)
    {
      var claims = new List<Claim>
    {
        new Claim("id", userDetails.id.ToString()),
        new Claim("email", userDetails.email),
        new Claim("name", userDetails.name),
        new Claim("gender", userDetails.gender),
        new Claim("password", userDetails.password),
        new Claim("role", userDetails.role),
        new Claim("salary", userDetails.salary.ToString()),
        new Claim("employer", userDetails.employer),
        new Claim("designation", userDetails.designation),
        new Claim("userPic", userDetails.userPic)
    };
      var creds = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("abcdefgh12345678abcdefgh12345678")), SecurityAlgorithms.HmacSha256);
      var expires = DateTime.Now.AddDays(Convert.ToDouble(7));

      var token = new JwtSecurityToken(
          "SimarAuthApp",
          "SimarAuthApp",
          claims,
          expires: expires,
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}
