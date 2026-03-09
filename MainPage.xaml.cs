using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Navigation;
using System.Collections.Generic;
using Windows.ApplicationModel.DataTransfer; // <-- นำเข้าไลบรารีแชร์ของระบบ

namespace MyUnoApp;

public sealed partial class MainPage : Page
{
    public List<NewsItem>? News { get; set; }
    
    public static bool MustShowBanner = false;

    // ตัวแปรสำหรับเก็บข้อมูลข่าวตอนกด Share
    private NewsItem? _newsToShare;

    public MainPage()
    {
        this.InitializeComponent();
        LoadNews();
    }

    protected override void OnNavigatedTo(NavigationEventArgs e)
    {
        base.OnNavigatedTo(e);
        if (MustShowBanner)
        {
            RestoreBanner.Visibility = Visibility.Visible;
            MustShowBanner = false; 
        }

        // เปิดใช้งานระบบ Share ตอนเข้ามาหน้านี้
        DataTransferManager dataTransferManager = DataTransferManager.GetForCurrentView();
        dataTransferManager.DataRequested += DataTransferManager_DataRequested;
    }

    protected override void OnNavigatedFrom(NavigationEventArgs e)
    {
        base.OnNavigatedFrom(e);
        
        // ปิดระบบ Share ตอนออกจากหน้านี้
        DataTransferManager dataTransferManager = DataTransferManager.GetForCurrentView();
        dataTransferManager.DataRequested -= DataTransferManager_DataRequested;
    }

    private void LoadNews()
    {
        News = new List<NewsItem>
        {
            new NewsItem
            {
                Id = 1,
                Category = "Israel-Gaza",
                Location = "Gaza, Palestine",
                Title = "Toddler evacuated from Gaza with rare disease recovers from malnutrition in Italian hospital",
                Sources = "32 Sources • 1h ago",
                Image = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            },
            new NewsItem
            {
                Id = 2,
                Category = "Narendra Modi",
                Location = "India",
                Title = "India’s Modi hails US ties after Trump’s comments",
                Sources = "12 Sources • 2h ago",
                Image = "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            }
        };

        if (NewsList != null)
        {
            NewsList.ItemsSource = News;
        }
    }

    // ฟังก์ชันทำงานเวลากดปุ่ม Share
    private void MenuShare_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement element && element.DataContext is NewsItem news)
        {
            _newsToShare = news;
            // สั่งเปิดหน้าต่าง Share ของมือถือ/คอมพิวเตอร์
            DataTransferManager.ShowShareUI(); 
        }
    }

    // ฟังก์ชันจัดเตรียมข้อมูลส่งให้หน้าต่าง Share
    private void DataTransferManager_DataRequested(DataTransferManager sender, DataRequestedEventArgs args)
    {
        if (_newsToShare != null)
        {
            DataRequest request = args.Request;
            request.Data.Properties.Title = "Boss News";
            request.Data.Properties.Description = "Read this news story on Boss News";
            
            // ส่ง Title ของข่าวใบนั้นไปให้แอปอื่น
            request.Data.SetText($"{_newsToShare.Title}\n\nShared via Boss News App");
        }
    }

    private void NewsList_ItemClick(object sender, ItemClickEventArgs e)
    {
        if (e.ClickedItem is NewsItem clickedNews)
        {
            if (clickedNews.Id == 1) Frame.Navigate(typeof(DetailPage1));
            else if (clickedNews.Id == 2) Frame.Navigate(typeof(DetailPage2));
        }
    }

    private void Headline_Tapped(object sender, TappedRoutedEventArgs e)
    {
        Frame.Navigate(typeof(DetailPage1));
    }

    private void MenuShowLess_Click(object sender, RoutedEventArgs e)
    {
        Frame.Navigate(typeof(SettingsPage));
    }

    private void RestoreOpen_Click(object sender, RoutedEventArgs e)
    {
        RestoreBanner.Visibility = Visibility.Collapsed;
        Frame.Navigate(typeof(SettingsPage));
    }

    private void Discover_Click(object sender, TappedRoutedEventArgs e) { Frame.Navigate(typeof(DiscoverPage)); }
    private void Alerts_Click(object sender, TappedRoutedEventArgs e) { Frame.Navigate(typeof(AlertPage)); }
    private void GoProfile(object sender, TappedRoutedEventArgs e) { Frame.Navigate(typeof(ProfilePage)); }
}

public class NewsItem
{
    public int Id { get; set; }
    public string? Category { get; set; }
    public string? Location { get; set; }
    public string? Title { get; set; }
    public string? Sources { get; set; }
    public string? Image { get; set; } 
}