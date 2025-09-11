// Spazz Platform - Credit Pricing Constants
// Updated pricing system as of 2025

export const PRICING = {
  // Core Actions
  GENERATE_GAME: 500,
  PLAY_GAME: 10,
  DOWNLOAD_GAME: 100,
  
  // Welcome Bonus
  WELCOME_BONUS: 1000,
  
  // Credit Packages (in credits and USD)
  PACKAGES: {
    STARTER: {
      credits: 2000,
      price: 10.00,
      priceDisplay: '$10.00',
      bonus: null,
      description: 'Perfect for trying out the platform'
    },
    CREATOR: {
      credits: 5500,
      price: 25.00,
      priceDisplay: '$25.00',
      bonus: '10% bonus!',
      description: 'Best value for active creators'
    },
    PRO: {
      credits: 12000,
      price: 50.00,
      priceDisplay: '$50.00',
      bonus: '20% bonus!',
      description: 'For power users and teams'
    }
  },
  
  // Earning Rates (credits earned when others interact with your games)
  EARNINGS: {
    PER_PLAY: 5, // Earn 5 credits when someone plays your game
    PER_DOWNLOAD: 50 // Earn 50 credits when someone downloads your game
  }
} as const;

// Action Labels (for UI display)
export const ACTION_LABELS = {
  GENERATE_GAME: 'Generate a Game',
  PLAY_GAME: 'Play a Game',
  DOWNLOAD_GAME: 'Download a Game'
} as const;

// Helper functions for formatting
export const formatCredits = (amount: number): string => {
  return amount.toLocaleString() + ' credits';
};

export const formatPrice = (amount: number): string => {
  return '$' + amount.toFixed(2);
};

// Check if user has enough credits for an action
export const canAfford = (currentBalance: number, actionCost: number): boolean => {
  return currentBalance >= actionCost;
};

// Calculate how many times a user can perform an action with their current balance
export const calculateAffordableCount = (currentBalance: number, actionCost: number): number => {
  return Math.floor(currentBalance / actionCost);
};