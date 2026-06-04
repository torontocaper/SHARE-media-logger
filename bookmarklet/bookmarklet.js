// bookmarklet.js

// This file runs inside whatever article page the user is reading.
//
// Its job is deliberately simple:
// 1. Look for basic article information on the page.
// 2. Put that information into URL parameters.
// 3. Open your Netlify function in a popup window.

// Change this when you deploy.
// For local testing with `netlify dev`, keep this as localhost.
const NETLIFY_BASE_URL = "http://localhost:8888";

// Netlify functions live at this path by default.
const FUNCTION_URL = `${NETLIFY_BASE_URL}/.netlify/functions/create_popup_form`;


// This helper looks for a <meta> tag and returns its "content" value.
//
// Example:
// <meta property="og:title" content="My headline">
//
// getMeta('meta[property="og:title"]')
// would return:
// "My headline"
function getMeta(selector) {
  const tag = document.querySelector(selector);

  if (!tag) {
    return "";
  }

  return tag.getAttribute("content") || "";
}


// Try to find the headline.
//
// First choice: Open Graph title.
// Second choice: Twitter title.
// Third choice: the first <h1> on the page.
// Last choice: the browser tab title.
const headline =
  getMeta('meta[property="og:title"]') ||
  getMeta('meta[name="twitter:title"]') ||
  document.querySelector("h1")?.textContent ||
  document.title ||
  "";


// Try to find the publisher / outlet.
//
// First choice: Open Graph site name.
// Last choice: the website domain.
const publisher =
  getMeta('meta[property="og:site_name"]') ||
  window.location.hostname.replace("www.", "") ||
  "";


// Try to find the author.
//
// Lots of sites use <meta name="author">.
// Some sites may use article:author.
const author =
  getMeta('meta[name="author"]') ||
  getMeta('meta[property="article:author"]') ||
  "";


// Try to find the publication date.
//
// Open Graph/article metadata often uses article:published_time.
const date_published =
  getMeta('meta[property="article:published_time"]') ||
  getMeta('meta[name="date"]') ||
  "";


// Always include the current page URL.
const source_url = window.location.href;


// URLSearchParams turns the article data into a query string.
//
// Example:
// headline=Test&publisher=Daily+Planet&author=Clark+Kent
const params = new URLSearchParams();

params.set("headline", headline.trim());
params.set("publisher", publisher.trim());
params.set("author", author.trim());
params.set("date_published", date_published.trim());
params.set("source_url", source_url.trim());


// Build the full popup URL.
const popupUrl = `${FUNCTION_URL}?${params.toString()}`;


// Open the popup form.
window.open(
  popupUrl,
  "media_hit_form",
  "width=720,height=820,scrollbars=yes,resizable=yes"
);