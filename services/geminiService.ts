import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateGrowthAdvice = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure your environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a world-class business consultant and startup mentor for "Hustlers Point". 
      The user is asking for advice: "${query}". 
      Provide actionable, concise, and motivating advice. Structure it with bullet points if helpful. 
      Keep the tone professional yet energetic. 
      Limit response to under 300 words.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response on flash model
      }
    });

    return response.text || "No advice could be generated at this time.";
  } catch (error) {
    console.error("Error generating advice:", error);
    return "An error occurred while fetching insights. Please try again later.";
  }
};

export const generateIdeaValidation = async (idea: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Validate this business idea: "${idea}". 
      Provide a "Pros", "Cons", and "Verdict" section. 
      Be critically honest but constructive.`,
    });
    return response.text || "Could not validate idea.";
  } catch (error) {
    console.error("Error validating idea:", error);
    return "Error validating idea. Try again.";
  }
};
