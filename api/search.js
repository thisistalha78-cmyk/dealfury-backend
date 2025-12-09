const express = require("express");
const router = express.Router();

const getDeals = require("../services/serpapi.js");   // ✅ FIX
const openrouterSummary = require("../services/openrouter.js"); // already OK

router.get("/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json({ error: "Missing query parameter" });

    try {
        // Step 1: Fetch deals
        const deals = await getDeals(q);

        // Step 2: Convert deals to text
        const textBlock = deals
            .slice(0, 8)
            .map((d, i) => `${i + 1}) ${d.title} — Price: ${d.extracted_price || "N/A"}`)
            .join("\n");

        // Step 3: AI summary
        const summary = await openrouterSummary(textBlock);

        res.json({ summary, deals });

    } catch (err) {
        console.error("SEARCH API ERROR:", err);
        res.json({ summary: "Something went wrong", deals: [] });
    }
});

module.exports = router;

