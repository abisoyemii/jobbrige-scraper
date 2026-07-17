const axios = require("axios");

async function fetchLever(company) {
    try {
        const url = `https://api.lever.co/v0/postings/${company}?mode=json`;

        const { data } = await axios.get(url, {
            timeout: 20000,
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        return data || [];
    } catch (err) {
        console.error(`Lever (${company}) failed:`, err.message);
        return [];
    }
}

module.exports = fetchLever;