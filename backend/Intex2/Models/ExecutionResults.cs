namespace Intex2.Models;

public class ExecutionResults
{
    public ExecutionOutputs Results { get; set; } = new();
}

public class ExecutionOutputs
{
    public List<WebServiceOutput0Item> WebServiceOutput0 { get; set; } = new();
}

public class WebServiceOutput0Item
{
    public string User { get; set; }
    public string RecommendedItem1 { get; set; }
    public string RecommendedItem2 { get; set; }
    public string RecommendedItem3 { get; set; }
    public string RecommendedItem4 { get; set; }
    public string RecommendedItem5 { get; set; }
    public string RecommendedItem6 { get; set; }
    public string RecommendedItem7 { get; set; }
    public string RecommendedItem8 { get; set; }
    public string RecommendedItem9 { get; set; }
    public string RecommendedItem10 { get; set; }
}