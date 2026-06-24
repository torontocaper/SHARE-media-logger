// This is a Netlify Function.
//
// Its job is:
// 1. Receive article data from bookmarklet.js.
// 2. Load the popup_form.html template.
// 3. Insert the article data into the form.
// 4. Return the finished HTML page.

const fs = require("fs");
const path = require("path");


// This is the main function that runs when someone visits {site-url}/.netlify/functions/create_popup_form
exports.handler = async function (event) {
  // The bookmarklet sends article data within the URL query string. (e.g. ?headline=Test&publisher=Daily+Planet)
  // Netlify gives us those values here:
  const article_name = event.article_name || "";
  const link_to_article = event.link_to_article || "";
  //const params = event.queryStringParameters || {};


  // Pull each field out of the query string.
  //
  // If a field is missing, use an empty string instead.
/*   const headline = params.headline || "";
  const publisher = params.publisher || "";
  const author = params.author || "";
  const date_published = params.date_published || ""; */


  // Load the popup form HTML file (from netlify/functions directory)
  const templatePath = path.join(
    __dirname,
    "popup_form.html"
  );

  let html = fs.readFileSync(templatePath, "utf8");


  // Replace placeholders in the HTML file with real values.
  html = html.replaceAll("{{article_name}}", escapeHtml(article_name));
/*   html = html.replaceAll("{{publisher}}", escapeHtml(publisher));
  html = html.replaceAll("{{author}}", escapeHtml(author));
  html = html.replaceAll("{{date_published}}", escapeHtml(formatDateForInput(date_published))); */
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