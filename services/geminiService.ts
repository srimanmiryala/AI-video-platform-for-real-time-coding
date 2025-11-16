
import { GoogleGenAI, Type } from "@google/genai";
import type { CodingProblem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const problemSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A concise title for the coding problem.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed description of the coding problem.",
    },
    examples: {
      type: Type.ARRAY,
      description: "At least two examples with input and output.",
      items: { type: Type.STRING },
    },
    constraints: {
      type: Type.ARRAY,
      description: "A list of constraints for the problem.",
      items: { type: Type.STRING },
    },
  },
  required: ["title", "description", "examples", "constraints"],
};

export const generateCodingProblem = async (): Promise<CodingProblem> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a medium-difficulty JavaScript coding problem suitable for a 30-minute pair programming session. The problem should be something classic like array manipulation, string processing, or basic algorithms.",
      config: {
        responseMimeType: "application/json",
        responseSchema: problemSchema,
      },
    });
    
    const jsonString = response.text.trim();
    const problem = JSON.parse(jsonString) as CodingProblem;
    return problem;
  } catch (error) {
    console.error("Error generating coding problem:", error);
    // Fallback problem in case of API error
    return {
      title: "API Error: Palindrome Checker",
      description: "There was an error fetching a problem from the AI. As a fallback, please implement a function that checks if a given string is a palindrome (reads the same forwards and backwards).",
      examples: [
        "Input: 'racecar', Output: true",
        "Input: 'hello', Output: false"
      ],
      constraints: [
        "The input string will consist of lowercase letters only.",
        "An empty string is considered a palindrome."
      ]
    };
  }
};

export const getAIFeedback = async (problem: CodingProblem, userCode: string): Promise<string> => {
  const prompt = `
    You are an expert coding interviewer providing feedback.
    
    Problem:
    Title: ${problem.title}
    Description: ${problem.description}
    
    User's JavaScript Solution:
    \`\`\`javascript
    ${userCode}
    \`\`\`
    
    Please provide constructive feedback on the solution. Analyze its correctness, time and space complexity, and code style/readability.
    Format your response in Markdown. Keep it concise, helpful, and encouraging.
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting AI feedback:", error);
    return "Sorry, I was unable to process the feedback request. Please try again.";
  }
};
