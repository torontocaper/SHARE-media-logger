const {
  apiVersion,
  authenticateSalesforce,
} = require("./lib/authorize_salesforce_app");

exports.handler = async function () {
  const { accessToken, instanceUrl } =
    await authenticateSalesforce();

  const query = `
    SELECT Id, Name
    FROM Account
    WHERE Category__c = 'Media'
    ORDER BY Name
  `.replace(/\s+/g, " ").trim();

  const path =
    `/services/data/${apiVersion}/query` +
    `?q=${encodeURIComponent(query)}`;

  const response = await fetch(`${instanceUrl}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
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
    }

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