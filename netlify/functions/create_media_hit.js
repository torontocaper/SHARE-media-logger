const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

exports.handler = async function (event) {
  try {
    // Only allow POST requests.
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "text/plain" },
        body: "Method Not Allowed",
      };
    }

    // The form may submit as application/x-www-form-urlencoded.
    // This converts headline=...&publisher=... into a normal JS object.
    const formData = querystring.parse(event.body);

    const headline = formData.article_name || "";
    const publisher = formData.publisher || "";
    const author = formData.author || "";
    const datePublished = formData.date_published || "";
    const articleUrl = formData.link_to_article || "";

    // Eventually, this is where the Salesforce API call will happen.
    // For now, use a dummy Salesforce object ID and URL.
    const dummySalesforceId = "a00ABC123456789";
    const dummySalesforceUrl = `https://share.lightning.force.com/lightning/r/Media_Hit__c/${dummySalesforceId}/view`;

    // Load the success screen template.
    const templatePath = path.join(
      __dirname,
      "success_screen.html"
    );

    let html = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders in the HTML template.
    html = html
      .replaceAll("{{HEADLINE}}", escapeHtml(headline))
      .replaceAll("{{PUBLISHER}}", escapeHtml(publisher))
      .replaceAll("{{AUTHOR}}", escapeHtml(author))
      .replaceAll("{{DATE_PUBLISHED}}", escapeHtml(datePublished))
      .replaceAll("{{ARTICLE_URL}}", escapeHtml(articleUrl))
      .replaceAll("{{SALESFORCE_URL}}", escapeHtml(dummySalesforceUrl))
      .replaceAll("{{SALESFORCE_ID}}", escapeHtml(dummySalesforceId));

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



/* exports.handler = async function (event) {
  try {
    const formData = new URLSearchParams(event.body);

    const data = {
      headline: formData.get("headline"),
      outlet: formData.get("outlet"),
      author: formData.get("author"),
      url: formData.get("url"),
      publication_date: formData.get("publication_date"),
    };

    console.log("Received new form data:", data);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: `
        <html>
          <body style="font-family:sans-serif;padding:20px;">
            <h2>Success</h2>
            <p><strong>${data.headline || "Media hit"}</strong> was received.</p>
            <p>You can now close this window.</p>
          </body>
        </html>
      `,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: `
        <html>
          <body style="font-family:sans-serif;padding:20px;">
            <h2>Error</h2>
            <p>${err.message}</p>
          </body>
        </html>
      `,
    };
  }
}; */