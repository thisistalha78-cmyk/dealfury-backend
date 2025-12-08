const fetch = require("node-fetch");

module.exports = async function summaryAI(products) {
    try {
        if (!products || products.length === 0) return "No deals found.";

        const text = products
            .slice(0, 5)
            .map((p, i) => `#${i+1}: ${p.title} — ${p.extracted_price || p.price}`)
            .join("\n");

        const prompt = `
Analyze these shopping deals and explain:
1. Which one is best and why
2. How much can the user save?
3. Suggest one alternative.
Deals:
${text}
`;

        const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.DEEPSEEK_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const json = await res.json();
        return json.choices[0].message.content;

    } catch (err) {
        console.log("DeepSeek error:", err);
        return "AI summary unavailable.";
    }
};
