import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import GameCard from '../components/games/GameCard';

const TrendingPage: React.FC = () => {
  const { getTrendingGames } = useGameData();
  const trendingGames = getTrendingGames();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
          Trending Games
        </h1>
        <p className="text-slate-400 text-lg">
          Discover the hottest games trending right now in our community
        </p>
      </div>

      {/* Trending Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{trendingGames.length}</p>
          <p className="text-slate-400 text-sm">Trending Games</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-red-400 text-lg font-bold">🔥</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {trendingGames.reduce((sum, game) => sum + game.stats.downloads, 0).toLocaleString()}
          </p>
          <p className="text-slate-400 text-sm">Total Downloads</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-yellow-400 text-lg font-bold">⭐</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {(trendingGames.reduce((sum, game) => sum + game.stats.rating, 0) / trendingGames.length).toFixed(1)}
          </p>
          <p className="text-slate-400 text-sm">Avg Rating</p>
        </div>
      </div>

      {/* Trending Games Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Hot Right Now</h2>
          <p className="text-slate-400">Sorted by downloads and recent activity</p>
        </div>
        
        {trendingGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingGames.map((game, index) => (
              <div key={game.game_id} className="relative">
                {/* Trending Badge for Top 3 */}
                {index < 3 && (
                  <div className={`absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-slate-400 text-white' :
                    'bg-gradient-to-r from-amber-600 to-amber-500 text-white'
                  }`}>
                    #{index + 1}
                  </div>
                )}
                <GameCard game={game} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="w-24 h-24 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No trending games yet</h3>
            <p className="text-slate-400">Check back later for the hottest games in the community!</p>
          </div>
        )}
      </div>

      {/* Trending Insights */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          Trending Insights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Most Popular Genre</h3>
            <p className="text-cyan-400 text-xl font-bold">
              {/* Calculate most popular category */}
              {Object.entries(
                trendingGames.reduce((acc: any, game) => {
                  acc[game.category] = (acc[game.category] || 0) + 1;
                  return acc;
                }, {})
              ).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'Action'}
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Rising Star</h3>
            <p className="text-purple-400 text-xl font-bold">
              {trendingGames.find(g => g.stats.featured)?.creator_username || trendingGames[0]?.creator_username}
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Top Downloads</h3>
            <p className="text-green-400 text-xl font-bold">
              {Math.max(...trendingGames.map(g => g.stats.downloads)).toLocaleString()}
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Highest Rated</h3>
            <p className="text-yellow-400 text-xl font-bold">
              {Math.max(...trendingGames.map(g => g.stats.rating)).toFixed(1)} ⭐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;