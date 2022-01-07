using System.Xml;
using Piano.Extensions;
using Piano.Objects;
using Piano.Utils;

namespace Piano; 

public class Setup {
    private const string AppConfigName = "app_config.xml";

    private static readonly XmlWriterSettings XmlWriterSettings = new() {
        Indent = true,
        IndentChars = "\t",
        CloseOutput = true,
        OmitXmlDeclaration = true
    };

    public static AppConfig GetAppConfig => new() {
        MssqlConfig = MssqlConfig,
        PianoConfig = PianoConfig
    };

    public static void SetAppConfig(AppConfig appConfig) {
        MssqlConfig = appConfig.MssqlConfig;
        PianoConfig = appConfig.PianoConfig;
    }

    public static PianoConfig PianoConfig = new() {
        Port = 80,
        IsDevelopment = false,
        SecureCode = RandomUtils.GetRandomString(12)
    };

    public static MssqlConfig MssqlConfig = new() {
        Server = "localhost",
        Database = "Piano",
        User = "sa",
        Password = "SaPassword",
        Port = 1433
    };

    public static void OnStart() {
        if(!File.Exists(AppConfigName)) {
            using (var writer = XmlWriter.Create(AppConfigName, XmlWriterSettings)) {
                AppConfig.XmlSerializer.Serialize(writer, GetAppConfig);
            }
            Console.WriteLine("Please restart your application.");
            Environment.Exit(0);
        }

        using (var reader = XmlReader.Create(AppConfigName)) {
            var appConfig = AppConfig.XmlSerializer.Deserialize(reader)!.To<AppConfig>();
            SetAppConfig(appConfig);
        }
    }
}