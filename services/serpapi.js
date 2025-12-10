import fetch from "node-fetch";

export default async function getDeals(query) {
    try {
        const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}`;

        const r = await fetch(url);
        const json = await r.json();

        console.log("SERPAPI RAW:", json); // debug

        if (json.error) {
            console.log("SERPAPI ERROR:", json.error);
            return [];
        }

        const results = json.shopping_results || [];

        return results;

    } catch (err) {
        console.log("SerpAPI exception:", err);
        return [];
    }
}
