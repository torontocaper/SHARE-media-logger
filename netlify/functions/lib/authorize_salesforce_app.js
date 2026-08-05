const loginUrl = process.env.SF_INSTANCE_URL;
const apiVersion = process.env.SF_API_VERSION;

async function authenticateSalesforce() {
  const clientId = process.env.SF_CONSUMER_ID;
  const clientSecret = process.env.SF_CONSUMER_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing SF_CONSUMER_ID or SF_CONSUMER_SECRET."
    );
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(
    `${loginUrl}/services/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Salesforce OAuth response:", result);

    throw new Error(
      result.error_description ||
      result.error ||
      "Salesforce authentication failed."
    );
  }

  return {
    accessToken: result.access_token,
    instanceUrl: result.instance_url,
  };
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
  salesforceFetch,
};