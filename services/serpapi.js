import fetch from "node-fetch";

export default async function getDeals(query) {
  try {
    const url = `https://serpapi.com/search.json?engine=google_product&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}`;

    const r = await fetch(url);
    const json = await r.json();

    // Debug
    console.log("SERP RAW:", Object.keys(json));

    const results = [
      ...(json.products || []),
      ...(json.shopping_results || []),
      ...(json.inline_shopping_results || []),
    ];

    return results;
  } catch (err) {
    console.log("SerpAPI error:", err);
    return [];
  }
}
