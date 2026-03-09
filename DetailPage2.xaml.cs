using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;

namespace MyUnoApp;

public sealed partial class DetailPage2 : Page
{
    public DetailPage2()
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