using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MyUnoApp;

public sealed partial class DiscoverPage : Page
{
    public DiscoverPage()
    {
        this.InitializeComponent();
    }

    private void SearchBox_TextChanged(object sender, TextChangedEventArgs e)
    {
        string keyword = SearchBox.Text.ToLower();

        ItemAutomation.Visibility = "automation".Contains(keyword) ? Visibility.Visible : Visibility.Collapsed;
        ItemXalapa.Visibility = "xalapa".Contains(keyword) ? Visibility.Visible : Visibility.Collapsed;
        ItemWomen.Visibility = "international women's day".Contains(keyword) ? Visibility.Visible : Visibility.Collapsed;
        ItemKorea.Visibility = "south korea economy".Contains(keyword) ? Visibility.Visible : Visibility.Collapsed;
        ItemRussia.Visibility = "russia".Contains(keyword) ? Visibility.Visible : Visibility.Collapsed;
        ItemTaiwan.Visibility = "taiwan".Contains(keyword) ? Visibility.Visible : Visibility.Collapsed;
    }

    // เปิดหน้า detail
    private void OpenInternational(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(DiscoverPageDetail));
    }

    private void GoNews(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(MainPage));
    }

    private void GoAlerts(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(AlertPage));
    }

    private void GoProfile(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(ProfilePage));
    }
}