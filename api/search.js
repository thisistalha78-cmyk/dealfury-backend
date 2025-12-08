const express = require("express");
const router = express.Router();

const serpapiSearch = require("../services/serpapi");
const openrouterSummary = require("../services/openrouter");

router.get("/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json({ error: "Missing query parameter" });

    try {
        // Fetch deals array directly
        const deals = await serpapiSearch(q);

        // Prepare summary text (first 10 results)
        const textBlock = deals
            .slice(0, 10)
            .map((d, i) => `${i + 1}) ${d.title || "No Title"} — Price: ${d.extracted_price || "N/A"}`)
            .join("\n");

        // Get summary
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

