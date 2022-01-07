using RandomDataGenerator.FieldOptions;
using RandomDataGenerator.Randomizers;

namespace Piano.Utils; 

public class RandomUtils {
    public static string GetRandomString(int length) {
        var randomizer =
            RandomizerFactory.GetRandomizer(new FieldOptionsTextRegex() {Pattern = @"^[A-Za-z0-9]{"+ length +"}"});
        return randomizer.Generate();
    }
}