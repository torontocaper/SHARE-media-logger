// netlify/functions/create_popup_form.js

// This is a Netlify Function.
//
// Its job is:
// 1. Receive article data from the bookmarklet.
// 2. Load the HTML form template.
// 3. Insert the article data into the form.
// 4. Return the finished HTML page.

const fs = require("fs");
const path = require("path");


// Netlify looks for this "handler" function.
// This is the main function that runs when someone visits:
//
// /.netlify/functions/create_popup_form
exports.handler = async function (event) {
  // The bookmarklet sends data in the URL query string.
  //
  // Example:
  // ?headline=Test&publisher=Daily+Planet
  //
  // Netlify gives us those values here:
  const params = event.queryStringParameters || {};


  // Pull each field out of the query string.
  //
  // If a field is missing, use an empty string instead.
  const headline = params.headline || "";
  const publisher = params.publisher || "";
  const author = params.author || "";
  const date_published = params.date_published || "";
  const source_url = params.source_url || "";


  // Load the popup form HTML file.
  //
  // This assumes the file lives at:
  // netlify/popup_form.html
  const templatePath = path.join(
    process.cwd(),
    "netlify",
    "popup_form.html"
  );

  let html = fs.readFileSync(templatePath, "utf8");


  // Replace placeholders in the HTML file with real values.
  //
  // Example:
  // {{headline}}
  //
  // becomes:
  // Responsible investment gains ground in Metropolis
  html = html.replaceAll("{{headline}}", escapeHtml(headline));
  html = html.replaceAll("{{publisher}}", escapeHtml(publisher));
  html = html.replaceAll("{{author}}", escapeHtml(author));
  html = html.replaceAll("{{date_published}}", escapeHtml(formatDateForInput(date_published)));
  html = html.replaceAll("{{source_url}}", escapeHtml(source_url));


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
//
// For example, if a headline contained a quotation mark,
// this makes sure it is safe to put inside an <input value="">.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// HTML date inputs want dates in this format:
//
// YYYY-MM-DD
//
// But article metadata may come in as:
//
// 2026-06-04T10:30:00Z
//
// This function converts it.
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