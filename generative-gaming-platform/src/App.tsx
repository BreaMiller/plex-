import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameDataProvider } from './contexts/GameDataContext';
import { CreditProvider } from './contexts/CreditContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamesPage from './pages/GamesPage';
import AIGameGeneratorPage from './pages/AIGameGeneratorPage';
import TrendingPage from './pages/TrendingPage';
import FeaturedPage from './pages/FeaturedPage';
import CommunityPage from './pages/CommunityPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import ProfilePage from './pages/ProfilePage';
import FAQPage from './pages/FAQPage';
import PricingPage from './pages/PricingPage';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GameDataProvider>
        <CreditProvider>
          <Router>
            <Routes>
              {/* Login page without layout */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Main app with layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="games" element={<GamesPage />} />
                <Route path="generate" element={<AIGameGeneratorPage />} />
                <Route path="trending" element={<TrendingPage />} />
                <Route path="featured" element={<FeaturedPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="leaderboards" element={<LeaderboardsPage />} />
                <Route path="pricing" element={<PricingPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="faq" element={<FAQPage />} />
                
                {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Router>
        </CreditProvider>
      </GameDataProvider>
    </AuthProvider>
  );
};

export default App;