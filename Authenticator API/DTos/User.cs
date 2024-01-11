using Authenticator_API.DTos;
public class User : IUser
{
  public int id { get; set; }
  public string email { get; set; }
  public string gender { get; set; }
  public string name { get; set; }
  public string password { get; set; }
  public string role { get; set; }
  public int salary { get; set; }
  public string employer { get; set; }
  public string designation { get; set; }
  public string userPic { get; set; }
}
