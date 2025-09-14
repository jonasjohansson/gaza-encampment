# Malmö vs Gaza Population Density Visualizer

A powerful Chrome extension that creates an interactive visualization comparing population density between Malmö Kommun (366,803 people in 156.95 km²) and the Gaza encampment (2 million people in 42 km²). This educational tool highlights the humanitarian crisis through visual representation.

## 🌟 Features

- **Interactive Visualization**: Full-screen overlay with white dots representing Malmö's population
- **Gaza Comparison**: Red-bordered area showing Gaza's population density (20x more dense than Malmö)
- **Responsive Design**: Automatically adapts to window resizing
- **Educational Tool**: Perfect for understanding population density concepts
- **Clean Interface**: Distraction-free visualization with clear information labels

## 📊 The Data

- **Malmö Kommun**: 366,803 people in 156.95 km²
- **Gaza Encampment**: 2,000,000 people in 42 km²
- **Density Ratio**: Gaza is approximately 20 times more densely populated than Malmö

## 🚀 Installation

### Method 1: Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) (link coming soon)
2. Search for "Malmö vs Gaza Population Density"
3. Click "Add to Chrome"
4. Confirm installation

### Method 2: Manual Installation (Developer Mode)

1. **Download the Extension**:

   - Click the green "Code" button on this GitHub page
   - Select "Download ZIP"
   - Extract the ZIP file to a folder on your computer

2. **Open Chrome Extensions Page**:

   - Open Google Chrome
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the Extension**:

   - Click "Load unpacked"
   - Select the folder containing the extracted extension files
   - The extension should now appear in your extensions list

4. **Pin the Extension** (Optional):
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "Malmö vs Gaza Population Density" and click the pin icon

## 🎯 How to Use

1. **Activate the Extension**:

   - Click the extension icon in Chrome's toolbar, OR
   - Use the keyboard shortcut `Alt + G`

2. **View the Visualization**:

   - The extension will create a full-screen overlay
   - White dots represent Malmö's population spread across the entire screen
   - Black dots in the red-bordered area represent Gaza's population
   - The dramatic density difference is immediately apparent

3. **Close the Visualization**:
   - Click the extension icon again, OR
   - Use `Alt + G` again, OR
   - Refresh the page

## 🔧 Technical Details

- **Manifest Version**: 3
- **Permissions**: `activeTab`, `scripting` (minimal permissions)
- **File Size**: < 50KB
- **Compatibility**: Chrome 88+

## 📁 File Structure

```
gaza-encampment/
├── manifest.json      # Extension configuration
├── background.js      # Service worker
├── content.js         # Main visualization logic
├── icon16.png         # 16x16 extension icon
├── icon48.png         # 48x48 extension icon
├── icon128.png        # 128x128 extension icon
└── README.md          # This file
```

## 🎨 How It Works

The extension uses HTML5 Canvas to draw millions of dots representing population density:

1. **Malmö Visualization**: 366,803 white dots spread across the full browser window
2. **Gaza Visualization**: 2,000,000 black dots densely packed in a small red-bordered area (26.8% of screen)
3. **Density Comparison**: The visual contrast immediately shows Gaza's extreme population density

## 🌍 Educational Purpose

This extension serves as an educational tool to:

- Visualize population density concepts
- Highlight humanitarian crises
- Provide context for understanding overcrowding
- Demonstrate the scale of displacement

## 📚 Data Sources

- **Malmö Data**: [Wikipedia - Malmö kommun](https://sv.wikipedia.org/wiki/Malm%C3%B6_kommun)
- **Gaza Data**: [DN.se article](https://www.dn.se/varlden/israel-tvangsforflyttar-alla-i-gaza-stad-till-ett-redan-overbefolkat-omrade/)

## 🤝 Contributing

This is an open-source project. Feel free to:

- Report issues
- Suggest improvements
- Submit pull requests
- Fork the repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This extension is created for educational purposes to highlight humanitarian issues. It does not collect, store, or transmit any user data.

## 🔗 Links

- [Chrome Web Store](https://chrome.google.com/webstore) (coming soon)
- [GitHub Repository](https://github.com/yourusername/gaza-encampment)
- [Report an Issue](https://github.com/yourusername/gaza-encampment/issues)

---

**Note**: Replace `yourusername` in the GitHub links with your actual GitHub username.
