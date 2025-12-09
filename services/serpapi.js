const fetch = require("node-fetch");

async function getDeals(query) {
    try {
        const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}`;

        const r = await fetch(url);
        const json = await r.json();

        const results = [
            ...(json.shopping_results || []),
            ...(json.inline_shopping_results || []),
            ...(json.categorized_shopping_results || [])
        ];

        return results;

    } catch (err) {
        console.log("SerpAPI error:", err);
        return [];
    }
}

module.exports = getDeals;
