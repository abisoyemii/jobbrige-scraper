const fetchRemoteOKJobs = require("./src/scrapers/remoteok");


async function test(){

    const jobs = await fetchRemoteOKJobs();

    console.log(jobs[0]);

}


test();