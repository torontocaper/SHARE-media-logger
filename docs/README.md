# SHARE Media Logger

A tool for logging media hits to Salesforce, developed by SHARE Communications Manager Adam Burns (aka @torontocaper).

This app is meant to be used internally by staff at [SHARE](https://share.ca), the Shareholder Association for Research and Education, to log news articles and other media hits that are relevant to the organization.

Its current working form involves three separate components:

1. A **bookmarklet** — a piece of Javascript code that the user adds to their browser as a bookmark, then clicks to execute a particular action. In this case, the **bookmarklet** creates and pre-fills a simple web form with basic information from the article (Headline, Author, Outlet, Publication Date and URL).
2. A **zap** — an automation created with [Zapier](https:zapier.com), an online platform for connecting different apps and websites. The **zap** takes in the information from the web form and sends it to Salesforce.
![A screenshot of the 'zap' workflow, showing the steps from the form submission to creating a record in Salesforce](26-05-12-screenshot-zap-v5.png)
3. Finally, a **custom 'Media' object** in [SHARE's Salesforce database](https://share.lightning.force.com/lightning/page/home)[^1] that contains both the pre-filled information from the bookmarklet (Author, Outlet and Publication Date), and optionally additional relevant details such as topics, related organizations and whether SHARE was quoted directly.

If you're a SHARE staffer looking to use the app, please check out the [user guide](USER_GUIDE.md).

## Known issues

### Difficulty debugging

Because of the nature of the `bookmarklet -> webhook -> Zapier -> Salesforce` data-flow, it's difficult for developers — let alone users! — to know whether logging was successful, and if not, what went wrong.

### Only existing authors/outlets allowed

If the author of the article or the outlet isn't found in Salesforce, the 'zap' will fail without alerting the user. 

## Roadmap

I hope to eventually turn this into a standalone 'web app' or browser extension, to limit the amount of potential points of failure.

## Security notes

Don't publish unedited json exported from Zapier; it exposes the Salesforce API key.

Replace with `SALESFORCE_AUTH`. It's usually the last line in the json file.

Ditto the Zapier webhook URL; replace with `ZAPIER_WEBHOOK_URL` in both `bookmarklet.js` and `bookmarklet.txt`.

(It follows "action": in the "form" html component.)

[^1]: Internal link, accessible only to SHARE staff