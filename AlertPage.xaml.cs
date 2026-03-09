using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;
using System;
using System.Collections.ObjectModel; // สำหรับรายการที่อัปเดตอัตโนมัติ
using System.Linq;

namespace MyUnoApp;

public sealed partial class AlertPage : Page
{
    // สร้างรายการข้อมูล Alert
    public ObservableCollection<AlertItem> Alerts { get; set; }

    public AlertPage()
    {
        this.InitializeComponent();
        
        // ข้อมูลเริ่มต้น
        Alerts = new ObservableCollection<AlertItem>
        {
            new AlertItem { 
                Id = 1,
                Title = "Iran attacks breach international law, Swiss Defence Minister says", 
                Time = "8 Mar 2026 19:06", 
                ImageUrl = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80" 
            },
            new AlertItem { 
                Id = 2,
                Title = "Welcome to Ground News! Let's get started.", 
                Time = "12:57 PM September 06, 2025", 
                ImageUrl = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=200&q=80" 
            }
        };

        AlertsList.ItemsSource = Alerts;
    }

    // ฟังก์ชันเมื่อกดลบ (Swipe แล้วกด Delete)
    private async void Delete_Invoked(SwipeItem sender, SwipeItemInvokedEventArgs args)
    {
        if (args.SwipeControl.DataContext is AlertItem itemToDelete)
        {
            // สร้างหน้าต่างยืนยันตามรูปภาพ
            ContentDialog deleteDialog = new ContentDialog
            {
                Title = "Are you sure you want to delete this alert?",
                PrimaryButtonText = "Delete",
                CloseButtonText = "Cancel",
                DefaultButton = ContentDialogButton.Close,
                XamlRoot = this.XamlRoot
            };

            var result = await deleteDialog.ShowAsync();

            if (result == ContentDialogResult.Primary)
            {
                // ลบข้อมูลออกจากรายการ หน้าจอจะอัปเดตเองทันที
                Alerts.Remove(itemToDelete);
            }
        }
    }

    private void Share_Invoked(SwipeItem sender, SwipeItemInvokedEventArgs args)
    {
        // ใส่ฟังก์ชันแชร์ต่อได้ที่นี่ครับ
    }

    private void OpenAlert(object sender, TappedRoutedEventArgs e)
    {
        Frame.Navigate(typeof(AlertPageDetail));
    }

    // ระบบ Navigation
    private void GoNews(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(MainPage));
    private void GoDiscover(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(DiscoverPage));
    private void GoProfile(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(ProfilePage));
}

// คลาสเก็บข้อมูล
public class AlertItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Time { get; set; }
    public string ImageUrl { get; set; }
}