const axios = require("axios");

async function fetchWorkable(company) {
    try {
        const url = `https://www.workable.com/api/accounts/${company}?details=true`;

        const { data } = await axios.get(url, {
            timeout: 20000,
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        return data.jobs || [];
    } catch (err) {
        console.error(`Workable (${company}) failed:`, err.message);
        return [];
    }
}

module.exports = fetchWorkable;