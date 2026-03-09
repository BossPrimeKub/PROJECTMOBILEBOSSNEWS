using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;

namespace MyUnoApp;

public sealed partial class ProfilePage : Page
{
    public ProfilePage()
    {
        this.InitializeComponent();
    }

    // --- NAVBAR ---
    private void GoNews(object sender, TappedRoutedEventArgs e) => SafeNavigate(typeof(MainPage));
    private void GoDiscover(object sender, TappedRoutedEventArgs e) => SafeNavigate(typeof(DiscoverPage));
    private void GoAlerts(object sender, TappedRoutedEventArgs e) => SafeNavigate(typeof(AlertPage));

    // --- ACTIVITY ---
    private void GoManageSources(object sender, TappedRoutedEventArgs e) 
    {
        // ใส่โค้ดนำทางไปหน้าจัดการแหล่งข่าวที่นี่
    }

    private void GoRecentlyViewed(object sender, TappedRoutedEventArgs e)
    {
        SafeNavigate(typeof(RecentlyViewedPage));
    }

    private void GoSavedStories(object sender, TappedRoutedEventArgs e)
    {
        SafeNavigate(typeof(SavedStoriesPage));
    }

    // --- PROMOTIONS ---
    private void GoRedeemOffer(object sender, TappedRoutedEventArgs e)
    {
        SafeNavigate(typeof(RedeemOfferPage));
    }

    private void GoInviteFriends(object sender, TappedRoutedEventArgs e)
    {
        SafeNavigate(typeof(InviteFriendsPage));
    }

    // ฟังก์ชันช่วยนำทางเพื่อความปลอดภัย
    private void SafeNavigate(System.Type pageType)
    {
        if (Frame != null)
        {
            Frame.Navigate(pageType);
        }
    }
}