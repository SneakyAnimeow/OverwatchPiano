using Piano.Interfaces;

namespace Piano.Objects; 

public class MssqlConfig : XmlSerializable<MssqlConfig> {
    public string Server { get; set; }
    public string User { get; set; }
    public string Password { get; set; }
    public string Database { get; set; }
    public int Port { get; set; }
}