const sf_api_version = process.env.SF_API_VERSION;
const sf_instance_url = process.env.SF_INSTANCE_URL;
const { authenticate_salesforce } = require("./lib/authorize_salesforce_app");

exports.handler = async function () {
  const sf_access_token = await authenticate_salesforce();
  console.log("Salesforce access token:", sf_access_token);
  const sf_query = `
    SELECT Id, Name
    FROM Account
    WHERE Category__c = 'Media'
    ORDER BY Name
  `.replace(/\s+/g, " ").trim();
  console.log("Salesforce query:", sf_query);
  const path =
    `/services/data/${sf_api_version}/query` +
    `?q=${encodeURIComponent(sf_query)}`;
  console.log("Salesforce query path:", path);
  const response = await fetch(`${sf_instance_url}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sf_access_token}`,
    },
  });
  console.log("Salesforce query response status:", response.status);
  const result = await response.json();
  console.log("Salesforce query response:", result);
/*   if (!response.ok) {
    console.error("Salesforce query failed:", result);
      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: false,
          error: result,
        }),
      };
    } */

  const outlets = result.records.map(
      ({ Id, Name }) => ({
        id: Id,
        name: Name,
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        outlets,
      }),
    };
  }
  /* catch (error) {
    console.error("Media outlet lookup failed:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  };
}; */