# MediaLogger
A tool for logging media hits to Salesforce. 
Developed by Adam Burns (torontocaper).
## Security notes
Don't publish unedited json exported from Zapier; it exposes the Salesforce API key.
Replace with `SALESFORCE_AUTH`. It's usually the last line in the json file.
Ditto the Zapier webhook URL; replace with `ZAPIER_WEBHOOK_URL` in both `bookmarklet.js` and `bookmarklet.txt`.
(It follows "action": in the "form" html component.)