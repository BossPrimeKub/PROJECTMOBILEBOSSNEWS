using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;

namespace MyUnoApp;

public sealed partial class RecentlyViewedPage : Page
{
    public RecentlyViewedPage()
    {
        this.InitializeComponent();
    }

    // ฟังก์ชันกดย้อนกลับ
    private void GoBack(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack) 
        {
            Frame.GoBack();
        }
    }

    // ระบบ Navigation สำหรับ Navbar
    private void GoNews(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(MainPage));
    private void GoDiscover(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(DiscoverPage));
    private void GoAlerts(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(AlertPage));
    private void GoProfile(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(ProfilePage));
}