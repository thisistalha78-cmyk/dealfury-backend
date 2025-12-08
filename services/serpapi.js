const fetch = require("node-fetch");

module.exports = async function getDeals(query, location) {
    try {

        const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}`;

        const r = await fetch(url);
        const json = await r.json();

        console.log("SERPAPI RAW JSON:", Object.keys(json));  // DEBUG LOG

        const results = [
            ...(json.shopping_results || []),
            ...(json.inline_shopping_results || []),
            ...(json.categorized_shopping_results || [])
        ];

        console.log("FINAL MERGED RESULTS:", results.length); // DEBUG LOG

        return results;

    } catch (err) {
        console.log("SerpAPI error:", err);
        return [];
    }
};
