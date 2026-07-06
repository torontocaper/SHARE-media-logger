const fs = require("fs");
const path = require("path");

exports.handler = async function (event) {
  const params = event.queryStringParameters || {};
  const article_name = params.article_name || "";
  const link_to_article = params.link_to_article || "";

  const templatePath = path.join(
    __dirname,
    "popup_form.html"
  );

  let html = fs.readFileSync(templatePath, "utf8");

  html = html.replaceAll("{{article_name}}", escapeHtml(article_name));
  html = html.replaceAll("{{link_to_article}}", escapeHtml(link_to_article));

  // Send the filled-in HTML page back to the browser.
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    },
    body: html
  };
};

// This prevents article text from accidentally breaking the HTML.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}