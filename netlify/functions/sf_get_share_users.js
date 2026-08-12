const sf_api_version = process.env.SF_API_VERSION;
const sf_instance_url = process.env.SF_INSTANCE_URL;
const { authenticate_salesforce } = require("./lib/authorize_salesforce_app");

exports.handler = async function () {
  const sf_access_token = await authenticate_salesforce();

  const sf_query = `
    SELECT Id, Name
    FROM User
    WHERE IsActive = true
    ORDER BY Name
  `.replace(/\s+/g, " ").trim();

  const path =
    `/services/data/${sf_api_version}/query` +
    `?q=${encodeURIComponent(sf_query)}`;

    const response = await fetch(`${sf_instance_url}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sf_access_token}`,
    },
  });

  const result = await response.json();

  console.log("result from get_share_users.js:", result);

  const records = result.records.map(
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
        records,
      }),
    };
  }