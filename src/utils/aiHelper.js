const GEMINI_API_KEY =
    import.meta.env.VITE_GEMINI_API_KEY;

export async function generateWithAI(prompt) {
    if (!GEMINI_API_KEY) {
        throw new Error("API key not found. Check your .env file!");
    }

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt,
                    }, ],
                }, ],
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "AI request failed");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
}