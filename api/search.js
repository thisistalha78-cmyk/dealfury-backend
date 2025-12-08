const express = require("express");
const router = express.Router();

const serpapiSearch = require("../services/serpapi");
const openrouterSummary = require("../services/openrouter");

router.get("/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json({ error: "Missing query parameter" });

    try {
        // 1️⃣ Fetch deals from SerpAPI
        const serp = await serpapiSearch(q);
        const deals = serp.deals || serp.shopping_results || [];

        // 2️⃣ Convert deals → summary text
        const textBlock = deals
            .slice(0, 10)
            .map((d, i) => `${i + 1}) ${d.title} — Price: ${d.extracted_price}`)
            .join("\n");

        // 3️⃣ Get AI summary using OpenRouter
        const summary = await openrouterSummary(textBlock);

        res.json({
            summary,
            deals
        });

    } catch (err) {
        console.error(err);
        res.json({ summary: "Something went wrong", deals: [] });
    }
});

module.exports = router;
