const fetch = require("node-fetch");

async function openrouterSummary(text) {
    const API_KEY = process.env.OPENROUTER_API_KEY;

    if (!API_KEY) {
        console.error("❌ OPENROUTER_API_KEY missing!");
        return "Summary unavailable (missing API key).";
    }

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://dealfury.com",       // তোমার অ্যাপ লিঙ্ক
                "X-Title": "Dealfury AI Summary"
            },
            body: JSON.stringify({
                model: "google/gemma-3n-e2b-it:free",  // FREE MODEL
                messages: [
                    { role: "system", content: "Summarize the following shopping deals in short:" },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await res.json();

        return data?.choices?.[0]?.message?.content || "AI summary unavailable.";
    } catch (err) {
        console.error("OpenRouter Error:", err);
        return "Summary generation failed.";
    }
}

module.exports = openrouterSummary;

