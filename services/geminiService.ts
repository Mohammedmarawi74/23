
import { GoogleGenAI, Type } from "@google/genai";

// Generate carousel content with professional tech style using Gemini 3 Flash
export const generateCarouselContent = async (topic: string) => {
  // Create a new GoogleGenAI instance right before the call to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `أنشئ محتوى لكاروسيل انستقرام احترافي باللغة العربية حول موضوع: "${topic}". 
    يجب أن يتكون من 5 شرائح. كل شريحة تحتوي على: عنوان جذاب، نص فرعي، ومحتوى تفصيلي.
    الأسلوب: تقني، حديث، وملهم.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            body: { type: Type.STRING },
            button: { type: Type.STRING }
          },
          required: ["title", "subtitle", "body"]
        }
      }
    }
  });
  
  // Access the .text property directly (it's a getter, not a method).
  const jsonStr = response.text || "[]";
  return JSON.parse(jsonStr.trim());
};

// Generate a high-quality tech image using the nano banana series model
export const generateTechImage = async (prompt: string) => {
  // Create a new GoogleGenAI instance right before the call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Professional tech background, high resolution, dark navy and cyan neon lighting, futuristic atmosphere, minimalist but detailed, ${prompt}, vertical aspect ratio 3:4`
        }
      ]
    },
    config: {
      imageConfig: {
        // Supported values for nano banana models are "1:1", "3:4", "4:3", "9:16", and "16:9".
        aspectRatio: "3:4"
      }
    }
  });

  // Iterate through parts to find the image part (inlineData). Do not assume it is the first part.
  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      } else if (part.text) {
        console.log("Model feedback:", part.text);
      }
    }
  }
  return null;
};
