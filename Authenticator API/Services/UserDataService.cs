public class UserDataService
{
  public async Task<List<User>> FetchUserData()
  {
    try
    {
      string apiUrl = "http://localhost:3000/user";

      using (HttpClient client = new HttpClient())
      {
        HttpResponseMessage response = await client.GetAsync(apiUrl);

        if (response.IsSuccessStatusCode)
        {
          string jsonContent = await response.Content.ReadAsStringAsync();
          var data = new List<User>();
          data = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(jsonContent);
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
