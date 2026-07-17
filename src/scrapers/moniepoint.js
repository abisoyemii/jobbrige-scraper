const fetchGreenhouse = require("../helpers/greenhouse");
const { decode } = require("html-entities");

module.exports = async function fetchMoniepointJobs() {
    const jobs = await fetchGreenhouse("moniepoint");

    const results = jobs.map(job => ({
        title: job.title || "No Title",
        company: job.company_name || "Moniepoint",
        location: job.location?.name || "Nigeria",
        salary: "Not specified",
        type: "Full Time",
        category: "",
        description: decode(job.content || "")
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim(),
        apply_url: job.absolute_url,
        company_logo: "",
        source: "Moniepoint",
        date_created: job.updated_at || job.first_published || new Date().toISOString()
    }));

    console.log(`Fetched ${results.length} jobs from Moniepoint`);

    return results;
};