function normalizeJob(job) {

    return {

        title:
            job.title || "Untitled Job",

        company:
            job.company ||
            job.company_name ||
            "Not specified",

        location:
            job.location ||
            job.candidate_required_location ||
            "Remote",

        salary:
            job.salary ||
            "Not specified",

        type:
            job.type ||
            job.job_type ||
            "Not specified",

        category:
            job.category ||
            "General",

        description:
            job.description ||
            "",

        tags:
            job.tags ||
            [],

        apply_url:
            job.apply_url ||
            job.url ||
            "",

        company_logo:
            job.company_logo ||
            job.company_logo_url ||
            "",

        source:
            job.source ||
            "Unknown",

        date_created:
            job.date_created ||
            job.publication_date ||
            new Date().toISOString()

    };

}

module.exports = normalizeJob;