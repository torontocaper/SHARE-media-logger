const {
  authenticateSalesforce,
} = require("./lib/authorize_salesforce_app");

exports.handler = async function () {
  try {
    const { accessToken, instanceUrl } =
      await authenticateSalesforce();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        instanceUrl,
        tokenReceived: Boolean(accessToken),
      }),
    };
  } catch (error) {
    console.error("Salesforce authentication test failed:", error);

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
  }
};