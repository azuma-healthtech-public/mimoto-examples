using ExampleApp.Service;
using System;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ExampleApp.Pages
{

    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginIdp : ContentPage
    {
        private readonly string issuer;

        public LoginIdp(string issuer)
        {
            InitializeComponent();

            this.issuer = issuer;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            if (MimotoService.Instance.Stage == LoginState.None)
                Task.Run(() => StartAuth());
        }

        private async Task StartAuth()
        {
            try
            {
                var url = await MimotoService.Instance.StartAuth(issuer);
                MimotoService.Instance.Stage = LoginState.AuthRequest;
                await Launcher.OpenAsync(new Uri(url));
            }
            catch (Exception ex)
            {
                // FIXME: proper error handling
            }

        }

        private void CancelButton_Clicked(object sender, System.EventArgs e)
        {
            Navigation.PopToRootAsync();
        }
    }
}