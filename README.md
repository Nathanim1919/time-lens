# TimeLens – AI-Powered Era & Future Self Generator

Transform your selfie into AI-generated versions across different historical eras, future scenarios, and creative styles. Experience history and imagination like never before.

## 🚀 Features

- **AI Image Generation**: Transform selfies using Google Gemini and Nano Banana APIs
- **Multiple Era Themes**: Medieval, Cyberpunk, Anime, 1920s, Space, Renaissance, Futuristic, Vintage
- **User Authentication**: Secure login with email, Google, and GitHub
- **Credit System**: Free tier with 2 transformations, paid credits for more
- **Social Sharing**: Share transformations on LinkedIn, Instagram, and Twitter
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Live credit updates and image generation status

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **AI**: Google Gemini API, Nano Banana API
- **Payments**: Stripe/Polar integration
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── upload/        # Image upload endpoint
│   │   ├── generate/      # AI generation endpoint
│   │   ├── credits/       # Credit management
│   │   └── images/        # Image retrieval
│   ├── upload/            # Upload page
│   ├── gallery/           # Gallery page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/             # Reusable components
│   ├── ui/                # Basic UI components
│   │   ├── Button.tsx     # Button component
│   │   ├── Input.tsx      # Input component
│   │   └── Modal.tsx      # Modal component
│   └── layout/            # Layout components
│       └── Navigation.tsx # Navigation bar
├── lib/                    # Utility libraries
│   ├── ai.ts              # AI service integration
│   ├── auth.ts            # Authentication service
│   ├── payments.ts        # Payment processing
│   ├── supabase.ts        # Database and storage
│   └── utils.ts           # Utility functions
└── types/                  # TypeScript definitions
    └── index.ts           # Type definitions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini API key (optional)
- Nano Banana API key (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/timelens.git
cd timelens
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI APIs
GOOGLE_GEMINI_API_KEY=your_gemini_key
NANO_BANANA_API_KEY=your_nano_banana_key

# Payments (optional for MVP)
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
POLAR_SECRET_KEY=your_polar_secret
```

### 4. Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  credits INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Images table
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  original_url TEXT NOT NULL,
  generated_url TEXT NOT NULL,
  era_theme VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  credits_added INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own images" ON images
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own images" ON images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5. Storage Setup

In your Supabase dashboard:
1. Go to Storage
2. Create a new bucket called `images`
3. Set it to public
4. Add storage policies for authenticated users

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Enable authentication providers (Email, Google, GitHub) in Authentication > Providers
4. Configure OAuth redirect URLs for Google and GitHub

### AI API Setup

#### Google Gemini
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to your environment variables

#### Nano Banana (Alternative)
1. Sign up at [nanobanana.ai](https://nanobanana.ai)
2. Get your API key
3. Add it to your environment variables

### Payment Setup (Optional for MVP)

#### Stripe
1. Create a Stripe account
2. Get your API keys from the dashboard
3. Add webhook endpoints for payment confirmation

#### Polar
1. Sign up at [polar.sh](https://polar.sh)
2. Get your API keys
3. Configure webhooks

## 📱 Usage

### For Users

1. **Sign Up/Login**: Create an account or sign in with Google/GitHub
2. **Upload Photo**: Drag and drop or browse for a selfie
3. **Choose Era**: Select from available themes (Medieval, Cyberpunk, Anime, etc.)
4. **Generate**: AI creates your transformation in seconds
5. **Download & Share**: Save your image and share on social media

### For Developers

The codebase is structured for easy extension:

- Add new era themes in `src/lib/ai.ts`
- Create new API endpoints in `src/app/api/`
- Add new UI components in `src/components/`
- Extend types in `src/types/index.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and code comments
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🔮 Roadmap

### Phase 1: MVP ✅
- [x] User authentication
- [x] Photo upload and AI generation
- [x] Basic gallery and sharing
- [x] Credit system

### Phase 2: Premium Features
- [ ] HD downloads
- [ ] Batch processing
- [ ] Advanced customization
- [ ] Priority queue

### Phase 3: Viral Features
- [ ] Enhanced social sharing
- [ ] Community features
- [ ] Viral challenges

### Phase 4: Enterprise
- [ ] API access
- [ ] White-label solutions
- [ ] Advanced analytics

---

Built with ❤️ by the TimeLens Team
