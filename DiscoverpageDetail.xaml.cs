using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input; // เพิ่มสำหรับ TappedRoutedEventArgs
using System;
using Windows.ApplicationModel.DataTransfer;

namespace MyUnoApp;

public sealed partial class DiscoverPageDetail : Page
{
    private string _shareText = "International Women's Day news on Boss News";

    public DiscoverPageDetail()
    {
        this.InitializeComponent();
    }

    // ฟังก์ชันกดย้อนกลับ (จากปุ่มด้านบน)
    private void GoBack(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack)
        {
            Frame.GoBack();
        }
        else
        {
            Frame.Navigate(typeof(DiscoverPage));
        }
    }

    // ฟังก์ชันเมื่อกด Follow
    private async void Follow_Click(object sender, RoutedEventArgs e)
    {
        ContentDialog dialog = new ContentDialog
        {
            Title = "Follow",
            Content = "You are now following International Women's Day",
            CloseButtonText = "OK",
            XamlRoot = this.XamlRoot
        };

        await dialog.ShowAsync();
    }

    // ฟังก์ชันเมื่อกด Share
    private void Share_Click(object sender, RoutedEventArgs e)
    {
        DataTransferManager dataTransferManager = DataTransferManager.GetForCurrentView();
        dataTransferManager.DataRequested += OnDataRequested;
        DataTransferManager.ShowShareUI();
    }

    private void OnDataRequested(DataTransferManager sender, DataRequestedEventArgs args)
    {
        DataRequest request = args.Request;
        request.Data.Properties.Title = "Boss News Share";
        request.Data.SetText(_shareText + "\n\nShared via Boss News App");
        sender.DataRequested -= OnDataRequested;
    }

    // ==========================================
    // ฟังก์ชันสำหรับ NAVBAR (Tapped Events)
    // ==========================================

    private void GoNews(object sender, TappedRoutedEventArgs e)
    {
        Frame.Navigate(typeof(MainPage));
    }

    private void GoDiscover(object sender, TappedRoutedEventArgs e)
    {
        // อยู่หน้านี้อยู่แล้ว แต่อาจจะสั่ง Refresh หรือ Navigate กลับหน้า Discover หลัก
        Frame.Navigate(typeof(DiscoverPage));
    }

    private void GoAlerts(object sender, TappedRoutedEventArgs e)
    {
        Frame.Navigate(typeof(AlertPage));
    }

    private void GoProfile(object sender, TappedRoutedEventArgs e)
    {
        Frame.Navigate(typeof(ProfilePage));
    }
}