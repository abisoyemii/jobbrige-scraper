const axios = require("axios");

module.exports = async function fetchGreenhouse(company) {
    try {
        const { data } = await axios.get(
            `https://boards-api.greenhouse.io/v1/boards/${company}/jobs?content=true`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0"
                },
                timeout: 20000
            }
        );

        return data.jobs || [];
    } catch (err) {
        console.error(`Greenhouse (${company}) failed:`, err.message);
        return [];
    }
};