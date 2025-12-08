const fetch = require("node-fetch");

module.exports = async function getDeals(query, location) {
    try {
        let loc = "";
        if (location) {
            loc = `&location=${location.lat},${location.lon}`;
        }

        const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}${loc}&api_key=${process.env.SERP_API_KEY}`;

        const r = await fetch(url);
        const json = await r.json();

        // Extract all possible product arrays
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
};
