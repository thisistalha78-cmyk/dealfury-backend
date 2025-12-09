import express from "express";
const router = express.Router();

import getDeals from "../services/serpapi.js";
import openrouterSummary from "../services/openrouter.js";

router.get("/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json({ error: "Missing query parameter" });

    try {
        // Step 1: Fetch deals
        const deals = await getDeals(q);

        // Step 2: Convert deals to text for summary
        const textBlock = deals.slice(0, 8).map((d, i) =>
            `${i + 1}) ${d.title} — Price: ${d.extracted_price || "N/A"}`
        ).join("\n");

        // Step 3: AI generate summary
        const summary = await openrouterSummary(textBlock);

        res.json({ summary, deals });

    } catch (err) {
        console.error(err);
        res.json({ summary: "Something went wrong", deals: [] });
    }
});

export default router;

