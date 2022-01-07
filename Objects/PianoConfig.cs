using Piano.Interfaces;

namespace Piano.Objects; 

public class PianoConfig : XmlSerializable<PianoConfig> {
    public int Port { get; set; }
    public string SecureCode { get; set; }
    public bool IsDevelopment { get; set; }
    public bool IsWindowsAuth { get; set; }
}