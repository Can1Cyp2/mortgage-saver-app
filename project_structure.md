# TypeScript React Native Mortgage Calculator Project Structure

```
mortgage-saver-app/
├── .expo/                          # Expo development cache
├── .git/                           # Git version control
├── assets/                         # App icons and graphics
│   ├── adaptive-icon.png           # Android adaptive icon
│   ├── AltSiteIcon.jpeg           # Alternative site icon
│   ├── favicon.png                # Web favicon
│   ├── icon.png                   # Main app icon (1024x1024)
│   ├── SkipCoffeeGraphic.png      # Marketing graphic
│   ├── splash-icon.png            # Splash screen icon
│   └── svg-AppIcon.svg            # Vector app icon
├── node_modules/                   # Dependencies
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
├── .gitignore                     # Git ignore rules
├── app.json                       # Expo app configuration
├── App.tsx                        # Root component
├── eas.json                       # EAS Build configuration
├── index.ts                       # Entry point
├── package-lock.json              # Locked dependency versions
├── package.json                   # Dependencies and scripts
├── project_structure.md           # This file
├── README.md                      # Project documentation
└── tsconfig.json                  # TypeScript configuration
```

