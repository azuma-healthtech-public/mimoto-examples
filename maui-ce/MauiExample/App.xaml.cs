
using MauiExample.Pages;

namespace MauiExample
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new AppShell();
        }


        protected override void OnAppLinkRequestReceived(Uri uri)
        {
            if (uri.ToString().Contains("mimoto-example-app.azuma-health.tech/maui/ce"))
            {
                // FIXME: consider how page stack handling works best here. Idea is reset to root and show a new page
                MainPage.Navigation.PopToRootAsync();
                MainPage.Navigation.PushAsync(new CodeExchangeIdp(uri.ToString()));
            }
            else
                base.OnAppLinkRequestReceived(uri);
        }
    }
}
