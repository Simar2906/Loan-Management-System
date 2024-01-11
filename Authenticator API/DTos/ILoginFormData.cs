namespace Authenticator_API.DTos
{
  public interface ILoginFormData
  {
    string email { get; set; }
    string password { get; set; }
  }
}
