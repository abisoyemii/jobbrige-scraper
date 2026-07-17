const axios = require("axios");

async function fetchRemotiveJobs() {
    try {
        const response = await axios.get(
            "https://remotive.com/api/remote-jobs",
            {
                timeout: 15000,
                headers: {
                    "User-Agent": "JobBridge-Scraper/1.0"
                }
            }
        );

        const jobs = response.data.jobs;

        console.log(`Fetched ${jobs.length} jobs from Remotive`);

        return jobs;

    } catch (error) {
        console.error(
            "Remotive Error:",
            error.code,
            error.message
        );

        return [];
    }
}

module.exports = fetchRemotiveJobs;