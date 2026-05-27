import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-summary", async(req, res) => {
    try {
        const { title, skills } = req.body;

    const prompt = `
    Write a professional resume summary for a ${title}.
     
    Skills: ${skills}
    `;

        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: prompt }],
        });

        res.json({
            summary: response.choices[0].message.content,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});