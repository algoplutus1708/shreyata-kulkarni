import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  const { message, skills, experiences } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const skillsString = skills
    .map((skill: { name: any; level: any }) => `${skill.name} (${skill.level}%)`)
    .join(", ");
  const experiencesString = experiences
    .map(
      (exp: {
        company: any;
        role: any;
        period: any;
        description: any;
        achievements: any;
      }) =>
        `${exp.role} at ${exp.company} (${exp.period}): ${
          exp.description
        }. Achievements: ${exp.achievements.join(", ")}`
    )
    .join("\n");

  const prompt = `You are an AI assistant for Shreyata Kulkarni's portfolio. Your name is Shreyata's Assistant. Be friendly, professional, and helpful.
    Keep your responses concise and to the point, ideally under 100 words.
    You have the following information about Shreyata's skills and experience:

    Skills:
    ${skillsString}

    Experience:
    ${experiencesString}

    Based on this information, answer the user's question: "${message}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}