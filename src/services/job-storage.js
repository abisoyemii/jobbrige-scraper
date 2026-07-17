const fs = require("fs");
const path = require("path");

function saveJobs(jobs) {

    // ===== Job Summary =====
    const sourceCounts = {};

    jobs.forEach(job => {
        const source = job.source || "Unknown";
        sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    console.log("\n========== JOB SUMMARY ==========");
    console.table(sourceCounts);
    console.log("TOTAL JOBS:", jobs.length);
    console.log("=================================\n");

    const filePath = path.join(
        __dirname,
        "../../jobs.json"
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(jobs, null, 2)
    );

    console.log(
        `Saved ${jobs.length} jobs to jobs.json`
    );

}

module.exports = saveJobs;