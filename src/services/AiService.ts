import { GoogleGenAI } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY

if (!API_KEY) {
  throw new Error("GOOGLE_GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Professional-grade prompt templates for different eras and styles
const ERA_PROMPTS: Record<string, string> = {
  medieval: `Transform this person into a medieval knight or noble from the 14th-15th century. 
  Style: Realistic medieval portraiture with authentic period clothing including chainmail, leather armor, or rich velvet garments with intricate embroidery. 
  Lighting: Dramatic candlelit or torch-lit atmosphere with warm golden tones. 
  Background: Stone castle walls, medieval architecture, or a royal court setting. 
  Details: Preserve facial features while adding period-appropriate hairstyles, facial hair, and accessories like crowns, helmets, or jewelry. 
  Quality: High-resolution, photorealistic, cinematic composition, professional photography style.`,

  cyberpunk: `Transform this person into a cyberpunk character from a futuristic dystopian world. 
  Style: Neon-lit cyberpunk aesthetic with high-tech elements and urban decay. 
  Lighting: Electric blue, purple, and pink neon lighting with dramatic shadows and glowing elements. 
  Background: Rainy neon-lit cityscape, high-tech laboratory, or cyberpunk street scene. 
  Details: Add cybernetic implants, glowing circuits, holographic displays, futuristic clothing with LED strips, and high-tech accessories. 
  Quality: High-resolution, cinematic lighting, professional photography, Blade Runner aesthetic.`,

  anime: `Transform this person into an anime character with Japanese animation style. 
  Style: Classic anime art style with clean lines, vibrant colors, and expressive features. 
  Lighting: Soft, even lighting with gentle shadows and bright highlights. 
  Background: Simple anime-style backgrounds or abstract colorful patterns. 
  Details: Exaggerated anime eyes, stylized hair with vibrant colors, smooth skin texture, and anime-typical proportions. 
  Quality: High-quality anime art, clean vector-style lines, vibrant colors, professional illustration.`,

  renaissance: `Transform this person into a Renaissance noble or artist from 15th-16th century Italy. 
  Style: Classical Renaissance portraiture with rich, detailed clothing and artistic composition. 
  Lighting: Soft, natural lighting with gentle shadows, similar to classical oil paintings. 
  Background: Renaissance architecture, classical columns, or elegant interior settings. 
  Details: Period-appropriate clothing with rich fabrics, jewelry, and accessories. Preserve facial features while adding Renaissance hairstyles and fashion. 
  Quality: High-resolution, classical art style, professional portraiture, museum-quality.`,

  vintage: `Transform this person into a vintage character from the 1920s-1950s era. 
  Style: Classic vintage photography with sepia or black-and-white tones, or vibrant 1950s color palette. 
  Lighting: Soft, flattering lighting typical of vintage photography studios. 
  Background: Art Deco interiors, vintage cars, or classic Americana settings. 
  Details: Period-appropriate clothing, hairstyles, and accessories. Add vintage film grain and authentic period styling. 
  Quality: High-resolution, authentic vintage aesthetic, professional photography style.`,

  futuristic: `Transform this person into a futuristic character from a high-tech utopian society. 
  Style: Clean, minimalist futuristic design with advanced technology and sleek aesthetics. 
  Lighting: Bright, clean lighting with subtle blue or white glows and smooth gradients. 
  Background: Futuristic cityscape, space station, or advanced laboratory setting. 
  Details: Add subtle tech enhancements, futuristic clothing with clean lines, and advanced accessories. 
  Quality: High-resolution, clean design, professional photography, sci-fi aesthetic.`,

  space: `Transform this person into a space explorer or astronaut in a futuristic space setting. 
  Style: Sci-fi space aesthetic with advanced space technology and cosmic elements. 
  Lighting: Dramatic space lighting with stars, nebulas, and artificial spacecraft lighting. 
  Background: Space station, alien planet, or deep space with stars and cosmic phenomena. 
  Details: Add space suit elements, futuristic helmets, and space exploration equipment. 
  Quality: High-resolution, cinematic space photography, professional sci-fi aesthetic.`,

  steampunk: `Transform this person into a steampunk character from a Victorian-era alternate history. 
  Style: Steampunk aesthetic with brass, copper, and leather elements combined with steam-powered technology. 
  Lighting: Warm, golden lighting with dramatic shadows and steam effects. 
  Background: Victorian-era workshop, airship, or steampunk cityscape. 
  Details: Add brass goggles, mechanical limbs, steam-powered gadgets, and Victorian clothing with technological modifications. 
  Quality: High-resolution, detailed steampunk art, professional photography style.`
};

// Fallback prompts for when the main prompts fail
const FALLBACK_PROMPTS: Record<string, string> = {
  medieval: `Create a realistic photograph of this person dressed as a medieval knight or noble from the 14th century, wearing authentic period clothing and standing in a medieval castle setting. High quality, photorealistic style.`,
  cyberpunk: `Create a realistic photograph of this person as a cyberpunk character in a futuristic neon-lit city, wearing high-tech clothing with glowing elements. High quality, cinematic style.`,
  anime: `Create an anime-style illustration of this person with classic Japanese animation features, vibrant colors, and expressive anime eyes. High quality, clean art style.`,
  renaissance: `Create a realistic photograph of this person dressed as a Renaissance noble in classical period clothing, standing in elegant Renaissance architecture. High quality, classical style.`,
  vintage: `Create a realistic vintage photograph of this person from the 1920s-1950s era, wearing period-appropriate clothing and styled with authentic vintage aesthetics. High quality, classic style.`,
  futuristic: `Create a realistic photograph of this person in futuristic clothing and setting, with clean modern design and advanced technology elements. High quality, sci-fi style.`,
  space: `Create a realistic photograph of this person as a space explorer in a futuristic space setting, wearing advanced space technology and equipment. High quality, sci-fi style.`,
  steampunk: `Create a realistic photograph of this person in steampunk attire with brass, copper, and leather elements, standing in a Victorian-era workshop. High quality, steampunk style.`
};

// --- Helper Functions ---

/**
 * Gets the appropriate prompt for a given era theme
 * @param eraTheme The era theme (e.g., "medieval", "cyberpunk")
 * @returns The professional prompt for that era
 */
export function getEraPrompt(eraTheme: string): string {
  const normalizedEra = eraTheme.toLowerCase();
  return ERA_PROMPTS[normalizedEra] || ERA_PROMPTS.medieval;
}

/**
 * Gets a fallback prompt for a given era theme
 * @param eraTheme The era theme (e.g., "medieval", "cyberpunk")
 * @returns The fallback prompt for that era
 */
function getFallbackPrompt(eraTheme: string): string {
  const normalizedEra = eraTheme.toLowerCase();
  return FALLBACK_PROMPTS[normalizedEra] || FALLBACK_PROMPTS.medieval;
}

/**
 * Extracts the era theme from a prompt string
 * @param prompt The original prompt
 * @returns The era theme or null if not found
 */
function extractEraTheme(prompt: string): string | null {
  const normalizedPrompt = prompt.toLowerCase();
  
  // Check for specific era keywords
  if (normalizedPrompt.includes('medieval') || normalizedPrompt.includes('knight')) return 'medieval';
  if (normalizedPrompt.includes('cyberpunk') || normalizedPrompt.includes('neon')) return 'cyberpunk';
  if (normalizedPrompt.includes('anime') || normalizedPrompt.includes('japanese')) return 'anime';
  if (normalizedPrompt.includes('renaissance') || normalizedPrompt.includes('classical')) return 'renaissance';
  if (normalizedPrompt.includes('vintage') || normalizedPrompt.includes('1920s') || normalizedPrompt.includes('1950s')) return 'vintage';
  if (normalizedPrompt.includes('futuristic') || normalizedPrompt.includes('future')) return 'futuristic';
  if (normalizedPrompt.includes('space') || normalizedPrompt.includes('astronaut')) return 'space';
  if (normalizedPrompt.includes('steampunk') || normalizedPrompt.includes('victorian')) return 'steampunk';
  
  return null;
}

/**
 * Processes the Gemini API response, extracting the image or throwing an error if none is found.
 * @param response The response from the generateContent call.
 * @returns A data URL string for the generated image.
 */
function processGeminiResponse(response: GenerateContentResponse): string {
  const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

  if (imagePartFromResponse?.inlineData) {
    const { mimeType, data } = imagePartFromResponse.inlineData;
    return `data:${mimeType};base64,${data}`;
  }

  const textResponse = response.text;
  console.error("API did not return an image. Response:", textResponse);
  throw new Error(`The AI model responded with text instead of an image: "${textResponse || 'No text response received.'}"`);
}

/**
 * A wrapper for the Gemini API call that includes a retry mechanism for internal server errors.
 * @param imagePart The image part of the request payload.
 * @param textPart The text part of the request payload.
 * @returns The GenerateContentResponse from the API.
 */
async function callGeminiWithRetry(imagePart: object, textPart: object): Promise<GenerateContentResponse> {
  const maxRetries = 3;
  const initialDelay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: [imagePart, textPart] },
      });
    } catch (error) {
      console.error(`Error calling Gemini API (Attempt ${attempt}/${maxRetries}):`, error);
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      const isInternalError = errorMessage.includes('"code":500') || errorMessage.includes('INTERNAL');

      if (isInternalError && attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.log(`Internal error detected. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error; // Re-throw if not a retriable error or if max retries are reached.
    }
  }
  // This should be unreachable due to the loop and throw logic above.
  throw new Error("Gemini API call failed after all retries.");
}

/**
 * Generates a decade-styled image from a source image and a prompt.
 * It includes a fallback mechanism for prompts that might be blocked in certain regions.
 * @param imageDataUrl A data URL string of the source image (e.g., 'data:image/png;base64,...').
 * @param prompt The prompt to guide the image generation.
 * @returns A promise that resolves to a base64-encoded image data URL of the generated image.
 */
export async function generateDecadeImage(imageDataUrl: string, prompt: string): Promise<string> {
  const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid image data URL format. Expected 'data:image/...;base64,...'");
  }
  const [, mimeType, base64Data] = match;

  const imagePart = {
    inlineData: { mimeType, data: base64Data },
  };

  // Determine if this is a custom prompt or an era theme
  const eraTheme = extractEraTheme(prompt);
  const isCustomPrompt = !eraTheme || prompt.length > 100; // If it's a long custom prompt

  // --- First attempt with the original prompt ---
  try {
    console.log("Attempting generation with original prompt...");
    const textPart = { text: prompt };
    const response = await callGeminiWithRetry(imagePart, textPart);
    return processGeminiResponse(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    const isNoImageError = errorMessage.includes("The AI model responded with text instead of an image");

    if (isNoImageError && eraTheme) {
      console.warn("Original prompt was likely blocked. Trying a fallback prompt.");
      
      // --- Second attempt with the fallback prompt ---
      try {
        const fallbackPrompt = getFallbackPrompt(eraTheme);
        console.log(`Attempting generation with fallback prompt for ${eraTheme}...`);
        const fallbackTextPart = { text: fallbackPrompt };
        const fallbackResponse = await callGeminiWithRetry(imagePart, fallbackTextPart);
        return processGeminiResponse(fallbackResponse);
      } catch (fallbackError) {
        console.error("Fallback prompt also failed.", fallbackError);
        const finalErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        throw new Error(`The AI model failed with both original and fallback prompts. Last error: ${finalErrorMessage}`);
      }
    } else {
      // This is for other errors, like a final internal server error after retries.
      console.error("An unrecoverable error occurred during image generation.", error);
      throw new Error(`The AI model failed to generate an image. Details: ${errorMessage}`);
    }
  }
}
