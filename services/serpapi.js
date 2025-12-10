import fetch from "node-fetch";

export default async function getDeals(query) {
  try {
    const url = `https://serpapi.com/search.json?engine=google_product&q=${encodeURIComponent(
      query
    )}&api_key=bb4940f5be015fe5b1fce30d30be4359c82105d7de6e707b17c8105c81dbcc2b`;

    const r = await fetch(url);
    const json = await r.json();

    console.log("SERPAPI KEYS:", Object.keys(json));

    const results = json.products || [];

    console.log("FOUND PRODUCTS:", results.length);

    return results;
  } catch (err) {
    console.log("SerpAPI ERROR:", err);
    return [];
  }
}
