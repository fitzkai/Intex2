using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Intex2.Models;

namespace Intex2.Services;

public class AzureMLService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public AzureMLService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<ExecutionResults?> GetRecommendationsAsync(List<InputItem> inputItems)
    {
        var endpoint = _config["AzureML:Endpoint"]; // e.g., "http://64.236.106.223:80/score"
        var apiKey = _config["AzureML:ApiKey"]; // optional, depends on your service

        var payload = new ExecutionRequest
        {
            Inputs = new ExecutionInputs
            {
                input1 = inputItems
            },
            GlobalParameters = new Dictionary<string, string>()
        };

        var json = JsonConvert.SerializeObject(payload);

        var request = new HttpRequestMessage(HttpMethod.Post, endpoint);
        request.Content = new StringContent(json, Encoding.UTF8, "application/json");

        // Only add if your Swagger defines "Bearer" auth
        if (!string.IsNullOrEmpty(apiKey))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        }

        var response = await _httpClient.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            Console.WriteLine($"❌ Azure ML Error ({response.StatusCode}): {content}");
            return null;
        }

        return JsonConvert.DeserializeObject<ExecutionResults>(content);
    }
}