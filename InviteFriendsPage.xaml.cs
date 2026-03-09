using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Input;
using Windows.ApplicationModel.DataTransfer;

namespace MyUnoApp;

public sealed partial class InviteFriendsPage : Page
{
    public InviteFriendsPage()
    {
        this.InitializeComponent();
    }

    private void GoBack(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack) Frame.GoBack();
    }

    private void CopyCode_Click(object sender, RoutedEventArgs e)
    {
        var dataPackage = new DataPackage();
        dataPackage.SetText(InviteCodeText.Text);
        Clipboard.SetContent(dataPackage);
    }

    private void ShareCode_Click(object sender, RoutedEventArgs e)
    {
        DataTransferManager dataTransferManager = DataTransferManager.GetForCurrentView();
        dataTransferManager.DataRequested += (s, args) =>
        {
            DataRequest request = args.Request;
            request.Data.Properties.Title = "Boss News Referral";
            request.Data.SetText($"ใช้รหัสเชิญของฉัน: {InviteCodeText.Text} เพื่อรับสิทธิ์ใช้งาน Premium ฟรี 1 เดือน!");
        };
        DataTransferManager.ShowShareUI();
    }

    // เพิ่มฟังก์ชันสำหรับ Navbar ที่ขาดไป
    private void GoNews(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(MainPage));
    private void GoDiscover(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(DiscoverPage));
    private void GoAlerts(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(AlertPage));
    private void GoProfile(object sender, TappedRoutedEventArgs e) => Frame.Navigate(typeof(ProfilePage));
}