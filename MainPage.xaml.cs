using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System.Collections.Generic;

namespace MyUnoApp;

public sealed partial class MainPage : Page
{
    public List<NewsItem>? News { get; set; }

    public MainPage()
    {
        this.InitializeComponent();
        LoadNews();
    }

    private void LoadNews()
    {
        News = new List<NewsItem>
        {
            new NewsItem
            {
                Category = "Israel-Gaza",
                Title = "Toddler evacuated from Gaza with rare disease recovers from malnutrition in Italian hospital",
                Time = "1h ago"
            },
            new NewsItem
            {
                Category = "Narendra Modi",
                Title = "India’s Modi hails US ties after Trump’s comments",
                Time = "2h ago"
            }
        };

        if (NewsList != null)
        {
            NewsList.ItemsSource = News;
        }
    }

    private void TopInternational_Click(object sender, RoutedEventArgs e)
    {
        ShowMessage("Top International");
    }

    private void ForYou_Click(object sender, RoutedEventArgs e)
    {
        ShowMessage("For You");
    }

    private void Blindspot_Click(object sender, RoutedEventArgs e)
    {
        ShowMessage("Blindspot");
    }

    // NAVBAR

    private void News_Click(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(MainPage));
    }

    private void Discover_Click(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(DiscoverPage));
    }

    private void Alerts_Click(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(AlertPage));
    }

    private void Profile_Click(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(ProfilePage));
    }

    // สำคัญ: สำหรับ XAML ที่ใช้ Tapped="GoProfile"

    private void GoProfile(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(ProfilePage));
    }

    private async void ShowMessage(string text)
    {
        ContentDialog dialog = new ContentDialog
        {
            Title = "Navigation",
            Content = $"You clicked {text}",
            CloseButtonText = "OK",
            XamlRoot = this.XamlRoot
        };

        await dialog.ShowAsync();
    }
}

public class NewsItem
{
    public string? Category { get; set; }
    public string? Title { get; set; }
    public string? Time { get; set; }
}