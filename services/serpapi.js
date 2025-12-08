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

        return json.shopping_results || [];
    } catch (err) {
        console.log("SerpAPI error:", err);
        return [];
    }
};
