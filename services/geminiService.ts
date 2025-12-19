
import { GoogleGenAI } from "@google/genai";

export const generateFortniteSkin = async (description: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Construct a highly detailed prompt specifically for Fortnite style
  const enhancedPrompt = `
    A high-quality 3D Fortnite character skin of ${description}. 
    The style should be identical to Fortnite Battle Royale skins: stylized, semi-realistic 3D character model, vibrant colors, clean silhouettes.
    The character should be standing in a heroic, combat-ready pose.
    Ensure tactical details: tactical vest, combat boots, military pouches, and armor plates.
    Lighting should be cinematic, bright, and vibrant, similar to the Fortnite Lobby screen or Item Shop preview.
    Unreal Engine 5 render style, 8k resolution, professional concept art.
    The background should be a blurred, colorful Fortnite island landscape with a blue/purple sky.
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: enhancedPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    // Find the image part in the response parts
    let base64Image: string | undefined;
    
    // Check if candidates exist and iterate parts
    const candidates = (response as any).candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error("No image was generated. Please try a different description.");
    }

    return `data:image/png;base64,${base64Image}`;
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    if (error.message?.includes("Safety")) {
      throw new Error("The prompt was flagged by safety filters. Please try a less violent or sensitive description.");
    }
    throw error;
  }
};
