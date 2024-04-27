using ExampleApp.Pages;
using System;
using Xamarin.Essentials;
using Xamarin.Forms;

namespace ExampleApp
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
            SetAppTheme();

            MainPage = new NavigationPage(new MainPage());
        }

        private void SetAppTheme()
        {
            var theme = Preferences.Get("theme", string.Empty);
            if (string.IsNullOrEmpty(theme) || theme == "light")
            {
                Application.Current.UserAppTheme = OSAppTheme.Light;
            }
            else
            {
                Application.Current.UserAppTheme = OSAppTheme.Dark;
            }
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }

        protected override void OnAppLinkRequestReceived(Uri uri)
        {
            if (uri.ToString().Contains("mimoto-example-app.azuma-health.tech/xamarin/ce"))
            {
                // FIXME: consider how page stack handling works best here. Idea is reset to root and show a new page
                MainPage.Navigation.PopToRootAsync();
                MainPage.Navigation.PushAsync(new CodeExchangeIdp(uri.ToString()));
            }
        }
    }
}
