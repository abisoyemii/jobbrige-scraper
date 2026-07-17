const fetchWorkable = require("../helpers/workable");

module.exports = async function () {

    const jobs = await fetchWorkable("kuda");

    return jobs.map(job => ({
        // normalize here
    }));

};