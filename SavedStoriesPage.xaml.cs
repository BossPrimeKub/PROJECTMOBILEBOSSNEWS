using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;

namespace MyUnoApp;

public sealed partial class SavedStoriesPage : Page
{
    public SavedStoriesPage()
    {
        this.InitializeComponent();
    }

    private void GoBack(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack) Frame.GoBack();
    }

    private void GoNews(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(MainPage));
    private void GoDiscover(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(DiscoverPage));
    private void GoAlerts(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(AlertPage));
    private void GoProfile(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(ProfilePage));
}