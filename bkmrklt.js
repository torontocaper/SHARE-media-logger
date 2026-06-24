javascript:window.open(`https://dev--share-media-logger.netlify.app/.netlify/functions/create_popup_form?article_name=${document.title}&link_to_article=${window.location.href}`,"media_hit_form","width=720,height=820,scrollbars=yes,resizable=yes");

/*
const ENVIRONMENT = "local"; // Options: "local", "dev", "prod"

const URLS = {
  local: "http://localhost:8888/.netlify/functions/create_popup_form",
  dev: "https://dev--share-media-logger.netlify.app/.netlify/functions/create_popup_form",
  prod: "https://share-media-logger.netlify.app/.netlify/functions/create_popup_form"
};

// If the environment variable is set to something unexpected, alert the user and throw an error.
if (!URLS[ENVIRONMENT]) {
  alert(`Invalid environment: ${ENVIRONMENT}`);
  throw new Error(`Invalid environment: ${ENVIRONMENT}`);
}

// Set function URL based on environment.
const POPUP_URL = URLS[ENVIRONMENT];

// This helper looks for a <meta> tag in the article html and returns its "content" value.
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
const popupUrl = `${POPUP_URL}?${params.toString()}`;


// Open the popup form.
window.open(
  popupUrl,
  "media_hit_form",
  "width=720,height=820,scrollbars=yes,resizable=yes"
);

*/