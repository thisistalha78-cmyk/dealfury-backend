const express = require("express");
const router = express.Router();

const getDeals = require("../services/serpapi");
const openrouterSummary = require("../services/openrouter");

router.get("/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json({ error: "Missing query parameter" });

    try {
        // Step 1: Fetch deals (SerpAPI returns array)
        const deals = await getDeals(q);

        console.log("🔥 DEAL COUNT:", deals.length);

        // If no deals found
        if (!deals || deals.length === 0) {
            return res.json({ summary: "No deals found.", deals: [] });
        }

        // Step 2: Convert deals to text block
        const textBlock = deals.slice(0, 8)
            .map((d, i) => `${i + 1}) ${d.title || "N/A"} — Price: ${d.extracted_price || "N/A"}`)
            .join("\n");

        // Step 3: Generate AI summary
        const summary = await openrouterSummary(textBlock);

        res.json({ summary, deals });

    } catch (err) {
        console.error("❌ SEARCH API ERROR:", err);
        res.json({ summary: "Something went wrong", deals: [] });
    }
});

module.exports = router;


