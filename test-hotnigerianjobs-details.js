const fetchHotNigerianJobDetails = require("./src/scrapers/hotnigerianjobs-details");

(async () => {

    const job =
        await fetchHotNigerianJobDetails(
            "https://www.hotnigerianjobs.com/hotjobs/924537/security-guard-personnel-at-huko-advisory-services.html"
        );

    console.log(job);

})();