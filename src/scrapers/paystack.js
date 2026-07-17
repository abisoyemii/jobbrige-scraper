const fetchGreenhouseJobs = require("./greenhouse");

module.exports = async () =>
    fetchGreenhouseJobs(
        "Paystack",
        "paystack"
    );