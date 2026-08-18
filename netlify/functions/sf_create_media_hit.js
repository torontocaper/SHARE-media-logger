const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const sf_api_version = process.env.SF_API_VERSION;
const sf_instance_url = process.env.SF_INSTANCE_URL;
const { authenticate_salesforce } = require("./lib/authorize_salesforce_app");

exports.handler = async function (event) {
  console.log("Received event:", event);
  
  try {
    
    const sf_access_token = await authenticate_salesforce();
    
    const formData = querystring.parse(event.body);

    const article_name = formData.article_name || "";
    const publisher = formData.publisher || "";
    const author = formData.author || "";
    const date_of_article = formData.date_of_article || "";
    const link_to_article = formData.link_to_article || "";
    const submitted_by = formData.submitted_by || "";
    const notes = formData.notes || "";
    const is_share_related = formData.is_share_related === "true";
    const share_spokesperson = formData.share_spokesperson || "";
    const channel = formData.channel || "";
    const format = formData.format || "";
    // Handle topics as an array, even if only one topic is selected
    const topics = Array.isArray(formData.topics) ? formData.topics : [formData.topics].filter(Boolean);

    console.log("Topics: " + topics);

    const sf_api_path =
    `${sf_instance_url}/services/data/${sf_api_version}/sobjects/Media__c/`;

    const response = await fetch(sf_api_path, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sf_access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: article_name,
        Reporter__c: author,
        Link_to_article__c: link_to_article,
        Description_Notes__c: notes,
        Date_of_article__c: date_of_article,
        Media_Outlet_Organization__c: publisher,
        SHARE_related__c: is_share_related,
        SHARE_spokesperson__c: share_spokesperson,
        Submitted_By__c: submitted_by,
        Channel__c: channel,
        Format__c: format,
        Media_classification__c: topics.join(";") // Join multiple topics with a semicolon, if necessary
      })
    });

    const result = await response.json();

    console.log("Salesforce API response:", result);

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${result[0]?.message || 'Unknown error'}`);
    }

    const sf_id = result.id;
    const sf_url = `${sf_instance_url}/lightning/r/Media_Hit__c/${sf_id}/view`;

    // Load the success screen template.
    const templatePath = path.join(
      __dirname,
      "success_screen.html"
    );

    let html = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders in the HTML template.
    html = html
      .replaceAll("{{SF_LINK}}", escapeHtml(sf_url))

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: html,
    };
  } catch (error) {
    console.error("Error creating media hit:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: "Something went wrong while creating the media hit.",
    };
  }
};

// Basic escaping so submitted article data cannot accidentally break the HTML page.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}