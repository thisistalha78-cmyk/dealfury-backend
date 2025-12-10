import fetch from "node-fetch";

export default async function getDeals(query) {
    try {
        const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}`;

        const r = await fetch(url);
        const json = await r.json();

        console.log("RAW SERPAPI:", Object.keys(json)); // DEBUG

        const results = [
            ...(json.shopping_results || []),
            ...(json.inline_shopping_results || []),
            ...(json.categorized_shopping_results || []),
        ];

        console.log("FINAL DEAL COUNT:", results.length); // DEBUG

        return results;

    } catch (err) {
        console.log("SerpAPI ERROR:", err);
        return [];
    }
}
