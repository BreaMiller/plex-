import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Zap, Gamepad2, Users, Trophy, Settings, CreditCard, Clock, CheckCircle } from 'lucide-react';
import FadeInSection from '../components/ui/FadeInSection';

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default
  
  const faqCategories = [
    {
      icon: Zap,
      title: 'Getting Started',
      color: 'from-cyan-500 to-blue-600',
      items: [
        {
          question: 'What is Spazz?',
          answer: 'Spazz is an AI-powered gaming platform that allows users to create games from simple text prompts. Using advanced Unity C# generation and expert game development patterns, you can transform your ideas into playable games within minutes.'
        },
        {
          question: 'How do I create my first game?',
          answer: 'Simply navigate to the AI Game Generator, describe your game idea in the text prompt, and click "Generate Game". Our AI will create a complete Unity C# game with proper architecture, controls, and gameplay mechanics. You can then download the code and play the generated game.'
        },
        {
          question: 'Do I need programming experience?',
          answer: 'No programming experience is required! Our AI handles all the technical implementation. However, having basic game design concepts will help you create better prompts and understand the generated games better.'
        }
      ]
    },
    {
      icon: CreditCard,
      title: 'Credits & Economy',
      color: 'from-purple-500 to-pink-600',
      items: [
        {
          question: 'How does the credit system work?',
          answer: 'Credits are the platform currency. You spend credits to play games (5 credits), download games (10 credits), favorite games (3 credits), and generate new games (100 credits). You earn credits through game downloads, achievements, and community participation.'
        },
        {
          question: 'How do I earn credits?',
          answer: 'You earn credits when other users download your games (50 credits per download), achieve milestones, participate in challenges, and through daily bonuses. Premium games earn higher credit percentages based on revenue sharing.'
        },
        {
          question: 'What can I do with credits?',
          answer: 'Use credits to play and download games, favorite content, generate new games with AI, promote your games, purchase assets, and participate in premium challenges with bigger rewards.'
        }
      ]
    },
    {
      icon: Gamepad2,
      title: 'Game Creation',
      color: 'from-green-500 to-emerald-600',
      items: [
        {
          question: 'What types of games can I create?',
          answer: 'Our AI can generate various game types including: Action games (platformers, runners, shooters), Puzzle games (logic, physics-based), Strategy games (RTS, turn-based), RPG elements, Arcade-style games, and more. The complexity depends on your prompt detail.'
        },
        {
          question: 'How detailed should my game prompt be?',
          answer: 'More detailed prompts generally produce better results. Include: game genre, core mechanics, visual style, player goals, controls, and any special features. Example: "Create a 2D platformer where the player controls a robot that can transform into different vehicles to overcome obstacles."'
        },
        {
          question: 'Can I modify the generated code?',
          answer: 'Yes! All generated code follows Unity best practices and is fully editable. You can download the C# scripts, modify them in Unity, add assets, and expand on the generated foundation.'
        }
      ]
    },
    {
      icon: Users,
      title: 'Community & Social',
      color: 'from-orange-500 to-red-600',
      items: [
        {
          question: 'How do I share my games?',
          answer: 'Once you generate a game, it\'s automatically available in the platform. Other users can discover it through search, categories, or trending sections. You can also share direct links and promote your games using credits.'
        },
        {
          question: 'What are community challenges?',
          answer: 'Community challenges are time-limited events where creators compete to build games around specific themes or constraints. Winners receive credit prizes and featured placement. Examples include "One Button Wonder" or "Retro Revival" challenges.'
        },
        {
          question: 'How do I follow other creators?',
          answer: 'Visit any creator\'s profile and click the follow button. You\'ll receive notifications when they post new games, updates, or participate in community discussions. Build your network to discover amazing content!'
        }
      ]
    },
    {
      icon: Trophy,
      title: 'Achievements & Rankings',
      color: 'from-yellow-500 to-amber-600',
      items: [
        {
          question: 'How do achievements work?',
          answer: 'Achievements unlock automatically when you meet specific criteria. They range from common (First Steps - publish your first game) to legendary (Perfectionist - maintain 4.5+ rating across all games). Each achievement rewards credits.'
        },
        {
          question: 'What are creator tiers?',
          answer: 'Creator tiers (Standard, Pro, Elite) are earned based on your performance metrics: downloads, ratings, followers, and credits earned. Higher tiers get verification badges, better revenue sharing, and exclusive features.'
        },
        {
          question: 'How are leaderboards calculated?',
          answer: 'Leaderboards track different metrics: Most Downloaded Creators, Highest Rated Games, Top Credit Earners, and Most Followed Creators. Rankings update hourly and showcase the most successful community members.'
        }
      ]
    },
    {
      icon: Settings,
      title: 'Technical Support',
      color: 'from-blue-500 to-indigo-600',
      items: [
        {
          question: 'What platforms are supported?',
          answer: 'Generated games support multiple platforms: Web (playable in browser), Windows, Mac, and Mobile. The AI optimizes code for cross-platform compatibility and includes appropriate control schemes.'
        },
        {
          question: 'My game generation failed. What do I do?',
          answer: 'If generation fails, try: 1) Simplifying your prompt, 2) Being more specific about desired mechanics, 3) Avoiding overly complex requests, 4) Checking your credit balance. If issues persist, contact support for assistance.'
        },
        {
          question: 'Can I export games to other platforms?',
          answer: 'Yes! Generated Unity C# code can be imported into Unity Editor and built for any Unity-supported platform including consoles, VR, and mobile app stores. You own the generated code and can distribute it freely.'
        }
      ]
    }
  ];
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const allItems = faqCategories.flatMap((category, categoryIndex) => 
    category.items.map((item, itemIndex) => ({
      ...item,
      category: category.title,
      categoryIndex,
      globalIndex: categoryIndex * 100 + itemIndex,
      icon: category.icon,
      color: category.color
    }))
  );
  
  const filteredItems = searchQuery 
    ? allItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Find answers to common questions about Spazz, game creation, credits, and community features
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQ..."
            className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">
            {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for "{searchQuery}"
          </h2>
          <div className="space-y-4">
            {filteredItems.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.globalIndex} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                      <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FAQ Categories */}
      {!searchQuery && (
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-6`}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-8 h-8 text-white" />
                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  </div>
                </div>
                
                {/* FAQ Items */}
                <div className="p-6 space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 100 + itemIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div key={itemIndex} className="border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-6 py-4 bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-between text-left"
                        >
                          <span className="text-white font-medium pr-4">{item.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 py-4 border-t border-white/10">
                            <p className="text-slate-300 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Roadmap Section */}
      {!searchQuery && (
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                Platform Roadmap
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Our journey to revolutionize game creation through AI. Track our progress as we build the future of interactive entertainment.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* In Progress */}
              <div className="flex-1 space-y-4">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-orange-400/30 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-orange-400" />
                    <h3 className="text-lg font-semibold text-white">In Progress</h3>
                  </div>
                  <p className="text-slate-400 text-sm">3 items</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Advanced AI Game Physics</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Implementing realistic physics simulation and collision detection systems powered by machine learning algorithms.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Real-time Multiplayer Support</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Building infrastructure for seamless multiplayer gaming experiences with low latency networking.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Enhanced 3D Asset Library</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Expanding our collection of high-quality 3D models, textures, and environments for game creation.</p>
                  </div>
                </div>
              </div>

              {/* Up Next */}
              <div className="flex-1 space-y-4">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-cyan-400/30 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Up Next</h3>
                  </div>
                  <p className="text-slate-400 text-sm">4 items</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Voice-Driven Game Design</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Natural language processing to allow creators to design games using voice commands and descriptions.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Cross-Platform Publishing</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">One-click deployment to mobile, web, and desktop platforms with optimized builds for each target.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">AI-Powered Music Generation</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Dynamic soundtrack creation that adapts to gameplay moments and player emotions in real-time.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">VR/AR Game Support</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Native support for creating immersive virtual and augmented reality gaming experiences.</p>
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="flex-1 space-y-4">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-green-400/30 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Completed</h3>
                  </div>
                  <p className="text-slate-400 text-sm">5 items</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Core AI Game Generator</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Revolutionary AI system that creates fully playable games from simple text prompts and concepts.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Community Marketplace</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Platform for creators to share, discover, and collaborate on game assets and completed projects.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Credit-Based Economy</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Flexible pricing system that rewards creators and enables fair access to platform features.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Advanced Analytics Dashboard</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Comprehensive insights into game performance, player engagement, and creator monetization metrics.</p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:scale-[1.02] transition-all duration-300 hover:border-white/20">
                    <h4 className="text-white font-medium mb-2">Smart Asset Optimization</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">Automatic compression and optimization of game assets for faster loading and better performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Pharoh Character Image */}
          <FadeInSection delay={400}>
            <div className="text-center mt-12 mb-8">
              <div className="relative inline-block">
                <img 
                  src="/imgs/pharoh_character.png" 
                  alt="Pharoh Character - AI Generated Gaming Asset" 
                  className="w-64 h-64 object-contain rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl"></div>
              </div>
              <p className="text-slate-400 mt-4 text-sm max-w-md mx-auto">
                Featured AI-generated character asset showcasing the creative possibilities of our platform
              </p>
            </div>
          </FadeInSection>
        </div>
      )}

      {/* Contact Support */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
          <p className="text-slate-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
              Contact Support
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Join Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;