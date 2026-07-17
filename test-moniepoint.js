const axios = require("axios");

async function test() {
    try {
        const { data } = await axios.get(
            "https://boards-api.greenhouse.io/v1/boards/moniepoint/jobs?content=true"
        );

        console.log("Total jobs:", data.jobs.length);

        console.log(data.jobs[0]);

    } catch (err) {
        console.log(err.message);
    }
}

test();