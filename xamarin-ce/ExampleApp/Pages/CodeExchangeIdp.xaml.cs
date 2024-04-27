using ExampleApp.Service;
using System;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ExampleApp.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class CodeExchangeIdp : ContentPage
    {
        private readonly string deepLinkUrl;

        public CodeExchangeIdp(string deepLinkUrl)
        {
            InitializeComponent();
            this.deepLinkUrl = deepLinkUrl;
        }
        protected override void OnAppearing()
        {
            base.OnAppearing();

            if (MimotoService.Instance.Stage == LoginState.AuthRequest)
                Task.Run(() => StartCodeExchange());
        }

        private async Task StartCodeExchange()
        {
            try
            {
                MimotoService.Instance.Stage = LoginState.CodeExchangeRequest;

                var tokenData = await MimotoService.Instance.CodeExchangeAndFinishAuth(deepLinkUrl);

                Xamarin.Essentials.MainThread.BeginInvokeOnMainThread(async () =>
                {
                    // FIXME: proper stack handling here
                    await Navigation.PushAsync(new Welcome(tokenData));
                });
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