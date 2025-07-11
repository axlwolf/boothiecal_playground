# BoothieCall Playground

A sophisticated web-based photobooth application featuring the elegant "Elegancia Nocturna" design system. Built with React, Vite, and Tailwind CSS, this playground allows users to create, customize, and download professional photo strips with luxury dark aesthetics and gold accents.

## 🌟 Features

### 📸 **Photo & GIF Capture**
- **Real-time camera integration** with high-quality photo capture
- **Animated GIF creation** - captures motion during photo sessions
- **Multiple shot layouts**: 1, 3, 4, or 6 photos per strip
- **Countdown timer** with visual feedback for perfect timing
- **Auto-capture** with customizable countdown (3 seconds)
- **Retake functionality** for multiple attempts
- **Dual download options**: Photo strips (PNG) or animated GIF strips

### 🎨 **Design Customization**
- **Multiple design templates** for each layout type
- **Paginated design selection** with visual preview
- **Frame mapping system** for precise photo placement
- **Responsive design** that works on desktop and mobile
- **Smart cropping** with aspect ratio preservation

### 🎭 **Photo Filters**
- **15+ filter effects**: Noir, Vintage, Glam, Pencil Sketch, Extra Sharp, Warm, Cool, Faded, Black & White, Sepia, Brightness, Contrast, Blur, Invert, and more
- **Individual photo filtering** - apply different filters to each photo
- **"All Photos" option** - apply the same filter to all photos at once
- **Real-time preview** - see filter effects on photo thumbnails
- **Paginated filter selection** - browse through all available filters

### 🌈 **Elegancia Nocturna Design System**
- **Luxury dark theme** with sophisticated gold accents (#D8AE48)
- **Premium typography** using Cinzel (headings) and Montserrat (body)
- **Elegant cursor design** with custom golden styling
- **Gallery background collage** showcasing photo examples
- **Animated dark gradients** for premium feel
- **Sophisticated color palette** optimized for luxury aesthetics

### 🖼️ **Photo Processing**
- **Smart image cropping** with aspect ratio preservation
- **Frame overlay system** with precise positioning
- **Border radius support** for rounded photo frames
- **High-quality output** suitable for printing
- **GIF compositing** with frame overlays for animated strips

### 📱 **User Experience**
- **Beautiful landing page** with animated elements and shooting star cursor
- **Step-by-step workflow** with clear navigation
- **Responsive interface** optimized for all screen sizes
- **Interactive hover effects** and smooth transitions
- **Help system** with usage instructions
- **Pagination controls** that hide when not needed

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/axlwolf/boothiecal_playground.git
   cd boothiecal_playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/photobooth-web/` to access the BoothieCall Playground

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
boothiecal_playground/
├── public/
│   ├── designs/          # Photo strip design templates
│   │   ├── 1shot-design1.png to 1shot-design9.png
│   │   ├── 3shot-design1.png to 3shot-design5.png
│   │   ├── 4shot-design1.png to 4shot-design5.png
│   │   └── 6shot-design1.png to 6shot-design3.png
│   ├── images/           # Layout preview images
│   └── logo.png          # Application logo
├── src/
│   ├── components/
│   │   ├── AppLayout.jsx           # Main layout wrapper with shooting star
│   │   ├── BackButton.jsx          # Navigation button
│   │   ├── CameraSetup.jsx         # Camera capture logic with GIF support
│   │   ├── ControlsCard.jsx        # Control interface
│   │   ├── FilterCarousel.jsx      # Photo filter options with "All Photos"
│   │   ├── FrameLayout.jsx         # Frame layout component
│   │   ├── frameMappings.js        # Photo frame positioning data
│   │   ├── Landing.jsx             # Welcome page with animations
│   │   ├── NextButton.jsx          # Navigation button
│   │   ├── Photobooth.jsx          # Main photobooth logic
│   │   ├── PhotoLayoutCard.jsx     # Layout selection cards
│   │   ├── StripDesign.jsx         # Design selection with GIF download
│   │   ├── StripLayoutSelection.jsx # Layout selection
│   │   └── ThemeContext.jsx        # Theme management system
│   ├── App.jsx                     # Main application component
│   ├── App.css                     # Application styles
│   ├── index.css                   # Global styles with animations
│   └── main.jsx                    # Application entry point
├── package.json                    # Dependencies and scripts
├── tailwind.config.js             # Tailwind CSS configuration
└── vite.config.js                 # Vite build configuration
```

## 🎯 How It Works

### 1. **Landing Page**
- Elegant BoothieCall branding with premium logo display
- Gallery background collage showcasing photo examples
- Sophisticated Elegancia Nocturna dark theme with gold accents
- Interactive hover animations with sample photo strips
- "Start Playground" button to begin the photobooth experience

### 2. **Layout Selection**
- Choose from 4 different photo strip layouts:
  - **1 Shot**: Single photo layout
  - **3 Shot**: Vertical 3-photo strip
  - **4 Shot**: Vertical 4-photo strip  
  - **6 Shot**: 2x3 grid layout
- Visual preview of each layout option
- Responsive grid layout for mobile devices

### 3. **Photo Capture**
- Camera access with real-time preview
- Countdown timer with visual feedback
- Automatic photo capture after countdown
- **GIF capture** during photo sessions for animated strips
- Progress indicator showing current photo number
- Retake option for multiple attempts
- Theme-aware camera interface

### 4. **Filter Selection**
- **15+ filter effects** with real-time preview
- **Individual photo filtering** - apply different filters to each photo
- **"All Photos" option** - apply the same filter to all photos at once
- **Paginated filter selection** - browse through all available filters
- **Smart highlighting** - shows which photos have which filters

### 5. **Design Selection**
- Multiple available design templates for each layout
- Browse through available design templates
- Paginated interface with visual preview
- Responsive grid layout
- Theme-aware design cards

### 6. **Download Options**
- **Photo Strip (PNG)**: Static photo strip with selected design
- **GIF Strip (Animated)**: Animated strip with captured GIFs
- Automatic photo positioning using frame mappings
- High-quality output suitable for printing
- Direct download to device

## 🛠️ Technical Details

### **Core Technologies**
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom Elegancia Nocturna theme
- **MediaRecorder API** - For GIF capture functionality
- **gifshot** - GIF creation and compositing
- **gifuct-js** - GIF processing and manipulation
- **Google Fonts** - Cinzel and Montserrat for premium typography

### **Key Dependencies**
- `gifshot` - GIF creation capabilities
- `gifuct-js` - GIF processing and frame extraction
- `react-webcam` - Webcam integration
- **Dynamic imports** for optimized loading

### **Elegancia Nocturna Design System**
- **Sophisticated color palette** with luxury dark backgrounds and gold accents
- **Premium typography system** with elegant serif headings
- **Custom Tailwind configuration** with brand-specific colors and spacing
- **Gallery background integration** using dynamic image collages
- **Refined cursor experience** with subtle gold styling

### **Filter System**
- **CSS filter effects** applied in real-time
- **Individual photo targeting** with smart UI
- **"All Photos" bulk application** for efficiency
- **Paginated filter selection** for better UX
- **Visual feedback** showing applied filters

### **GIF System**
- **MediaRecorder integration** for motion capture
- **Frame-by-frame processing** with gifuct-js
- **GIF compositing** with design overlays
- **Optimized file sizes** for web sharing
- **Cross-browser compatibility**

### **Frame Mapping System**
The application uses a sophisticated frame mapping system (`frameMappings.js`) that defines:
- Exact positioning of photos within design templates
- Border radius for rounded corners
- Frame dimensions and aspect ratios
- Support for different layout types
- GIF frame positioning for animated strips

### **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized camera viewport handling
- Responsive pagination controls

## 🎨 Customization

### **Adding New Designs**
1. Add design images to `public/designs/`
2. Update `designOverlaysByLayout` in `Photobooth.jsx`
3. Add frame mapping in `frameMappings.js`
4. Test positioning and adjust coordinates

### **Adding New Filters**
1. Add filter definition to `FILTERS` array in `ControlsCard.jsx`
2. Test filter effects on different photo types
3. Ensure cross-browser compatibility

### **Modifying Layouts**
- Edit `StripLayoutSelection.jsx` to add new layout options
- Update preview images in `public/images/`
- Adjust frame mappings accordingly

### **Theme Customization**
- Modify theme colors in `ThemeContext.jsx`
- Update CSS animations in `index.css`
- Customize shooting star behavior in `AppLayout.jsx`

## 🌐 Deployment

The application is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will build the project and deploy it to the configured GitHub Pages URL.

**Note**: After committing and pushing changes to main, run `npm run build` and then the deploy command.

## 📱 Browser Compatibility

- **Chrome/Edge**: Full support with all features
- **Firefox**: Full support with all features
- **Safari**: Full support with all features
- **Mobile browsers**: Responsive design with camera access
- **GIF features**: Supported in all modern browsers

## 🎉 Recent Updates

- ✅ **Elegancia Nocturna design system** implementation
- ✅ **Premium typography** with Cinzel and Montserrat fonts
- ✅ **Luxury gold color palette** (#D8AE48) throughout the app
- ✅ **Gallery background collage** using dynamic photo examples
- ✅ **Sophisticated cursor design** with elegant golden styling
- ✅ **BoothieCall branding** integration with custom logo
- ✅ **Enhanced user experience** with refined dark aesthetics
- ✅ **TypeScript migration roadmap** for future development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🛠️ Git Configuration for Multiple GitHub Accounts

If you're using multiple GitHub accounts and encounter authentication issues when pushing to this repository, follow these steps:

1. **Check your SSH configuration**:
   ```bash
   # View your SSH config
   cat ~/.ssh/config
   ```

2. **Configure SSH for multiple accounts** (if not already done):
   ```bash
   # Edit SSH config
   nano ~/.ssh/config
   ```
   
   Add configuration like this:
   ```
   # Main account
   Host github.com
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_rsa
   
   # Secondary account (axlwolf)
   Host github-axlwolf
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_ed25519_axlwolf
   ```

3. **Set the correct remote URL for this repository**:
   ```bash
   # Remove existing remote
   git remote remove origin
   
   # Add remote with the correct host alias
   git remote add origin git@github-axlwolf:axlwolf/boothiecal_playground.git
   ```

4. **Push to the repository using the configured remote**:
   ```bash
   git push -u origin main
   ```

This configuration allows Git to use the correct SSH key for each GitHub account.

## 🙏 Acknowledgments

- Built with React and Vite
- Camera integration powered by p5.js
- Styling with Tailwind CSS
- Design templates created for optimal photo placement

---

**Created with ❤️ by Axel Lanuza for BoothieCall.net**
