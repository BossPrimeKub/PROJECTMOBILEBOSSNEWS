using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MyUnoApp;

public sealed partial class SettingsPage : Page
{
    public SettingsPage()
    {
        this.InitializeComponent();
    }

    private void Save_Click(object sender, RoutedEventArgs e)
    {
        // ส่งสัญญาณบอก MainPage ให้โชว์ Banner
        MainPage.MustShowBanner = true; 
        
        if (Frame.CanGoBack) 
        {
            Frame.GoBack();
        }
    }

    private void Cancel_Click(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack) 
        {
            Frame.GoBack();
        }
    }
}