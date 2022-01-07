using Piano.Interfaces;

namespace Piano.Objects; 

public class AppConfig : XmlSerializable<AppConfig> {
    public MssqlConfig MssqlConfig { get; set; }
    public PianoConfig PianoConfig { get; set; }
}