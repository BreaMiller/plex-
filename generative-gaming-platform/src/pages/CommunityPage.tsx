import React from 'react';
import { Users, MessageCircle, Calendar, Trophy, Star, Heart, Clock } from 'lucide-react';
import { useGameData } from '../contexts/GameDataContext';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ui/ProgressBar';
import FadeInSection from '../components/ui/FadeInSection';

const CommunityPage: React.FC = () => {
  const { community, users } = useGameData();
  
  if (!community) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <div className="text-center">
          <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Loading Community...</h2>
          <p className="text-slate-400">Please wait while we load community data</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to calculate days remaining
  const getDaysRemaining = (endDateString: string) => {
    const endDate = new Date(endDateString);
    const now = new Date('2025-08-26T01:21:03Z'); // Current time reference
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Helper function to get registration progress variant
  const getRegistrationVariant = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 91) return 'danger';
    if (percentage >= 71) return 'warning';
    return 'success';
  };

  const getUser = (userId: string) => {
    return users.find(u => u.user_id === userId);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <FadeInSection>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Community Hub
          </h1>
          <p className="text-slate-400 text-lg">
            Connect with creators, join challenges, and be part of the gaming community
          </p>
        </div>
      </FadeInSection>

      {/* Community Stats */}
      <FadeInSection delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{community.metadata.total_follows.toLocaleString()}</p>
            <p className="text-slate-400 text-sm">Total Connections</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
            <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{community.metadata.total_forum_threads}</p>
            <p className="text-slate-400 text-sm">Forum Threads</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{community.metadata.active_challenges}</p>
            <p className="text-slate-400 text-sm">Active Challenges</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{community.metadata.community_events}</p>
            <p className="text-slate-400 text-sm">Upcoming Events</p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection delay={400}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Social Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              Community Feed
            </h2>
          
          <div className="space-y-6">
            {community.social_posts.map((post: any) => {
              const author = getUser(post.user_id);
              return (
                <div key={post.post_id} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={author?.avatar_url || '/api/placeholder/40/40'} 
                      alt={author?.display_name || post.username}
                      className="w-10 h-10 rounded-full border border-white/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link 
                          to={`/creators/${post.user_id}`}
                          className="text-white font-semibold hover:text-cyan-400 transition-colors"
                        >
                          {author?.display_name || post.username}
                        </Link>
                        <span className="text-slate-400 text-sm">@{post.username}</span>
                        {author?.verified && (
                          <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{formatDate(post.created_date)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.type === 'game_announcement' ? 'bg-green-500/20 text-green-300' :
                      post.type === 'development_update' ? 'bg-blue-500/20 text-blue-300' :
                      post.type === 'tip_sharing' ? 'bg-yellow-500/20 text-yellow-300' :
                      post.type === 'collaboration_request' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-slate-500/20 text-slate-300'
                    }`}>
                      {post.type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {/* Post Content */}
                  <p className="text-slate-300 mb-4">{post.content}</p>
                  
                  {/* Post Media */}
                  {post.media_urls && post.media_urls.length > 0 && (
                    <div className="mb-4">
                      <img 
                        src={post.media_urls[0]} 
                        alt="Post media"
                        className="w-full max-w-md rounded-lg border border-white/20"
                      />
                    </div>
                  )}
                  
                  {/* Post Stats */}
                  <div className="flex items-center gap-6 text-slate-400 text-sm">
                    <div className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1 hover:text-green-400 transition-colors cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </div>
                    <div className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
                      <Star className="w-4 h-4" />
                      {post.reposts}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Active Challenges */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Active Challenges
              </h2>
            
            <div className="space-y-4">
              {community.community_challenges.filter((c: any) => c.status === 'active').map((challenge: any) => {
                const daysRemaining = getDaysRemaining(challenge.end_date);
                const totalDaysInChallenge = 7; // Assuming 7 days for challenges
                const timeProgress = Math.max(0, Math.min(100, ((totalDaysInChallenge - daysRemaining) / totalDaysInChallenge) * 100));
                
                return (
                  <div key={challenge.challenge_id} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-lg border border-white/10 p-4 hover:border-white/20 transition-all duration-200">
                    <h3 className="text-white font-semibold mb-2">{challenge.title}</h3>
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{challenge.description}</p>
                    
                    {/* Time Remaining Progress */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300 font-medium">Time Progress</span>
                      </div>
                      <ProgressBar 
                        value={timeProgress}
                        max={100}
                        variant={daysRemaining <= 1 ? 'danger' : daysRemaining <= 3 ? 'warning' : 'default'}
                        size="sm"
                        animated={true}
                        className="mb-1"
                      />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">
                          {daysRemaining > 0 ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining` : 'Ending soon'}
                        </span>
                        <span className="text-slate-500">
                          Ends {formatDate(challenge.end_date)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Participants:</span>
                        <span className="text-cyan-400">{challenge.participants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Submissions:</span>
                        <span className="text-green-400">{challenge.submissions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prize Pool:</span>
                        <span className="text-yellow-400">{challenge.prizes.first_place.toLocaleString()} credits</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Upcoming Events
            </h2>
            
            <div className="space-y-4">
              {community.community_events.slice(0, 3).map((event: any) => {
                const host = getUser(event.host_id);
                const registrationProgress = (event.registered_attendees / event.max_capacity) * 100;
                const registrationVariant = getRegistrationVariant(event.registered_attendees, event.max_capacity);
                
                return (
                  <div key={event.event_id} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-lg border border-white/10 p-4 hover:border-white/20 transition-all duration-200">
                    <h3 className="text-white font-semibold mb-1">{event.title}</h3>
                    <p className="text-slate-400 text-sm mb-2">by {host?.display_name || event.host_username}</p>
                    
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">{event.description}</p>
                    
                    {/* Registration Progress */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-slate-300 font-medium">Registration</span>
                      </div>
                      <ProgressBar 
                        value={event.registered_attendees}
                        max={event.max_capacity}
                        variant={registrationVariant}
                        size="sm"
                        animated={true}
                        className={`mb-1 ${registrationProgress >= 89 ? 'animate-pulse' : ''}`}
                      />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">
                          {event.registered_attendees}/{event.max_capacity} registered ({Math.round(registrationProgress)}%)
                        </span>
                        <span className={`font-medium ${
                          registrationProgress >= 91 ? 'text-red-300' :
                          registrationProgress >= 71 ? 'text-orange-300' :
                          'text-green-300'
                        }`}>
                          {registrationProgress >= 91 ? 'Almost Full!' :
                           registrationProgress >= 71 ? 'Filling Up' :
                           'Available'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="text-cyan-400 capitalize">{event.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="text-green-400">{event.duration_minutes} min</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-xs text-slate-400">
                        {formatDate(event.scheduled_date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Forum Activity */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              Recent Discussions
            </h2>
            
            <div className="space-y-4">
              {community.forum_threads.slice(0, 5).map((thread: any) => {
                const author = getUser(thread.author_id);
                return (
                  <div key={thread.thread_id} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-lg border border-white/10 p-4">
                    {thread.is_pinned && (
                      <div className="mb-2">
                        <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded text-xs font-medium">
                          Pinned
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-white font-medium mb-2 line-clamp-2">{thread.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={author?.avatar_url || '/api/placeholder/20/20'} 
                        alt={author?.display_name || thread.author_username}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-slate-400 text-sm">{author?.display_name || thread.author_username}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-3">
                        <span>{thread.replies} replies</span>
                        <span>{thread.views} views</span>
                      </div>
                      <span>{formatDate(thread.last_activity)}</span>
                    </div>
                    
                    <span className="inline-block mt-2 bg-slate-700/50 text-slate-300 px-2 py-1 rounded text-xs">
                      {thread.category}
                    </span>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default CommunityPage;