# SHARE Media Logger

The SHARE Media Logger (SML) is a tool for logging media hits to Salesforce.

It was developed by SHARE Communications Manager Adam Burns (aka @torontocaper).

This app is meant to be used internally by staff at [SHARE](https://share.ca), the Shareholder Association for Research and Education, to log news articles and other media hits that are relevant to the organization.

**NOTE: This "README" file is primarily aimed at developers. If you're a SHARE staffer looking to *use* the app, please check out the [user guide](USER_GUIDE.md) or contact Adam directly.**

## Workflow

### Step 1 -- Bookmarklet

The app is triggered using a "bookmarklet" ([bkmrklt.js](../bkmrklt.js))-- a piece of javascript code that acts on the user's current browser tab (in this case, a media article).



The immediate effect 