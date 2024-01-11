namespace Authenticator_API.DTos
{
  public interface IUser
  {
      int id { get; set; }
      string email { get; set; }
      string gender { get; set; }
      string name { get; set; }
      string password { get; set; }
      string role { get; set; }
      int salary { get; set; }
      string employer { get; set; }
      string designation { get; set; }
      string userPic { get; set; }
    }
}
