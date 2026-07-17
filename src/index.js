console.time("JobBridge Scraper");

const run = async () => {
    // existing code...
};

run();






const runScrapers = require("./services/scraper-manager");
const normalizeJob = require("./services/job-normalizer");
const saveJobs = require("./services/job-storage");
const removeDuplicates = require("./utils/job-filter");

async function start() {

    console.log("Starting JobBridge Scraper...");

    const jobs = await runScrapers();

    console.log("TOTAL BEFORE NORMALIZATION:", jobs.length);

    const jobbermanJobs = jobs.filter(job => job.source === "Jobberman");

    console.log("JOBBERMAN BEFORE NORMALIZATION:", jobbermanJobs.length);

    if (jobbermanJobs.length > 0) {
        console.log(jobbermanJobs[0]);
    }

    let cleanJobs = jobs.map(normalizeJob);

    console.log(
        "JOBBERMAN AFTER NORMALIZATION:",
        cleanJobs.filter(job => job.source === "Jobberman").length
    );

    cleanJobs = removeDuplicates(cleanJobs);

    console.log(
        "JOBBERMAN AFTER DEDUPLICATION:",
        cleanJobs.filter(job => job.source === "Jobberman").length
    );

    saveJobs(cleanJobs);

    console.log(`Total JobBridge jobs: ${cleanJobs.length}`);
}

start();

console.timeEnd("JobBridge Scraper");