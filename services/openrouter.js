const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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
                "HTTP-Referer": "https://dealfury.com",
                "X-Title": "Dealfury AI Summary"
            },
            body: JSON.stringify({
                model: "google/gemma-3n-e2b-it:free",
                messages: [
                    { role: "system", content: "Summarize these deals briefly:" },
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

