namespace Intex2.Models;

public class ExecutionRequest
{
    public ExecutionInputs Inputs { get; set; } = new();
    public Dictionary<string, string> GlobalParameters { get; set; } = new();
}

public class ExecutionInputs
{
    public List<InputItem> input1 { get; set; } = new();
}

public class InputItem
{
    public int user_id { get; set; }
    public int show_id { get; set; }
}