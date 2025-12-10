import fetch from "node-fetch";

export default async function getDeals(query) {
  try {
    const url = `https://serpapi.com/search.json?engine=google_product&q=${encodeURIComponent(
      query
    )}&api_key=${process.env.SERP_API_KEY}`;

    const r = await fetch(url);
    const json = await r.json();

    console.log("SERP JSON KEYS:", Object.keys(json)); // Debug

    // The actual product results come under "products"
    const results = [
      ...(json.products || []),
      ...(json.shopping_results || []),
      ...(json.inline_shopping_results || []),
    ];

    console.log("TOTAL RESULTS:", results.length);

    return results;
  } catch (err) {
    console.log("SerpAPI ERROR:", err);
    return [];
  }
}
