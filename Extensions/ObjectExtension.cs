namespace Piano.Extensions; 

public static class ObjectExtension {
    public static T To<T>(this object o) {
        return (T) o;
    }
}