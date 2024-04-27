using ExampleApp.Pages;
using System;
using Xamarin.Forms;

namespace ExampleApp
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private void Button_Clicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new SelectIdp());
        }
    }
}
