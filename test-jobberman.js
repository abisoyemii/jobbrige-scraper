const axios = require("axios");
const cheerio = require("cheerio");

(async () => {
    try {

        const url =
            "https://www.jobberman.com/listings/assistant-workshop-manager-rrnkwj";

        const { data } = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        });

        const $ = cheerio.load(data);

        console.log("\n========== TITLE ==========");
        console.log(
            $('h1[data-cy="title-job"]')
                .first()
                .text()
                .trim()
        );

        console.log("\n========== COMPANY ==========");
        console.log(
            $("h2")
                .first()
                .text()
                .trim()
        );

        console.log("\n========== H2 TAGS ==========");
        $("h2").each((i, el) => {
            console.log(i + ":", $(el).text().trim());
        });

        console.log("\n========== JOB LINKS ==========");
        $('a[href*="/jobs/"]').each((i, el) => {
            console.log(
                i + ":",
                $(el).text().trim(),
                "=>",
                $(el).attr("href")
            );
        });

        console.log("\n========== DESCRIPTION ==========");
        console.log(
            $("ul.list-disc")
                .first()
                .text()
                .trim()
                .substring(0, 800)
        );

    } catch (err) {
        console.log(err.message);
    }
})();