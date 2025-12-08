const fetch = require("node-fetch");

module.exports = async function getLocation(query) {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

        const res = await fetch(url, {
            headers: { "User-Agent": "DealFury/1.0" }
        });

        const json = await res.json();
        return json[0] || null;

    } catch (err) {
        console.log("Nominatim error:", err);
        return null;
    }
};
