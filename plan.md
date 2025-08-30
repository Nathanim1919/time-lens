# ⏱️ TimeLens – 48-Hour MVP Plan

## 🎯 Project Overview

TimeLens is a **web app where users upload a selfie and instantly see AI-generated versions of themselves in different eras or creative styles**. For the MVP:

* Focus on **instant visual wow**
* Enable **social sharing**
* Include a **basic credit system for monetization**

### Core Value Proposition
- **Instant Transformation**: Upload a selfie and see AI-generated versions in seconds
- **Historical Exploration**: Experience yourself in different time periods (1700s, Medieval, 1920s, etc.)
- **Future Visions**: See yourself as a cyberpunk character, space explorer, or other futuristic personas
- **Creative Styles**: Transform into anime, Pixar, superhero, or professional headshot styles
- **Social Virality**: Built-in sharing for maximum social media engagement
- **Professional Utility**: High-quality outputs for business and creative use cases

## 🛠️ Tech Stack (Keep It Lean)

- **Frontend:** Next.js 13 + Tailwind CSS
- **Backend:** Next.js API routes, appRouter
- **Database & Auth:** Supabase + Better-Auth
- **AI Generation:** Google Gemini / Nano Banana
- **Payments:** Stripe/Polar (test mode only)
- **Analytics:** Vercel Analytics (basic tracking)

## 🏗️ Architecture (MVP Version)

**Frontend:**

- **Upload Page:** File uploader + era/theme dropdown
- **Gallery Page:** Show generated images + social share buttons
- **Profile Page:** Show remaining credits

**Backend/API:**

- **/api/upload** → save original image to Supabase
- **/api/generate** → call AI API, return generated images
- **/api/credits** → deduct credits per generation
- **/api/payments** → handle test Stripe payments

**Data Flow:**
1. **Upload**: User uploads selfie → stored in Supabase Storage
2. **Generation**: AI API called with image + era/theme parameters
3. **Processing**: Generated image stored + watermarked if free tier
4. **Display**: Images shown in user gallery with sharing options

## 🗄️ Database Schema (minimal)

**Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  credits INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Images Table:**
```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  original_url TEXT NOT NULL,
  generated_url TEXT NOT NULL,
  era_theme VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Transactions Table:**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  credits_added INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## ✅ MVP Feature List

- **User Authentication:** email + Google/GitHub login
- **Photo Upload & AI Generation:** pick 3–5 eras/themes only
- **Gallery Display:** show generated images with download/share options
- **Credit System:** free tier (2 transformations), buy extra credits
- **Social Sharing:** LinkedIn + Instagram Story 
- **Watermark:** subtle "Made with TimeLens" on free images

## 🤖 AI Integration Plan

### Google Gemini API Integration
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent`
- **Image Processing**: Convert uploaded images to base64
- **Prompt Engineering**: Craft era-specific prompts for consistent results
- **Rate Limiting**: Implement queue system for high traffic
- **Fallback**: Nano Banana API as backup

### Prompt Templates
```javascript
const eraPrompts = {
  medieval: "Transform this person into a medieval knight or noble, wearing authentic 14th century clothing, realistic medieval style, high quality",
  cyberpunk: "Transform this person into a cyberpunk character with neon lighting, futuristic clothing, digital art style, high quality",
  anime: "Transform this person into an anime character, Japanese animation style, vibrant colors, detailed features, high quality",
  // ... more eras
};
```

### Image Quality Control
- **Resolution**: 1024x1024 minimum for paid users
- **Format**: WebP for web, PNG for downloads
- **Compression**: Optimize for web delivery
- **Watermarking**: Canvas API for free tier

## 💰 Monetization (Simplified)

- Free 2 transformations per new user
- Paid credits: $0.50 per extra transformation
- HD downloads + batch generations = future upgrades

## 📊 Analytics Tracking Plan

### Core Metrics
- **User Acquisition**: Sign-ups, conversion rates
- **Engagement**: Images generated, gallery views
- **Monetization**: Credit purchases, revenue per user
- **Retention**: Daily/weekly active users
- **Viral Coefficient**: Shares, referral traffic

### Event Tracking
```javascript
// Example tracking events
track('image_uploaded', { era: 'medieval', user_tier: 'free' });
track('credits_purchased', { amount: 25, price: 9.00 });
track('image_shared', { platform: 'instagram', era: 'cyberpunk' });
track('user_upgraded', { from_tier: 'free', to_tier: 'premium' });
```

### A/B Testing
- **Pricing**: Test different credit package prices
- **UI Elements**: Button placement, color schemes
- **Onboarding**: Tutorial flow optimization
- **Payment**: Different payment flow designs

## 📅 48-Hour Development Timeline

**Day 1 – Core MVP**

- Setup Next.js + Tailwind
- Supabase auth + DB schema
- Upload page + save image to Supabase
- Call AI API → show result in gallery

**Day 2 – Monetization & Polish**

- Add credit system + test Stripe payments
- Add social sharing buttons + watermark
- UI polish + responsive design
- Quick testing + deploy to Vercel

## 🚀 Quick Deploy (MVP)

### Environment Variables
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI APIs
GOOGLE_GEMINI_API_KEY=your_gemini_key
NANO_BANANA_API_KEY=your_nano_banana_key

# Payments
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
```

### Deploy to Vercel
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## 📝 MVP Notes & Future Ideas

### Keep It Simple
- **3-5 Era Themes Only**: Medieval, Cyberpunk, Anime, 1920s, Space
- **Basic Watermarking**: Canvas API for free tier
- **Simple Credit System**: 2 free, $0.50 per extra
- **Essential Sharing**: LinkedIn + Instagram Story buttons

### Future Enhancements (Post-MVP)
- **More Era Themes**: Expand to 20+ options
- **HD Downloads**: Premium feature upgrade
- **Batch Processing**: Multiple images at once
- **Mobile App**: Native iOS/Android
- **API Access**: Developer integrations
- **White-Label**: Enterprise solutions

### Quick Wins
- **Viral Potential**: "Transform Your Era" social challenge
- **Professional Use**: LinkedIn profile pictures, business headshots
- **Content Creation**: Social media content for influencers

---

*This document serves as the 48-hour MVP roadmap for TimeLens. Focus on core functionality first, then iterate based on user feedback and market validation.*