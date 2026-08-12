## User Guide for SHARE Media Logger

This guide is for SHARE staff and partners looking to use the Media Logger to add media 'hits' to SHARE's Salesforce database.

Please note: This guide is a work in progress and may not address all cases. For help using the app, please reach out directly to Adam.

### Step 1: Add the 'bookmarklet' to your browser

This can be done in much the same way you would add a regular bookmark/favourite to your browser. 

The key difference is that, instead of entering a web address (like `https://share.ca`) in the URL field, you'll enter a line of `code`, starting with `javascript:`.

Specifically, *this* line of code[^1]:

```js
javascript:window.open(`${NETLIFY_BASE_URL}/create_popup_form?article_name=${document.title}&link_to_article=${window.location.href}`,"media_logger_form","popup=true");
```

For a detailed guide on how to do this in different browsers (e.g. Chrome, Firefox, Safari), check out the following article:

[What are Bookmarklets? How to Use JavaScript to Make a Bookmarklet in Chromium and Firefox](https://www.freecodecamp.org/news/what-are-bookmarklets/)

Give your bookmarklet a descriptive, memorable name (like `Add media hit to Salesforce`), and keep it in a place where you'll easily be able to find it in the future, such as your main "bookmarks" bar. 

### Step 2: Fill out the form

When you come across an article you'd like to add to Salesforce, click on the bookmarklet you just created.

This will execute the code you pasted earlier, creating a popup form with some pre-filled information.

Make sure that the pre-filled data is accurate, and fill in as many of the empty fields as you can.

### Step 3: Check Salesforce for your article

After you click the `Submit` button, you should receive a success message that includes a link to the newly created "Media" object in Salesforce.

Click the link to confirm your media hit was added, and to add more details if you have them. 

That's it! 

### Step 4 (optional): Upload a PDF of your article

This step is only important for articles from outlets that have a 'paywall'.

In that case, it's very helpful to 'print' a PDF of the article directly from the browser, and upload that file, either to Box or directly to the Media object on Salesforce. (This functionality does not yet exist in the Media Logger app.)

[^1]: For security reasons, this code is missing some key information. The "unredacted" code is available in the [Box version of this document](https://shareca.box.com/s/ql3c0u8q233w40odwp1w1vjmp24aflxn).