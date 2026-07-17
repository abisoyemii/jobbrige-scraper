const axios = require("axios");
const cheerio = require("cheerio");
const pLimit = require("p-limit");
const fetchJobbermanDetails = require("./jobberman-details");

async function fetchJobbermanJobs() {

    try {

        const jobLinks = [];

        // Scrape first 10 pages
        for (let page = 1; page <= 10; page++) {

            console.log(`Scraping Jobberman page ${page}...`);

            const response = await axios.get(
                `https://www.jobberman.com/jobs?page=${page}`,
                {
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36"
                    },
                    timeout: 30000
                }
            );

            const $ = cheerio.load(response.data);

            $("a[href*='/listings/']").each((i, el) => {

                const href = $(el).attr("href");

                if (!href) return;

                const fullUrl = href.startsWith("http")
                    ? href
                    : "https://www.jobberman.com" + href;

                if (!jobLinks.includes(fullUrl)) {
                    jobLinks.push(fullUrl);
                }

            });

            console.log(
                `Collected ${jobLinks.length} unique links so far`
            );

        }

        console.log(
            `Total Jobberman links found: ${jobLinks.length}`
        );

        // Remove duplicate links
        const uniqueLinks = [...new Set(jobLinks)];

        // Only fetch 2 job pages simultaneously
        const limit = pLimit(2);

        const jobs = (
            await Promise.all(
                uniqueLinks.map(url =>
                    limit(() => fetchJobbermanDetails(url))
                )
            )
        ).filter(Boolean);

        console.log(
            `Fetched ${jobs.length} jobs from Jobberman`
        );

        return jobs;

    } catch (error) {

        console.log(
            "Jobberman Error:",
            error.message
        );

        return [];

    }

}

module.exports = fetchJobbermanJobs;