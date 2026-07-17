const fetchRemotiveJobs = require("../scrapers/remotive");
const fetchRemoteOKJobs = require("../scrapers/remoteok");
const fetchMyJobMagJobs = require("../scrapers/myjobmag");
const fetchJobbermanJobs = require("../scrapers/jobberman");
const fetchHotNigerianJobs = require("../scrapers/hotnigerianjobs");
const fetchMoniepointJobs = require("../scrapers/moniepoint");
const fetchKudaJobs = require("../scrapers/kuda");

async function runScrapers() {

    const results = [];

    // Remotive
    console.time("Remotive");
    const remotive = await fetchRemotiveJobs();
    console.timeEnd("Remotive");
    results.push(...remotive);

    // RemoteOK
    console.time("RemoteOK");
    const remoteok = await fetchRemoteOKJobs();
    console.timeEnd("RemoteOK");
    results.push(...remoteok);

    // MyJobMag
    console.time("MyJobMag");
    const myjobmag = await fetchMyJobMagJobs();
    console.timeEnd("MyJobMag");
    results.push(...myjobmag);

    // Jobberman
    console.time("Jobberman");
    const jobberman = await fetchJobbermanJobs();
    console.timeEnd("Jobberman");
    results.push(...jobberman);

    // Hot Nigerian Jobs
    console.time("Hot Nigerian Jobs");
    const hotnigerianjobs = await fetchHotNigerianJobs();
    console.timeEnd("Hot Nigerian Jobs");
    results.push(...hotnigerianjobs);

    // Moniepoint
    console.time("Moniepoint");
    const moniepoint = await fetchMoniepointJobs();
    console.timeEnd("Moniepoint");
    results.push(...moniepoint);

    // Kuda
    console.time("Kuda");
    const kuda = await fetchKudaJobs();
    console.timeEnd("Kuda");
    results.push(...kuda);

    console.log(
        "TOTAL BEFORE NORMALIZATION:",
        results.length
    );

    return results;
}

module.exports = runScrapers;