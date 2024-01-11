namespace Authenticator_API
{
  public class UserDataService
  {
    private List<User> _userData;

    public UserDataService(List<User> userData)
    {
      _userData = userData;
    }

    public List<User> GetUserData() => _userData;
  }
}
