const axios = require("axios");
const cheerio = require("cheerio");


async function fetchMyJobMagJobs() {

    try {


        const response = await axios.get(
            "https://www.myjobmag.com/jobs",
            {
                headers: {
                    "User-Agent":
                    "Mozilla/5.0"
                }
            }
        );



        const $ = cheerio.load(response.data);



        const jobs = [];



        $("h2 a").each((index, element) => {


            const title = $(element)
                .text()
                .trim();



            const link = $(element)
                .attr("href");



            if(
                title &&
                link &&
                link.includes("/job/")
            ) {


                let company = "Not specified";


                if(title.includes(" at ")) {

                    company =
                    title.split(" at ")[1];

                }



                jobs.push({

                    title:
                    title.split(" at ")[0],


                    company,


                    location:
                    "Nigeria",


                    salary:
                    "Not specified",


                    type:
                    "Full Time",


                    category:
                    "General",


                    description:
                    "",


                    apply_url:
                    "https://www.myjobmag.com" + link,


                    source:
                    "MyJobMag",


                    date_created:
                    new Date().toISOString()

                });


            }


        });



        console.log(
            `Fetched ${jobs.length} jobs from MyJobMag`
        );


        return jobs;



    } catch(error) {


        console.log(
            "MyJobMag Error:",
            error.message
        );


        return [];

    }

}



module.exports = fetchMyJobMagJobs;