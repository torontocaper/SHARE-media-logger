
const fs = require("fs");
const path = require("path");


exports.handler = async function (event) {
  console.log("Someone used the bookmarklet. Event data: " + event.body);
  const article_name = event.article_name || "";
  console.log("Article Name: " + article_name);
  const link_to_article = event.link_to_article || "";
  console.log("Link to Article: " + link_to_article);

  console.log("Loading popup_form.html template...");
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


// Convert date strings into something the HTML date input can understand.
function formatDateForInput(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}