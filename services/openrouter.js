import fetch from "node-fetch";

async function openrouterSummary(text) {
  const API_KEY = "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";

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
          { role: "system", content: "Summarize these shopping deals in 2–3 sentences:" },
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    console.log("OPENROUTER RAW:", data);

    return data?.choices?.[0]?.message?.content || "Summary unavailable.";
  } catch (err) {
    console.error("OpenRouter Error:", err);
    return "AI summary failed.";
  }
}

export default openrouterSummary;

