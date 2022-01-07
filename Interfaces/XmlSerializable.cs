using System.Xml;
using System.Xml.Serialization;

namespace Piano.Interfaces; 

public abstract class XmlSerializable<T> {
    public static readonly XmlSerializer XmlSerializer = new(typeof(T));
}