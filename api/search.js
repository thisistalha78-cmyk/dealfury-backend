const express = require("express");
const router = express.Router();

const getLocation = require("../services/nominatim.js");
const getDeals = require("../services/serpapi.js");
const getSummary = require("../services/deepseek.js");

router.get("/", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json({ error: "empty query" });

    const location = await getLocation(q);
    const deals = await getDeals(q, location);
    const summary = await getSummary(deals);

    res.json({
        summary,
        deals
    });
});

module.exports = router;
