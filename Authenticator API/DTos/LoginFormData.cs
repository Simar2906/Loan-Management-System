using Authenticator_API.DTos;
public class LoginFormData : ILoginFormData
{
  public string email { get; set; }
  public string password { get; set; }
}
