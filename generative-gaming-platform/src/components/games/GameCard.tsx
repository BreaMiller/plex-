import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, Play, Heart, Users, Calendar } from 'lucide-react';
import { useCredits, CREDIT_COSTS } from '../../contexts/CreditContext';
import { useAuth } from '../../contexts/AuthContext';
import GameImage from '../ui/GameImage';

interface Game {
  game_id: string;
  title: string;
  creator_id: string;
  creator_username: string;
  category: string;
  description: string;
  created_date: string;
  tags: string[];
  cover_image: string;
  stats: {
    downloads: number;
    plays: number;
    favorites: number;
    rating: number;
    total_ratings: number;
    featured: boolean;
  };
  technical_info: {
    file_size: string;
    platform_compatibility: string[];
    estimated_playtime: string;
  };
  monetization: {
    is_premium: boolean;
    premium_price?: number;
  };
}

interface GameCardProps {
  game: Game;
  compact?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, compact = false }) => {
  const { user } = useAuth();
  const { balance, spendCredits } = useCredits();
  const [isLiked, setIsLiked] = useState(false);
  const [localStats, setLocalStats] = useState(game.stats);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePlay = () => {
    if (!user) return;
    
    if (spendCredits(CREDIT_COSTS.PLAY_GAME, 'PLAY_GAME', `Played ${game.title}`, game.game_id)) {
      setLocalStats(prev => ({ ...prev, plays: prev.plays + 1 }));
      // In a real app, this would launch the game
      window.open(`/play/${game.game_id}`, '_blank');
    }
  };

  const handleDownload = () => {
    if (!user) return;
    
    if (spendCredits(CREDIT_COSTS.DOWNLOAD_GAME, 'DOWNLOAD_GAME', `Downloaded ${game.title}`, game.game_id)) {
      setLocalStats(prev => ({ ...prev, downloads: prev.downloads + 1 }));
      // Simulate download
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,Game: ${game.title}`;
      link.download = `${game.title.replace(/\s+/g, '_')}.game`;
      link.click();
    }
  };

  const handleFavorite = () => {
    if (!user) return;
    
    if (!isLiked && spendCredits(CREDIT_COSTS.FAVORITE_GAME, 'FAVORITE_GAME', `Favorited ${game.title}`, game.game_id)) {
      setIsLiked(true);
      setLocalStats(prev => ({ ...prev, favorites: prev.favorites + 1 }));
    } else if (isLiked) {
      setIsLiked(false);
      setLocalStats(prev => ({ ...prev, favorites: Math.max(0, prev.favorites - 1) }));
    }
  };

  const cardClasses = compact 
    ? "bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300 hover:scale-105 h-[440px] flex flex-col"
    : "bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300 hover:scale-[1.02] h-[560px] flex flex-col";

  return (
    <div className={cardClasses}>
      {/* Game Cover */}
      <div className="relative aspect-video overflow-hidden">
        <GameImage 
          src={game.cover_image}
          alt={game.title}
          title={game.title}
          category={game.category}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {localStats.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        
        {/* Premium Badge */}
        {game.monetization.is_premium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
            Premium
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handlePlay}
            disabled={!user || balance < CREDIT_COSTS.PLAY_GAME}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transform scale-90 hover:scale-100 transition-transform duration-200"
          >
            <Play className="w-4 h-4 fill-current" />
            Play (10 credits)
          </button>
        </div>
      </div>
      
      {/* Game Info */}
      <div className={compact ? "p-4 flex-1 flex flex-col" : "p-5 flex-1 flex flex-col"}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <Link 
              to={`/games/${game.game_id}`}
              className="text-white font-semibold hover:text-cyan-400 transition-colors line-clamp-1"
            >
              {game.title}
            </Link>
            <Link 
              to={`/creators/${game.creator_id}`}
              className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
            >
              by {game.creator_username}
            </Link>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{localStats.rating.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Description */}
        {!compact && (
          <p className="text-slate-300 text-sm mb-3 line-clamp-2">
            {game.description}
          </p>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {game.tags.slice(0, compact ? 2 : 3).map(tag => (
            <span key={tag} className="bg-gradient-to-r from-slate-700/40 to-slate-600/40 backdrop-blur-xl border border-white/10 text-slate-200 px-2 py-1 rounded text-xs font-medium shadow-lg">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {localStats.downloads.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Play className="w-3 h-3" />
              {localStats.plays.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {localStats.favorites.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(game.created_date)}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-auto">
          <button 
            onClick={handleDownload}
            disabled={!user || balance < CREDIT_COSTS.DOWNLOAD_GAME}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download (100 credits)
          </button>
          
          <button 
            onClick={handleFavorite}
            disabled={!user}
            className={`px-3 py-2 rounded-lg transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500 hover:bg-red-400 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;