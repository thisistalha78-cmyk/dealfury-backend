const fetch = require("node-fetch");

async function summaryAI(deals) {
  try {
    if (!deals || deals.length === 0) return "No deals found.";

    const topDeals = deals.slice(0, 5)
      .map(d => `${d.title} - $${d.extracted_price || d.price || "N/A"}`)
      .join("\n");

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a shopping assistant. Compare prices." },
          { role: "user", content: `Here are product prices:\n\n${topDeals}\n\nWhich one is the best deal and why?` }
        ]
      })
    });

    const data = await response.json();

    console.log("==== RAW DEEPSEEK RESPONSE ====");
    console.log(JSON.stringify(data, null, 2));

    // FIX: Safe choice reading
    const summary =
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "AI summary unavailable.";

    return summary;

  } catch (err) {
    console.error("DeepSeek Error:", err);
    return "AI summary unavailable.";
  }
}

module.exports = summaryAI;
