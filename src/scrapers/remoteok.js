const axios = require("axios");


async function fetchRemoteOKJobs() {

    try {

        const response = await axios.get(
            "https://remoteok.com/api",
            {
                headers: {
                    "User-Agent": "JobBridge-Scraper/1.0"
                }
            }
        );


        const jobs = response.data.slice(1);


        console.log(
            `Fetched ${jobs.length} jobs from RemoteOK`
        );


        return jobs.map(job => ({

            title: job.position,

            company: job.company,

            location:
                job.location || "Remote",

            salary:
                job.salary || "Not specified",

            type:
                "remote",

            description:
                job.description,

            tags:
                job.tags || [],

            apply_url:
                job.url,

            company_logo:
                job.company_logo,

            source:
                "RemoteOK",

            date_created:
                job.date

        }));


    } catch(error) {

        console.error(
            "RemoteOK Error:",
            error.message
        );


        return [];

    }

}


module.exports = fetchRemoteOKJobs;