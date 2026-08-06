const sf_api_version = process.env.SF_API_VERSION;
const sf_instance_url = process.env.SF_INSTANCE_URL;
const { authenticateSalesforce } = require("./lib/authorize_salesforce_app");

exports.handler = async function () {
  const sf_access_token = await authenticateSalesforce();

  const sf_query = `
    SELECT Id, Name
    FROM Account
    WHERE Category__c = 'Media'
    ORDER BY Name
  `.replace(/\s+/g, " ").trim();

  const path =
    `/services/data/${sf_api_version}/sf_query` +
    `?q=${encodeURIComponent(sf_query)}`;

  const response = await fetch(`${sf_instance_url}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sf_access_token}`,
    },
  });

  const result = await response.json();

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