function removeDuplicates(jobs) {

    const uniqueJobs = [];

    const seen = new Set();


    for (const job of jobs) {

        const key = `${job.source}-${job.title}-${job.company}`;


        if (!seen.has(key)) {

            seen.add(key);

            uniqueJobs.push(job);
        }

    }


    return uniqueJobs;

}


module.exports = removeDuplicates;