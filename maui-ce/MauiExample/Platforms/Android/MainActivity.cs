using Android.App;
using Android.Content;
using Android.Content.PM;

namespace MauiExample
{
    [Activity(Theme = "@style/Maui.SplashTheme", MainLauncher = true, LaunchMode = LaunchMode.SingleTask,
        ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode |
        ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]


    [IntentFilter(new string[] { Intent.ActionView },
        Categories = new[] { Intent.CategoryDefault, Intent.CategoryBrowsable },
        DataScheme = "https",
        DataHost = "mimoto-example-app.azuma-health.tech",
        DataPathPrefix = "/maui/ce",
        AutoVerify = true)]
    public class MainActivity : MauiAppCompatActivity
    {
    }
}
