using ExampleApp.Service.Dto;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ExampleApp.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Welcome : ContentPage
    {
        public Welcome(IdentityTokenData tokenData)
        {
            InitializeComponent();

            EmailLabel.Text = tokenData.Email;
            KvnrLabel.Text = tokenData.Kvnr;
            SubUniqueLabel.Text = tokenData.MimotoSubUnique;
            ProviderLabel.Text = tokenData.MimotoSubIss;

        }
        private void Button_Clicked(object sender, EventArgs e)
        {
            Navigation.PopToRootAsync();
        }
    }
}