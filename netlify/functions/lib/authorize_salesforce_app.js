const sf_instance_url = process.env.SF_INSTANCE_URL;
//const sf_api_version = process.env.SF_API_VERSION;

async function authenticateSalesforce() {
  const sf_consumer_id = process.env.SF_CONSUMER_ID;
  const sf_consumer_secret = process.env.SF_CONSUMER_SECRET;

/*   if (!clientId || !clientSecret) {
    throw new Error(
      "Missing SF_CONSUMER_ID or SF_CONSUMER_SECRET."
    );
  } */

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
/*
  if (!response.ok) {
    console.error("Salesforce OAuth response:", result);

    throw new Error(
      result.error_description ||
      result.error ||
      "Salesforce authentication failed."
    );
  } */

  return result.access_token;
/*     instanceUrl: result.instance_url,
 */
}

/* async function salesforceFetch(path, options = {}) {
  const { accessToken, instanceUrl } =
    await authenticateSalesforce();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`${instanceUrl}${path}`, {
    ...options,
    headers,
  });
} */

module.exports = {
  apiVersion,
  authenticateSalesforce,
  //salesforceFetch,
};