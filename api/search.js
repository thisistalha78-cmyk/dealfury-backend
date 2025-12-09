const express = require("express");
const router = express.Router();

const serpapiSearch = require("../services/serpapi");
const openrouterSummary = require("../services/openrouter");

router.get("/search", async (req, res) => {
    try {
        const q = req.query.q;
        if (!q) return res.json({ error: "Missing query parameter" });

        console.log("🔍 SEARCH QUERY =", q);

        // 1️⃣ Fetch deals from SerpAPI
        const serp = await serpapiSearch(q);

        console.log("🔎 SERP DEALS COUNT =", serp.length);
        console.log("🔎 FIRST DEAL SAMPLE =", serp[0] || "NO RESULTS");

        // If no deals found → return early
        if (!serp || serp.length === 0) {
            return res.json({
                summary: "No deals found.",
                deals: []
            });
        }

        // 2️⃣ Prepare text for AI summary
        const textBlock = serp
            .slice(0, 10)
            .map((d, i) => `${i + 1}) ${d.title} — Price: ${d.extracted_price || "N/A"}`)
            .join("\n");

        console.log("🧾 TEXT SENT TO AI:\n", textBlock);

        // 3️⃣ Generate summary using OpenRouter AI
        const summary = await openrouterSummary(textBlock);

        console.log("🤖 AI SUMMARY =", summary);

        // 4️⃣ Send final response
        return res.json({
            summary,
            deals: serp
        });

    } catch (err) {
        console.error("🔥 SEARCH ROUTE ERROR:", err);
        res.json({ summary: "Something went wrong", deals: [] });
    }
});

module.exports = router;

});

module.exports = router;

