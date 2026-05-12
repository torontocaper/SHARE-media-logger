# MediaLogger

A tool for logging media hits to Salesforce, developed by SHARE Communications Manager Adam Burns (aka @torontocaper).

## Purpose

This app is used to log media hits for SHARE. Its current working form is a **bookmarklet** -- a piece of Javascript code that the user adds to their browser as a bookmark.

That then triggers a complex flow of data from the user's browser to a 'webhook' hosted by the automation platform [Zapier](https:zapier.com), then onward to [SHARE's Salesforce database](https://share.lightning.force.com/lightning/page/home)[^1], where it lives as a custom 'media' object.

## User guide



When the user then opens that bookmarklet, the code executes on the currently open page. That causes a pop-up form to open:

![A screenshot of a web form with fields for article title, author, publisher and date publsihed](docs/26-05-12-screenshot-bookmarklet-form.png)

The user then checks that the pre-filled data in the form is accurate -- particularly that the entries for "Outlet" and "Author" are 

## Known issues

### Difficulty debugging
Because of the nature of the `bookmarklet -> webhook -> Zapier -> Salesforce` data-flow, it's difficult for developers, let alone users, to know whether logging was successful, and if not, what went wrong.

### 

## Roadmap

I hope to eventually turn this into a standalone 'web app' or browser extension, to limit the amount of potential points of failure

## Security notes

Don't publish unedited json exported from Zapier; it exposes the Salesforce API key.

Replace with `SALESFORCE_AUTH`. It's usually the last line in the json file.

Ditto the Zapier webhook URL; replace with `ZAPIER_WEBHOOK_URL` in both `bookmarklet.js` and `bookmarklet.txt`.

(It follows "action": in the "form" html component.)

[^1] Internal link, accessible only to SHARE staff