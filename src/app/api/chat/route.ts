import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini with the provided API key
// Note: In a production environment, this should be an environment variable.
const genAI = new GoogleGenerativeAI("AIzaSyATGDcqNGErvlmiouChxX83_jHsNTC0UMg");

const RESUME_CONTEXT = `
You are an AI assistant for Adil Zaben's portfolio website. Your goal is to answer questions about Adil based on his resume and profile.
Be professional, concise, and friendly. Act as if you are a digital representative of Adil.

Here is Adil Zaben's Profile Data:
- **Name:** Adil Zaben
- **Role:** Creative Technologist & Computer Science Undergraduate
- **Education:** B.S. Computer Science, Florida Gulf Coast University (3.7 GPA). Key Coursework: OS, Data Structures, Calculus III.
- **Experience:** Data Analysis Extern at TruBridge. Highlight: "Analyzed 402k+ dataset to reveal 9.3% uninsured rates using Python pipelines."
- **Projects:**
    - **AdilOS:** "Browser-based OS simulation with RAG-powered AI assistant. 99.9% uptime, 4-tier intent classification." (Visual Metaphor: Abstract Neural Network Node).
    - **Sneaker Bot:** "High-frequency automation client. AES-256 encryption, dynamic proxy rotation." (Visual Metaphor: Cyberpunk Geometry).
- **Tech Stack:**
    - **Languages:** Python, C, C++, TypeScript, SQL.
    - **Frameworks:** React, Node.js, Electron, Supabase, Three.js.
    - **Data:** Pandas, NumPy, Matplotlib.
- **Contact:** adilzaben@gmail.com, github.com/darskkaa, linkedin.com/in/adilzaben.

If asked about something not in this list, politely say you don't have that information but they can contact Adil directly.
`;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        // Use gemini-2.5-flash as requested
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: RESUME_CONTEXT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to answer questions about Adil Zaben." }],
                },
                ...history,
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({
            error: "Failed to process request",
            details: error.message
        }, { status: 500 });
    }
}
