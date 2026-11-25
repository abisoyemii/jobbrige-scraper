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

  // Keep the file backup
  const filePath = path.join(__dirname, "../../jobs.json");
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
  console.log(`Saved ${jobs.length} jobs to jobs.json`);

  // NEW: Fix IDs to UUIDs for API
  const jobsForApi = jobs.map(job => ({
    ...job,
    externalId: job.id, // keep original id
    id: crypto.randomUUID(), // backend wants UUID
  }));

  // Send to live site API
  try {
    console.log("Sending jobs to API...");
    const res = await fetch("https://api.careernova.ng/api/jobs/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobs: jobsForApi })
    });
    console.log("API Response:", res.status, await res.text());
  } catch (err) {
    console.log("API send failed:", err.message);
  }
}

module.exports = saveJobs;