const axios = require("axios");

async function fetchAshby(company) {
    try {
        const { data } = await axios.post(
            "https://jobs.ashbyhq.com/api/non-user-graphql",
            {
                operationName: "ApiJobBoardWithTeams",
                variables: {
                    organizationHostedJobsPageName: company
                },
                query: `
                    query ApiJobBoardWithTeams($organizationHostedJobsPageName: String!) {
                      jobBoard(
                        organizationHostedJobsPageName: $organizationHostedJobsPageName
                      ) {
                        jobPostings {
                          id
                          title
                          employmentType
                          locationName
                        }
                      }
                    }
                `
            },
            {
                timeout: 20000
            }
        );

        return data.data.jobBoard.jobPostings || [];
    } catch (err) {
        console.error(`Ashby (${company}) failed:`, err.message);
        return [];
    }
}

module.exports = fetchAshby;