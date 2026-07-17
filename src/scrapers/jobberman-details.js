const axios = require("axios");
const cheerio = require("cheerio");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchJobbermanDetails(url) {

    // Retry up to 3 times
    for (let attempt = 1; attempt <= 3; attempt++) {

        try {

            const { data } = await axios.get(url, {
                timeout: 30000,
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138 Safari/537.36",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Referer": "https://www.jobberman.com/"
                }
            });

            const $ = cheerio.load(data);

            const title =
                $('h1[data-cy="title-job"]').first().text().trim() ||
                "Not specified";

            let company =
                $('[data-cy="company-name"]').first().text().trim();

            if (!company)
                company = $("h2").first().text().trim();

            if (!company)
                company = "Not specified";

            let location = "Nigeria";

            $('a[href*="/jobs/"]').each((i, el) => {

                const href = $(el).attr("href") || "";
                const text = $(el).text().trim();

                if (
                    href.includes("/jobs/lagos") ||
                    href.includes("/jobs/abuja") ||
                    href.includes("/jobs/enugu") ||
                    href.includes("/jobs/ibadan") ||
                    href.includes("/jobs/imo") ||
                    href.includes("/jobs/port-harcourt") ||
                    href.includes("/jobs/rest-nigeria") ||
                    href.includes("/jobs/outside-nigeria") ||
                    href.includes("/jobs/remote")
                ) {
                    location = text;
                    return false;
                }

            });

            let category = "General";

            $('a[href*="/jobs/"]').each((i, el) => {

                const href = $(el).attr("href") || "";
                const text = $(el).text().trim();

                if (
                    href.includes("/jobs/") &&
                    !href.includes("/jobs/full-time") &&
                    !href.includes("/jobs/part-time") &&
                    !href.includes("/jobs/contract") &&
                    !href.includes("/jobs/internship") &&
                    !href.includes("/jobs/lagos") &&
                    !href.includes("/jobs/abuja") &&
                    !href.includes("/jobs/enugu") &&
                    !href.includes("/jobs/remote")
                ) {
                    category = text;
                }

            });

            let description = "";

            $("ul.list-disc li").each((i, el) => {
                description += "- " + $(el).text().trim() + "\n";
            });

            if (!description) {

                $("article, section").each((i, el) => {

                    const text = $(el).text().trim();

                    if (text.length > description.length) {
                        description = text;
                    }

                });

            }

            let salary =
                $('[class*="salary"]').first().text().trim();

            if (!salary)
                salary = "Not specified";

            let type = "Not specified";

            const jobTypes = [
                "/jobs/full-time",
                "/jobs/part-time",
                "/jobs/contract",
                "/jobs/internship",
                "/jobs/remote"
            ];

            for (const path of jobTypes) {

                const el = $(`a[href*="${path}"]`).first();

                if (el.length) {
                    type = el.text().trim();
                    break;
                }

            }

            return {
                title,
                company,
                location,
                salary,
                type,
                category,
                description: description.trim(),
                apply_url: url,
                company_logo: "",
                source: "Jobberman",
                date_created: new Date().toISOString()
            };

        } catch (err) {

            console.log(
                `Jobberman retry ${attempt}/3: ${err.message}`
            );

            await sleep(2000 * attempt);

        }

    }

    return null;

}

module.exports = fetchJobbermanDetails;