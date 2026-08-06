const sf_instance_url = process.env.SF_INSTANCE_URL;
//const sf_api_version = process.env.SF_API_VERSION;

async function authenticate_salesforce() {
  const sf_consumer_id = process.env.SF_CONSUMER_ID;
  const sf_consumer_secret = process.env.SF_CONSUMER_SECRET;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: sf_consumer_id,
    client_secret: sf_consumer_secret,
  });

  const response = await fetch(
    `${sf_instance_url}/services/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const result = await response.json();
  console.log("Salesforce OAuth response:", result);

  return result.access_token;

}

module.exports = {
  authenticate_salesforce,
};