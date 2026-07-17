const axios = require("axios");
const cheerio = require("cheerio");

async function fetchHotNigerianJobDetails(url) {

    try {

        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        });

        const $ = cheerio.load(response.data);

        // ----------------------------
        // Title
        // ----------------------------
        const title =
            $("span.jobheader h1 a").text().trim() ||
            $("h1").first().text().trim();

        // ----------------------------
        // Description
        // ----------------------------
        let description = "";

        $(".jobdetails_left_col p").each((i, el) => {

            const text = $(el).text().trim();

            if (text.length > 5) {

                description += text + "\n";

            }

        });

        // ----------------------------
        // Company
        // ----------------------------
        let company = "";

        const titleParts = title.split(" at ");

        if (titleParts.length > 1) {

            company = titleParts[1].trim();

        }

        // ----------------------------
        // Location
        // ----------------------------
        let location = "Nigeria";

        const bodyText = $("body").text();

        const locationMatch =
            bodyText.match(/Location:\s*(.*)/i);

        if (locationMatch) {

            location = locationMatch[1]
                .split("\n")[0]
                .trim();

        }

        // ----------------------------
        // Employment Type
        // ----------------------------
        let type = "Not specified";

        const typeMatch =
            bodyText.match(/Employment Type:\s*(.*)/i);

        if (typeMatch) {

            type = typeMatch[1]
                .split("\n")[0]
                .trim();

        }

        // ----------------------------
        // Category
        // ----------------------------
        let category = "Not specified";

        // ----------------------------
        // Salary
        // ----------------------------
        let salary = "Not specified";

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
            source: "Hot Nigerian Jobs",
            date_created: new Date().toISOString()

        };

    } catch (error) {

        console.log(
            "Hot Nigerian Job Details Error:",
            error.message
        );

        return null;

    }

}

module.exports = fetchHotNigerianJobDetails;