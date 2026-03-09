using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MyUnoApp;

public sealed partial class AlertPage : Page
{
    public AlertPage()
    {
        this.InitializeComponent();
    }

    private void GoNews(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(MainPage));
    }

    private void OpenAlert(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(AlertDetailPage));
    }
}