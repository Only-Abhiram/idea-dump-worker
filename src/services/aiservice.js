const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest" // fast + cheap
});

exports.validateProblem = async (problem) => {
  try {
    const prompt = `
You are a startup problem evaluator.

Evaluate the following problem:

Title: ${problem.title}
Description: ${problem.description}

Rules:
- Reject vague or generic problems
- Accept only specific, real-world problems

DO NOT include explanations.
Return ONLY valid JSON:

{
  "is_valid": true/false,
  "clarity": number (1-10),
  "uniqueness": number (1-10),
  "market": number (1-10),
  "category": "string",
  "summary": "one-line summary"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 🔥 IMPORTANT: Gemini sometimes wraps output → clean it
    const cleaned = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (err) {
    console.error("Gemini Error:", err.message);

    return {
      is_valid: false
    };
  }
};