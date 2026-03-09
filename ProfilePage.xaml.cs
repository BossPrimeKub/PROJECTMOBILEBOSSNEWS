using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MyUnoApp;

public sealed partial class ProfilePage : Page
{
    public ProfilePage()
    {
        this.InitializeComponent();
    }

    private void GoNews(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(MainPage));
    }

    private void GoDiscover(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(DiscoverPage));
    }

    private void GoAlerts(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(AlertPage));
    }
}