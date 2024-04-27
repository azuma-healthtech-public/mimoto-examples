using ExampleApp.Service;
using System;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ExampleApp.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SelectIdp : ContentPage
    {
        public SelectIdp()
        {
            InitializeComponent();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            Task.Run(() => LoadIdps());
        }

        private async Task LoadIdps()
        {
            try
            {
                var entries = await MimotoService.Instance.GetIdpList();

                Xamarin.Essentials.MainThread.BeginInvokeOnMainThread(() =>
                {
                    IdpList.ItemsSource = entries;
                    IdpList.IsVisible = true;

                    BusyIndicator.IsVisible = false;
                });
            }
            catch (Exception ex)
            {
                // FIXME: proper error handling
            }
        }

        private void IdpEntity_Clicked(object sender, System.EventArgs e)
        {
            var idpEntity = (sender as Button);

            MimotoService.Instance.Stage = LoginState.None;
            Navigation.PushAsync(new LoginIdp(idpEntity.CommandParameter.ToString()));
        }

    }
}