const express = require("express");
const router = express.Router();

const getDeals = require("../services/serpapi.js").default;
const openrouterSummary = require("../services/openrouter");

router.get("/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json({ error: "Missing query parameter" });

  try {
    const deals = await getDeals(q);

    if (!deals.length) {
      return res.json({
        summary: "No deals found for this keyword.",
        deals: []
      });
    }

    const textBlock = deals
      .slice(0, 10)
      .map(
        (d, i) =>
          `${i + 1}) ${d.title || "No title"} — Price: ${
            d.price || d.extracted_price || "N/A"
          }`
      )
      .join("\n");

    const summary = await openrouterSummary(textBlock);

    res.json({ summary, deals });
  } catch (err) {
    console.error("SEARCH API ERROR:", err);
    res.json({ summary: "Something went wrong", deals: [] });
  }
});

module.exports = router;
