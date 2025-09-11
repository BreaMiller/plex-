# Gaming Platform Mockup Data Overview

## Created Files and Data Structure

This comprehensive mockup dataset provides realistic, interconnected data for a gaming platform with the following JSON files:

### 1. **User Profiles** (`mockup_users.json`)
- **50 users** with detailed profiles including:
  - User credentials (username, display name, email, avatar)
  - Verification status and creator tiers (standard, pro, elite)
  - Comprehensive stats (games created, downloads, plays, credits, ratings, followers)
  - Achievement unlocks with dates and rarity levels
  - Bio, location, website, and social links
  - Registration and last active timestamps

### 2. **User-Generated Games** (`mockup_user_games.json`) 
- **127 games** across multiple categories:
  - **Categories**: Action, Adventure, Puzzle, Strategy, RPG, Arcade, Platformer, Horror, Racing, Simulation
  - Game metadata (title, description, creator, version, tags)
  - Technical details (file size, platform compatibility, controls)
  - Performance metrics (downloads, plays, favorites, ratings)
  - Media assets (cover images, screenshots, gameplay videos)
  - Monetization data (premium status, credits earned, revenue share)

### 3. **Reviews and Comments** (`mockup_reviews.json`)
- **1,432 reviews** with realistic content and ratings
- **2,847 comments** including threaded discussions
- Review metadata (helpful votes, playtime, verified purchases)
- Developer responses and community interactions
- Platform-specific reviews (Web, Windows, Mac, Mobile)

### 4. **Credit Transactions** (`mockup_credits.json`)
- **Complete financial ecosystem** with 3,456+ transactions
- **Earning categories**: Game downloads, premium sales, milestones, features, reviews, daily bonuses
- **Spending categories**: Asset purchases, promotions, platform fees, game purchases, tips
- User credit balances and transaction histories
- Currency conversion rates (100 credits = $1.00 USD)

### 5. **Leaderboards & Achievements** (`mockup_leaderboards.json`)
- **Multiple leaderboard types**: Downloads, ratings, earnings, followers
- **45 achievements** across 7 categories:
  - Milestones (first game, prolific creator)
  - Popularity (viral hits, download milestones)
  - Quality (perfectionist ratings)
  - Community (social engagement)
  - Skill (speed development, technical excellence)
  - Wealth (credit earning achievements)
  - Exclusive (early adopter, limited-time)
- Achievement rarity system (common, uncommon, rare, epic, legendary)

### 6. **Community Features** (`mockup_community.json`)
- **Social network**: Following relationships (2,349+ connections)
- **Social posts**: Game announcements, development updates, tips, collaborations
- **Forum discussions**: 342 threads across categories (Game Design, Technical, Events)
- **Community challenges**: Active game jams and design competitions with prizes
- **Live events**: Developer Q&As, workshops, showcases
- **Activity feeds** and notification system

## Data Interconnection & Realism

The dataset maintains realistic relationships and proportions:

### **Popularity Correlation**
- **Top creators** (CyberNinja_X, PixelMaster_89) have:
  - More downloads (23K+, 15K+)
  - Higher follower counts (1,247, 892)
  - More credits earned (312K+, 187K+)
  - Premium games and featured content

### **Engagement Patterns**
- **Popular games** receive more:
  - Reviews (Quantum Con: 312 ratings)
  - Comments and developer responses
  - Social media mentions and shares
  - Community discussion threads

### **Economic Balance**
- **Revenue sharing**: 70% to creators, 30% platform fee
- **Credit earning rates**: 50 credits per download, varying premium percentages
- **Spending patterns**: Asset purchases, promotions, platform subscriptions

### **Achievement Distribution**
- **Common achievements**: 47/50 users unlocked "First Steps"
- **Rare achievements**: Only 2/50 users have "Viral Sensation"
- **Legendary achievements**: 1/50 user achieved "Perfectionist"

### **Social Dynamics**
- **Cross-following**: Established creators follow each other
- **Community participation**: Active developers engage in forums and events
- **Mentorship patterns**: Experienced creators share tips and collaborate

## Technical Implementation Notes

### **ID Systems**
- User IDs: `usr_001` to `usr_050`
- Game IDs: `ug_001` to `ug_127` (user-generated)
- Transaction IDs: `tx_001` onwards
- Consistent referencing across all data files

### **Timestamp Consistency**
- All timestamps use ISO 8601 format
- Realistic progression from registration to recent activity
- Event sequencing maintains logical order (games created before reviews)

### **Media Asset URLs**
- Structured CDN-style URLs for:
  - User avatars
  - Game cover images and screenshots
  - Gameplay videos
  - Social media content

### **Platform Compatibility**
- Games support realistic platform combinations
- Mobile-optimized games have appropriate file sizes
- Web games prioritize accessibility

## Usage Scenarios

This dataset supports development and testing of:

1. **User Management Systems**: Registration, profiles, tiers, achievements
2. **Game Discovery**: Search, filtering, recommendations, categories
3. **Social Features**: Following, posts, comments, notifications
4. **Economic Systems**: Credits, transactions, monetization, rewards
5. **Community Engagement**: Forums, challenges, events, leaderboards
6. **Analytics Dashboards**: Performance metrics, user behavior, trends
7. **Recommendation Engines**: Similar games, creators, community content

## Data Quality Features

- **Realistic Names**: Diverse user profiles with authentic display names
- **Varied Content**: Games span multiple genres with appropriate descriptions
- **Natural Language**: Reviews and comments use realistic gaming community language
- **Balanced Metrics**: Download-to-rating ratios match real platform patterns
- **Temporal Logic**: Creation dates, updates, and activity follow realistic timelines

---

**Total Dataset Size**: ~1.2MB across 6 JSON files
**Total Records**: 15,000+ individual data points across all categories
**Update Frequency**: Designed for real-time platform simulation with hourly leaderboard updates
