
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askHeritageExpert = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert Adventist Church Historian. Provide an accurate, encouraging, and brief answer for a youth member. Question: ${question}`,
      config: {
        systemInstruction: "You are a friendly, knowledgeable Seventh-day Adventist heritage mentor. Use simple language suitable for youth, cite historical facts accurately (Millerite movement, pioneers, church organization), and always maintain a respectful, faith-filled tone.",
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't find an answer to that right now. Please ask your AY leader!";
  } catch (error) {
    console.error("AI Error:", error);
    return "The AI mentor is currently resting. Please try again later.";
  }
};
