import { EraTheme, GenerationRequest, GenerationResponse } from '../types';

// AI API configuration
const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY;

// Era-specific prompt templates
const ERA_PROMPTS: Record<EraTheme, string> = {
  medieval: "Transform this person into a medieval knight or noble, wearing authentic 14th century clothing, realistic medieval style, high quality, detailed facial features preserved",
  cyberpunk: "Transform this person into a cyberpunk character with neon lighting, futuristic clothing, digital art style, high quality, detailed facial features preserved",
  anime: "Transform this person into an anime character, Japanese animation style, vibrant colors, detailed features, high quality, facial features preserved",
  '1920s': "Transform this person into a 1920s character, flapper or gentleman style, vintage clothing, high quality, detailed facial features preserved",
  space: "Transform this person into a space explorer, astronaut or alien, futuristic space suit, high quality, detailed facial features preserved",
  renaissance: "Transform this person into a renaissance noble or artist, period-appropriate clothing, classical art style, high quality, detailed facial features preserved",
  futuristic: "Transform this person into a futuristic character, advanced technology, sleek design, high quality, detailed facial features preserved",
  vintage: "Transform this person into a vintage character, retro style, classic clothing, high quality, detailed facial features preserved"
};

// Google Gemini API integration
async function generateWithGemini(imageUrl: string, eraTheme: EraTheme): Promise<GenerationResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    // Convert image to base64
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    const prompt = ERA_PROMPTS[eraTheme];
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: base64Image
              }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract generated image URL from response
    // Note: This is a simplified example - actual implementation may vary
    const generatedImageUrl = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return {
      generated_image_url: generatedImageUrl,
      prompt_used: prompt,
      processing_time: Date.now()
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate image with Gemini');
  }
}

// Nano Banana API integration (fallback)
async function generateWithNanoBanana(imageUrl: string, eraTheme: EraTheme): Promise<GenerationResponse> {
  if (!NANO_BANANA_API_KEY) {
    throw new Error('Nano Banana API key not configured');
  }

  try {
    const prompt = ERA_PROMPTS[eraTheme];
    
    const response = await fetch('https://api.nanobanana.ai/v1/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NANO_BANANA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        image_url: imageUrl,
        style: eraTheme,
        quality: 'high'
      })
    });

    if (!response.ok) {
      throw new Error(`Nano Banana API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      generated_image_url: data.image_url,
      prompt_used: prompt,
      processing_time: Date.now()
    };
  } catch (error) {
    console.error('Nano Banana API error:', error);
    throw new Error('Failed to generate image with Nano Banana');
  }
}

// Main generation function with fallback
export async function generateImage(request: GenerationRequest): Promise<GenerationResponse> {
  const startTime = Date.now();
  
  try {
    // Try Gemini first
    return await generateWithGemini(request.image_url, request.era_theme);
  } catch (error) {
    console.log('Gemini failed, trying Nano Banana...');
    
    try {
      // Fallback to Nano Banana
      return await generateWithNanoBanana(request.image_url, request.era_theme);
    } catch (fallbackError) {
      console.error('Both AI APIs failed:', error, fallbackError);
      throw new Error('Image generation failed. Please try again later.');
    }
  }
}

// Batch generation for multiple themes
export async function generateBatchImages(
  imageUrl: string, 
  themes: EraTheme[], 
  userId: string
): Promise<GenerationResponse[]> {
  const results: GenerationResponse[] = [];
  
  for (const theme of themes) {
    try {
      const result = await generateImage({
        image_url: imageUrl,
        era_theme: theme,
        user_id: userId
      });
      results.push(result);
    } catch (error) {
      console.error(`Failed to generate ${theme} image:`, error);
      // Continue with other themes
    }
  }
  
  return results;
}

// Get available themes
export function getAvailableThemes(): EraTheme[] {
  return Object.keys(ERA_PROMPTS) as EraTheme[];
}

// Get theme display names
export function getThemeDisplayName(theme: EraTheme): string {
  const displayNames: Record<EraTheme, string> = {
    medieval: 'Medieval',
    cyberpunk: 'Cyberpunk',
    anime: 'Anime',
    '1920s': '1920s',
    space: 'Space',
    renaissance: 'Renaissance',
    futuristic: 'Futuristic',
    vintage: 'Vintage'
  };
  
  return displayNames[theme];
}

// Get theme icons
export function getThemeIcon(theme: EraTheme): string {
  const themeIcons: Record<EraTheme, string> = {
    medieval: '⚔️',
    cyberpunk: '🤖',
    anime: '🌸',
    '1920s': '🎩',
    space: '🚀',
    renaissance: '🎨',
    futuristic: '🔮',
    vintage: '📷',
  };
  
  return themeIcons[theme] || '✨';
}
