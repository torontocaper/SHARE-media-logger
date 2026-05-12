# MediaLogger

A tool for logging media hits to Salesforce. 

Developed by Adam Burns (torontocaper).

## Purpose

This app is used to log media hits for SHARE. Its current working form is a 'bookmarklet' -- a piece of Javascript code that the user adds to their browser as a bookmark. 

When the user then 'opens' that bookmarklet, the code executes on the currently open page. That causes a pop-up form to open:

![A screenshot of a web form with fields for article title, author, publisher and date publsihed](docs/26-05-12-screenshot-bookmarklet-form.png)

## Security notes

Don't publish unedited json exported from Zapier; it exposes the Salesforce API key.

Replace with `SALESFORCE_AUTH`. It's usually the last line in the json file.

Ditto the Zapier webhook URL; replace with `ZAPIER_WEBHOOK_URL` in both `bookmarklet.js` and `bookmarklet.txt`.

(It follows "action": in the "form" html component.)