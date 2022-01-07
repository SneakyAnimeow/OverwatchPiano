namespace Piano.Requests; 

public class SongUploadRequest {
    public string SecureCode { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Author { get; set; }
    public string Data { get; set; } = null!;
    public int? RecommendedAmount { get; set; }
}