const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

async function saveJobs(jobs) {
  const sourceCounts = {};
  jobs.forEach(job => {
    const source = job.source || "Unknown";
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });

  console.log("\n========== JOB SUMMARY ==========");
  console.table(sourceCounts);
  console.log("TOTAL JOBS:", jobs.length);
  console.log("================================");

  const filePath = path.join(__dirname, "../../jobs.json");
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
  console.log(`Saved ${jobs.length} jobs to jobs.json`);

  // ONLY FIRST 500 FOR NOW
  const jobsToSend = jobs.slice(0, 500);

  const jobsForApi = jobsToSend.map(job => ({
    ...job,
    externalId: job.id,
    id: crypto.randomUUID(),
  }));

  // Send in batches of 50
  try {
    console.log(`Sending ${jobsForApi.length} jobs to API in batches...`);
    const BATCH = 50;
    for (let i = 0; i < jobsForApi.length; i += BATCH) {
      const chunk = jobsForApi.slice(i, i + BATCH);
      console.log(`Sending batch ${i / BATCH + 1} - ${chunk.length} jobs...`);
      const res = await fetch("https://api.careernova.ng/api/jobs/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs: chunk })
      });
      console.log(`Batch ${i / BATCH + 1} API Response:`, res.status, await res.text());
    }
  } catch (err) {
    console.log("API send failed:", err.message);
  }
}

module.exports = saveJobs;