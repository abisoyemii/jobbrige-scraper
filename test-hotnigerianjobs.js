const axios = require("axios");
const cheerio = require("cheerio");
const pLimit = require("p-limit");
const fetchHotNigerianJobDetails = require("./hotnigerianjobs-details");

async function fetchHotNigerianJobs() {

    try {

        const jobLinks = [];

        // Limit concurrent requests
        const limit = pLimit(10);

        // Scrape first 10 pages
        for (let page = 0; page < 10; page++) {

            console.log(`Scraping Hot Nigerian Jobs page ${page}...`);

            const response = await axios.get(
                `https://www.hotnigerianjobs.com/alljobs/${page}/`,
                {
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
                    }
                }
            );

            const $ = cheerio.load(response.data);

            $("a[href*='/hotjobs/']").each((i, el) => {

                const href = $(el).attr("href");

                if (!href) return;

                const fullUrl = href.startsWith("http")
                    ? href
                    : "https://www.hotnigerianjobs.com" + href;

                if (!jobLinks.includes(fullUrl)) {
                    jobLinks.push(fullUrl);
                }

            });

            console.log(
                `Collected ${jobLinks.length} unique links so far`
            );

        }

        console.log(
            `Total Hot Nigerian Jobs links found: ${jobLinks.length}`
        );

        // Fetch all job details concurrently
        const jobs = (
            await Promise.all(
                jobLinks.map(url =>
                    limit(() => fetchHotNigerianJobDetails(url))
                )
            )
        ).filter(Boolean);

        console.log(
            `Fetched ${jobs.length} jobs from Hot Nigerian Jobs`
        );

        return jobs;

    } catch (error) {

        console.log(
            "Hot Nigerian Jobs Error:",
            error.message
        );

        return [];

    }

}

module.exports = fetchHotNigerianJobs;