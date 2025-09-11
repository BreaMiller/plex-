import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CreditTransaction {
  id: string;
  user_id: string;
  transaction_type: string;
  amount: number;
  description: string;
  game_id?: string;
  balance_after: number;
  created_at: string;
}

interface CreditContextType {
  balance: number;
  transactions: CreditTransaction[];
  spendCredits: (amount: number, type: string, description: string, gameId?: string) => boolean;
  earnCredits: (amount: number, type: string, description: string, gameId?: string) => void;
  isLoading: boolean;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};

interface CreditProviderProps {
  children: ReactNode;
}

export const CreditProvider: React.FC<CreditProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Credit costs
  const CREDIT_COSTS = {
    PLAY_GAME: 5,
    DOWNLOAD_GAME: 10,
    FAVORITE_GAME: 3
  };

  useEffect(() => {
    if (user) {
      // Load user's credit balance and transactions from localStorage
      const storedBalance = localStorage.getItem(`credits_${user.user_id}`);
      const storedTransactions = localStorage.getItem(`transactions_${user.user_id}`);
      
      if (storedBalance) {
        setBalance(parseInt(storedBalance));
      } else {
        // Initialize with user's earned credits from stats
        setBalance(user.stats.credits_earned || 1000); // Start with 1000 credits
        localStorage.setItem(`credits_${user.user_id}`, (user.stats.credits_earned || 1000).toString());
      }
      
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    }
  }, [user]);

  const spendCredits = (amount: number, type: string, description: string, gameId?: string): boolean => {
    if (!user) return false;
    if (balance < amount) return false;

    const newBalance = balance - amount;
    const transaction: CreditTransaction = {
      id: `tx_${Date.now()}`,
      user_id: user.user_id,
      transaction_type: type,
      amount: -amount,
      description,
      game_id: gameId,
      balance_after: newBalance,
      created_at: new Date().toISOString()
    };

    setBalance(newBalance);
    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    
    // Save to localStorage
    localStorage.setItem(`credits_${user.user_id}`, newBalance.toString());
    localStorage.setItem(`transactions_${user.user_id}`, JSON.stringify(newTransactions));
    
    return true;
  };

  const earnCredits = (amount: number, type: string, description: string, gameId?: string) => {
    if (!user) return;

    const newBalance = balance + amount;
    const transaction: CreditTransaction = {
      id: `tx_${Date.now()}`,
      user_id: user.user_id,
      transaction_type: type,
      amount: amount,
      description,
      game_id: gameId,
      balance_after: newBalance,
      created_at: new Date().toISOString()
    };

    setBalance(newBalance);
    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    
    // Save to localStorage
    localStorage.setItem(`credits_${user.user_id}`, newBalance.toString());
    localStorage.setItem(`transactions_${user.user_id}`, JSON.stringify(newTransactions));
  };

  const value = {
    balance,
    transactions,
    spendCredits,
    earnCredits,
    isLoading
  };

  return <CreditContext.Provider value={value}>{children}</CreditContext.Provider>;
};

// Export credit costs for use in components
export const CREDIT_COSTS = {
  PLAY_GAME: 5,
  DOWNLOAD_GAME: 10,
  FAVORITE_GAME: 3
};
