const fs = require("fs");
const path = require("path");

function verifyJobs() {
    const file = path.join(__dirname, "../../jobs.json");

    const jobs = JSON.parse(fs.readFileSync(file, "utf8"));

    console.log("\n========== JOB VERIFICATION ==========\n");

    console.log("Total jobs:", jobs.length);

    // Count by source
    const sourceCounts = {};

    jobs.forEach(job => {
        sourceCounts[job.source] = (sourceCounts[job.source] || 0) + 1;
    });

    console.table(sourceCounts);

    // Missing fields
    const invalid = jobs.filter(job =>
        !job.title ||
        !job.company ||
        !job.apply_url
    );

    console.log("Jobs with missing required fields:", invalid.length);

    if (invalid.length) {
        console.log("\nFirst few invalid jobs:");
        console.dir(invalid.slice(0, 5), { depth: null });
    }

    console.log("\n======================================\n");
}

module.exports = verifyJobs;