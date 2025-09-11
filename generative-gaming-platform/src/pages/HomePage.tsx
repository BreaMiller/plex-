import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, Star, Users, Trophy, Zap, Gamepad2, ArrowRight, Play, Coins } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import GameCard from '../components/games/GameCard';
import FloatingModel3D from '../components/ui/FloatingModel3D';
import FadeInSection from '../components/ui/FadeInSection';
import ChibiCharacter from '../components/ui/ChibiCharacter';

interface PlatformStats {
  totalGames: number;
  totalDownloads: number;
  activeCreators: string;
  lastUpdated: string;
}

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { getFeaturedGames, getTrendingGames } = useGameData();
  const navigate = useNavigate();
  
  const featuredGames = getFeaturedGames();
  const trendingGames = getTrendingGames();
  
  // Dynamic platform stats state
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Fetch platform statistics
  useEffect(() => {
    const fetchPlatformStats = async () => {
      try {
        setStatsLoading(true);
        const response = await fetch('/api/platform/stats.json');
        if (!response.ok) {
          throw new Error('Failed to fetch platform statistics');
        }
        const data: PlatformStats = await response.json();
        setPlatformStats(data);
        setStatsError(null);
      } catch (error) {
        console.error('Error fetching platform stats:', error);
        setStatsError('Failed to load statistics');
        // Fallback to default values
        setPlatformStats({
          totalGames: 6,
          totalDownloads: 59480,
          activeCreators: '50+',
          lastUpdated: new Date().toISOString()
        });
      } finally {
        setStatsLoading(false);
      }
    };

    fetchPlatformStats();
  }, []);

  const handleExploreGames = () => {
    // First navigate to games page, then scroll to games section on this page
    navigate('/games');
  };

  const scrollToGamesSection = () => {
    const gamesSection = document.getElementById('games-section');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickActions = [
    { icon: Sparkles, label: 'Generate Game', path: '/generate', color: 'from-purple-500 to-pink-500', hoverColor: 'hover:text-violet-500', cost: '500 credits' },
    { icon: Coins, label: 'Pricing Guide', path: '/pricing', color: 'from-yellow-500 to-orange-500', hoverColor: 'hover:text-yellow-500' },
    { icon: TrendingUp, label: 'Trending Games', path: '/trending', color: 'from-orange-500 to-red-500', hoverColor: 'hover:text-teal-500' },
    { icon: Star, label: 'Featured Games', path: '/featured', color: 'from-yellow-500 to-orange-500', hoverColor: 'hover:text-cyan-500' },
    { icon: Users, label: 'Community', path: '/community', color: 'from-green-500 to-blue-500', hoverColor: 'hover:text-green-500' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Hero Section */}
      <FadeInSection>
        <div className="relative">
          <div className="relative overflow-hidden min-h-[700px]">
            
            {/* Pink Atmospheric Glow Behind 3D Model */}
            <div 
              className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse z-10 opacity-60" 
              style={{ 
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(219, 39, 119, 0.2) 40%, transparent 70%)',
                animationDelay: '1s',
                animationDuration: '4s'
              }}
            ></div>
            <div 
              className="absolute top-1/2 right-1/3 w-60 h-60 rounded-full blur-2xl animate-pulse z-10 opacity-50" 
              style={{ 
                background: 'radial-gradient(circle, rgba(217, 70, 239, 0.35) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)',
                animationDelay: '3s',
                animationDuration: '5s'
              }}
            ></div>
            
            {/* 3D Model Container - Enhanced positioning */}
            <div className="absolute top-0 right-0 w-1/2 h-full z-20">
              <FloatingModel3D className="w-full h-full" />
            </div>
            
            {/* Content Container - Left side with proper spacing for right-aligned 3D model */}
            <div className="relative z-10 flex items-center min-h-[700px]">
              <div className="w-full lg:w-2/3 xl:w-1/2 p-8 lg:p-12">
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-6 leading-tight pb-2">
                  Create Epic Games at <span className="lightspeed-glow">Lightspeed</span>
                </h1>
                
                <p className="text-slate-300 text-lg sm:text-xl lg:text-2xl max-w-2xl mb-8 leading-relaxed">
                  Unleash your creativity with AI-powered game generation tools. Build, play, and earn rewards for sharing incredible gaming experiences!
                </p>
                
                {/* CTA Buttons - Already optimized for better proportions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-start items-start max-w-md">
                  <Link
                    to="/generate"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-400/40 to-pink-500/50 backdrop-blur-xl border border-pink-400/50 hover:from-purple-300/50 hover:to-pink-400/60 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 justify-center group shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-400/40 hover:border-pink-300/60 text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Creating
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button
                    onClick={scrollToGamesSection}
                    className="w-full sm:w-auto bg-transparent border-2 border-cyan-400 hover:bg-cyan-400/10 text-cyan-400 hover:text-cyan-300 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 justify-center group backdrop-blur-sm hover:border-cyan-300 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Explore Games
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Platform Stats */}
      <FadeInSection delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Games</p>
                {statsLoading ? (
                  <div className="w-12 h-10 bg-slate-700 animate-pulse rounded" />
                ) : (
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {platformStats?.totalGames?.toLocaleString() || '0'}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Downloads</p>
                {statsLoading ? (
                  <div className="w-20 h-10 bg-slate-700 animate-pulse rounded" />
                ) : (
                  <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {platformStats?.totalDownloads?.toLocaleString() || '0'}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Creators</p>
                {statsLoading ? (
                  <div className="w-14 h-10 bg-slate-700 animate-pulse rounded" />
                ) : (
                  <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {platformStats?.activeCreators || '0'}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Quick Actions Section */}
      <FadeInSection delay={200}>
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 lg:p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group relative p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                  <div className="relative">
                    <Icon className={`w-8 h-8 text-white ${action.hoverColor} mb-2 group-hover:scale-110 transition-colors duration-200 ease-in-out`} />
                    <p className="text-sm text-white font-medium">{action.label}</p>
                    {action.cost && (
                      <p className="text-xs text-slate-400 mt-1">{action.cost}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Chibi Space Invaders Section - Updated Layout */}
      <FadeInSection delay={250}>
        <div className="relative overflow-visible py-12 lg:py-16">
          {/* Background Container */}
          <div className="flex flex-col lg:flex-row items-center gap-8 min-h-[800px] overflow-visible">
            
            {/* Chibi Character - Left Side with Relative Start Positioning */}
            <div className="lg:w-1/2 relative h-[700px] overflow-visible" style={{paddingRight: '2rem', paddingBottom: '2rem'}}>
              <div className="relative left-0 w-full max-w-lg h-full overflow-visible bg-gradient-to-br from-transparent via-purple-500/5 to-pink-500/5 rounded-2xl border border-white/5">
                <ChibiCharacter className="w-full h-full overflow-visible" />
              </div>
            </div>
            
            {/* Graffiti Content - Right Side */}
            <div className="lg:w-1/2 flex flex-col justify-center space-y-8 relative z-10">
              {/* Graffiti-Style Title - Fully Responsive */}
              <div className="relative overflow-visible">
                <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 transform -rotate-2 hover:rotate-0 transition-transform duration-300 leading-tight"
                    style={{
                      fontSize: 'clamp(2rem, 8vw, 8rem)',
                      lineHeight: '0.9'
                    }}>
                  CHIBI
                </h3>
                <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 transform rotate-1 hover:rotate-0 transition-transform duration-300 leading-tight"
                    style={{
                      fontSize: 'clamp(2rem, 8vw, 8rem)',
                      lineHeight: '0.9',
                      marginTop: 'clamp(-0.5rem, -2vw, -2rem)'
                    }}>
                  SPACE
                </h3>
                <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 transform -rotate-1 hover:rotate-0 transition-transform duration-300 leading-tight"
                    style={{
                      fontSize: 'clamp(2rem, 8vw, 8rem)',
                      lineHeight: '0.9',
                      marginTop: 'clamp(-0.5rem, -2vw, -2rem)'
                    }}>
                  INVADERS
                </h3>
                
                {/* Graffiti decorative elements - scaled up */}
                <div className="absolute -top-4 -left-8 w-16 h-16 bg-pink-500/30 rounded-full blur-md animate-pulse" />
                <div className="absolute top-16 -right-12 w-12 h-12 bg-cyan-500/40 rounded-full blur-md animate-pulse delay-300" />
                <div className="absolute -bottom-4 left-24 w-8 h-8 bg-purple-500/50 rounded-full blur-md animate-pulse delay-700" />
              </div>
              
              {/* Coming Soon Glass Button - Matching Header Button Size */}
              <div className="flex justify-start">
                <div className="relative group cursor-not-allowed">
                  <div className="bg-gradient-to-r from-purple-400/40 to-pink-500/50 backdrop-blur-xl border border-white/20 rounded-xl px-6 py-3 shadow-lg shadow-pink-500/25 opacity-75">
                    <span className="text-white font-medium text-sm tracking-wide uppercase">
                      Coming Soon
                    </span>
                  </div>
                  
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-xl pointer-events-none" />
                  
                  {/* Disabled state indicator */}
                  <div className="absolute inset-0 bg-black/20 rounded-xl pointer-events-none" />
                </div>
              </div>
              
              {/* Street art style decorative lines - aligned to right side */}
              <div className="hidden xl:block absolute right-0 top-0 w-48 h-48 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path d="M10 10 L90 10 L80 20 L20 20 Z" fill="currentColor" className="text-pink-400" />
                  <path d="M15 30 L85 30 L75 40 L25 40 Z" fill="currentColor" className="text-cyan-400" />
                  <path d="M20 50 L80 50 L70 60 L30 60 Z" fill="currentColor" className="text-purple-400" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Featured Games Section */}
      <FadeInSection delay={300}>
        <section id="games-section">
          {featuredGames.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Featured Games
                </h2>
                <Link 
                  to="/featured" 
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredGames.slice(0, 6).map(game => (
                  <GameCard key={game.game_id} game={game} />
                ))}
              </div>
            </div>
          )}

          {/* Trending Games */}
          {trendingGames.length > 0 && (
            <FadeInSection delay={400}>
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                    Trending Games
                  </h2>
                  <Link 
                    to="/trending" 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {trendingGames.slice(0, 8).map(game => (
                    <GameCard key={game.game_id} game={game} compact />
                  ))}
                </div>
              </div>
            </FadeInSection>
          )}
        </section>
      </FadeInSection>
    </div>
  );
};

export default HomePage;