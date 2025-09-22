# OwnItSooner - Smart Mortgage Calculator 🏠💰

A professional React Native mortgage calculator app that helps homeowners and prospective buyers optimize their mortgage payments and save thousands in interest through strategic payment planning.

## 📱 App Overview

**OwnItSooner** empowers users to make informed decisions about their mortgage by providing comprehensive calculations and side-by-side comparisons of different payment strategies. Whether you're buying your first home or looking to pay off your current mortgage faster, this app reveals exactly how much money and time you can save.

## ✨ Key Features

### 🧮 Core Mortgage Calculations
- **Monthly Payment Calculator**: Precise calculations for any loan amount, interest rate, and term
- **Real-time Updates**: Calculations update instantly as you adjust parameters
- **Professional Algorithms**: Accurate amortization calculations you can trust

### 💡 Payment Strategy Analysis
- **Extra Monthly Payments**: See the impact of adding any amount to your regular payment
- **One-Time Lump Sum Payments**: Calculate savings from applying bonuses, inheritance, or savings
- **Flexible Options**: Choose between reducing monthly payments or shortening loan term

### 📊 Comprehensive Comparisons
- **Side-by-Side Analysis**: Compare regular payments vs. optimized payment strategies
- **Interest Savings**: View total interest saved over the life of the loan
- **Time Savings**: See exactly how many years and months you can cut off your mortgage
- **Total Cost Analysis**: Understand the complete financial impact of your decisions

### 🎨 User Experience
- **Clean Interface**: Modern, intuitive design that's easy to navigate
- **Input Validation**: Smart error handling and user-friendly feedback
- **Responsive Design**: Optimized for all mobile screen sizes
- **Professional Styling**: Consistent color scheme and typography

## 🛠 Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript for type safety and better development experience
- **Architecture**: Component-based modular design
- **Calculations**: Custom mathematical algorithms for precise financial computations
- **Styling**: Custom styling system with consistent color palette

## 📁 Project Structure

```
mortgage-saver-app/
├── .expo/                          # Expo development cache
├── assets/                         # App icons and graphics
│   ├── adaptive-icon.png           # Android adaptive icon
│   ├── AltSiteIcon.jpeg           # Alternative site icon
│   ├── favicon.png                # Web favicon
│   ├── icon.png                   # Main app icon 
│   ├── SkipCoffeeGraphic.png      # Marketing graphic
│   ├── splash-icon.png            # Splash screen icon
│   └── svg-AppIcon.svg            # Vector app icon
├── src/                           # Source code
│   ├── components/                # Reusable UI components
│   │   ├── InfoButton.tsx         # Information display component
│   │   ├── InputField.tsx         # Form input component
│   │   ├── LoanComparison.tsx     # Side-by-side comparison component
│   │   └── ResultCard.tsx         # Results display component
│   ├── constants/                 # App constants
│   │   └── colours.ts             # Color palette
│   ├── screens/                   # Screen components
│   │   └── MortgageCalculatorScreen.tsx # Main calculator screen
│   ├── types/                     # TypeScript type definitions
│   │   └── index.ts               # Shared types
│   └── utils/                     # Utility functions
│       └── mortgageCalculations.ts # Core calculation logic
├── .env.expo                      # Expo environment variables
├── app.json                       # Expo app configuration
├── App.tsx                        # Root component
├── eas.json                       # EAS Build configuration
├── index.ts                       # Entry point
├── package.json                   # Dependencies and scripts
├── project_structure.md           # Project structure documentation
├── README.md                      # This file
└── tsconfig.json                  # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Can1Cyp2/mortgage-saver-app.git
   cd mortgage-saver-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platform**
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web browser
   ```

### Building for Production

**iOS Build**
```bash
npm run build:ios
```

**Android Build**
```bash
npm run build:android
```

## 📱 Usage Examples

### Basic Mortgage Calculation
1. Enter your loan amount (e.g., $300,000)
2. Set your interest rate (e.g., 6.5%)
3. Choose your loan term (e.g., 30 years)
4. View your monthly payment instantly

### Extra Payment Strategy
1. Complete basic mortgage details
2. Toggle "Extra Monthly Payment" strategy
3. Enter additional monthly amount (e.g., $200)
4. See total savings and time reduction

### One-Time Payment Strategy
1. Complete basic mortgage details
2. Toggle "One-Time Payment" strategy
3. Enter lump sum amount (e.g., $10,000)
4. Choose to reduce payments or shorten term
5. Compare results with regular payment schedule

## 💰 Real-World Impact

**Example Scenario:**
- **Loan Amount**: $400,000
- **Interest Rate**: 6.5%
- **Term**: 30 years
- **Extra Payment**: $300/month

**Results:**
- **Interest Saved**: $142,000+
- **Time Saved**: 8 years, 2 months
- **Total Savings**: Massive financial impact

## 🔧 Development Scripts

```bash
npm start           # Start Expo development server
npm run ios         # Run on iOS simulator
npm run android     # Run on Android emulator
npm run web         # Run in web browser
npm run build:ios   # Build for iOS App Store
npm run build:android # Build for Google Play Store
npm run whoami      # Check EAS CLI authentication
```

## 🎯 Target Audience

- **First-time homebuyers** planning their mortgage strategy
- **Current homeowners** looking to optimize their payments
- **Real estate professionals** helping clients with mortgage decisions
- **Financial advisors** providing mortgage guidance
- **Anyone** interested in understanding mortgage mathematics

## 🔒 Privacy & Security

- **Local Calculations**: All computations performed on-device
- **No Data Collection**: We don't collect or store personal information
- **No Network Requests**: Your financial data never leaves your device
- **Privacy-First**: Designed with user privacy as a core principle

## 📈 (possible) Future Enhancements

- [ ] Multiple loan comparison tool
- [ ] Refinancing calculator
- [ ] Mortgage insurance calculations
- [ ] Tax deduction estimates
- [ ] Payment schedule export
- [ ] Dark mode support
- [ ] Multiple currency support

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 with Commons Clause - see the [LICENSE](LICENSE) file for details.

**Key License Points:**
- ✅ Open source for personal use, learning, and contributions
- ❌ Commercial use prohibited without explicit permission
- ✅ Contributions welcome via pull requests
- ❌ Forking for independent distribution not allowed

## 📞 Contact

**Developer**: Can1Cyp2  
**Email**: can1cyp2apps@gmail.com  
**Website**: https://SebastianLandry.ca

## 🙏 Acknowledgments

- Built with React Native and Expo
- Inspired by the need for transparent, accurate mortgage calculations
- Designed to help people achieve homeownership goals faster

---

**Made with ❤️ to help you own your home sooner!**