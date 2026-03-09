using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MyUnoApp;

public sealed partial class AlertPageDetail : Page
{
    public AlertPageDetail()
    {
        this.InitializeComponent();
    }

    private void Back_Click(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack)
        {
            Frame.GoBack();
        }
    }
}