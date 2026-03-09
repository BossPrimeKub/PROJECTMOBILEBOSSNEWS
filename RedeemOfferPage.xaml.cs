using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;
using System;
using System.Threading.Tasks;

namespace MyUnoApp;

public sealed partial class RedeemOfferPage : Page
{
    public RedeemOfferPage()
    {
        this.InitializeComponent();
    }

    private void GoBack(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack) Frame.GoBack();
    }

    private void ClearText_Click(object sender, RoutedEventArgs e)
    {
        OfferCodeInput.Text = "";
        OfferCodeInput.Focus(FocusState.Programmatic);
    }

    private async void Redeem_Click(object sender, RoutedEventArgs e)
    {
        InvalidToast.Visibility = Visibility.Visible;
        await Task.Delay(2500);
        InvalidToast.Visibility = Visibility.Collapsed;
    }

    // เพิ่มฟังก์ชันสำหรับ Navbar ที่ขาดไป
    private void GoNews(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(MainPage));
    private void GoDiscover(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(DiscoverPage));
    private void GoAlerts(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(AlertPage));
    private void GoProfile(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(ProfilePage));
}