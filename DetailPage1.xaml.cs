using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System.Collections.Generic;
using System.Linq;

namespace MyUnoApp;

public sealed partial class DetailPage1 : Page
{
    // แบ็คอัปข้อมูลแหล่งข่าวทั้งหมด
    private List<SourceItem> _allSources = new List<SourceItem>();

    public DetailPage1()
    {
        this.InitializeComponent();
        LoadSources();
    }

    private void LoadSources()
    {
        _allSources = new List<SourceItem>
        {
            new SourceItem
            {
                PublisherName = "France24",
                Bias = "Center",
                BiasColor = "Transparent",
                BiasBorder = "1",
                BiasTextColor = "White",
                Locality = "International",
                LocalityVisibility = Visibility.Visible,
                Factuality = "Very High Factuality",
                Headline = "US-Venezuela standoff deepens, as Trump sends jets and weighs strikes",
                Snippet = "Venezuelan leader Nicolas Maduro on Friday called for dialogue with Washington, hours after President Donald Trump threatened to shoot down Venezuelan mili...",
                TimeAgo = "France • 5h ago"
            },
            new SourceItem
            {
                PublisherName = "El Universo",
                Bias = "Right",
                BiasColor = "#B23E3E", // สีแดง
                BiasBorder = "0",
                BiasTextColor = "White",
                Locality = "",
                LocalityVisibility = Visibility.Collapsed,
                Factuality = "High Factuality",
                Headline = "Maduro Tells Trump that His Intelligence Reports Are False",
                Snippet = "Venezuelan President Nicolas Maduro, citing a report on United Nations drug production, said on Friday, September 5, that Venezuela \"is a country not relevant to drug...",
                TimeAgo = "17h ago"
            }
        };

        SourcesList.ItemsSource = _allSources;
        SourceCountText.Text = $"{_allSources.Count} Sources";
    }

    private void Back_Click(object sender, RoutedEventArgs e)
    {
        if (Frame.CanGoBack) Frame.GoBack();
    }

    // เปิดหน้าต่าง Filter
    private void OpenFilter_Click(object sender, RoutedEventArgs e)
    {
        SortFilterOverlay.Visibility = Visibility.Visible;
    }

    // ปิดหน้าต่าง Filter
    private void CloseFilter_Click(object sender, RoutedEventArgs e)
    {
        SortFilterOverlay.Visibility = Visibility.Collapsed;
    }

    // ล้างค่า Filter กลับเป็นค่าเริ่มต้น
    private void ClearFilter_Click(object sender, RoutedEventArgs e)
    {
        SortComboBox.SelectedIndex = 0;
        FilterLeft.IsOn = false;
        FilterCenter.IsOn = false;
        FilterRight.IsOn = false;
        FilterHigh.IsOn = false;
        FilterVeryHigh.IsOn = false;

        SourcesList.ItemsSource = _allSources;
        SourceCountText.Text = $"{_allSources.Count} Sources";
        SortStatusText.Text = "Sort: Suggested";
        ShowResultsBtn.Content = $"Show {_allSources.Count} result(s)";
        
        SortFilterOverlay.Visibility = Visibility.Collapsed;
    }

    // ประมวลผลเมื่อกดปุ่ม Show Result(s)
    private void ApplyFilter_Click(object sender, RoutedEventArgs e)
    {
        var filteredList = _allSources.AsEnumerable();

        // 1. กรองตาม Bias (Center, Right)
        bool showCenter = FilterCenter.IsOn;
        bool showRight = FilterRight.IsOn;

        if (showCenter || showRight)
        {
            filteredList = filteredList.Where(s => 
                (showCenter && s.Bias == "Center") ||
                (showRight && s.Bias == "Right")
            );
        }

        // 2. กรองตาม Factuality (High, Very High)
        bool showHigh = FilterHigh.IsOn;
        bool showVeryHigh = FilterVeryHigh.IsOn;

        if (showHigh || showVeryHigh)
        {
            filteredList = filteredList.Where(s => 
                (showHigh && s.Factuality == "High Factuality") ||
                (showVeryHigh && s.Factuality == "Very High Factuality")
            );
        }

        // 3. เรียงลำดับ (Sort)
        string sortName = "Suggested";
        if (SortComboBox.SelectedIndex == 1) // Alphabetical
        {
            filteredList = filteredList.OrderBy(s => s.PublisherName);
            sortName = "Alphabetical";
        }
        else if (SortComboBox.SelectedIndex == 2) // Latest
        {
            filteredList = filteredList.OrderBy(s => s.TimeAgo);
            sortName = "Latest";
        }

        // 4. อัปเดตหน้าจอ
        var finalList = filteredList.ToList();
        SourcesList.ItemsSource = finalList;
        SourceCountText.Text = $"{finalList.Count} Sources";
        SortStatusText.Text = $"Sort: {sortName}";
        ShowResultsBtn.Content = $"Show {finalList.Count} result(s)";

        SortFilterOverlay.Visibility = Visibility.Collapsed;
    }
}

// Data Model สำหรับหน้าแหล่งข่าว
public class SourceItem
{
    public string? PublisherName { get; set; }
    public string? Bias { get; set; }
    public string? BiasColor { get; set; }
    public string? BiasBorder { get; set; }
    public string? BiasTextColor { get; set; }
    public string? Locality { get; set; }
    public Visibility LocalityVisibility { get; set; }
    public string? Factuality { get; set; }
    public string? Headline { get; set; }
    public string? Snippet { get; set; }
    public string? TimeAgo { get; set; }
}