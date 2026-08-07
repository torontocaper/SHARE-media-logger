## User Guide for SHARE Media Logger

This guide is for SHARE staff and partners looking to use the Media Logger to add media 'hits' to SHARE's Salesforce database.

> NOTE: This guide is a work in progress and may not address all cases. For help using the app, please [reach out directly to Adam](mailto:aburns@share.ca).

### Step 1: Add the bookmarklet to your browser

This can be done in much the same way you add a regular **bookmark**. The difference is that, instead of entering a web address like `https://facebook.com` in the URL field, you'll enter a line of code starting with `javascript:`.

> TIP: For a detailed guide on how to do this in different browsers (e.g. Chrome, Firefox, Safari), check out the following article: 
> [What are Bookmarklets? How to Use JavaScript to Make a Bookmarklet in Chromium and Firefox](https://www.freecodecamp.org/news/what-are-bookmarklets/)

If you're interested in what else you can do with bookmarklets, there are plenty of resources out there. For now, all you need to do is copy the following (very long!) line of code and paste that into the URL field for a new bookmark[^1]:

```javascript
javascript:window.open(`NETLIFY_BASE_URL_DEV/create_popup_form?article_name=${document.title}&link_to_article=${window.location.href}`,"media_hit_form","width=720,height=820,scrollbars=yes,resizable=yes");
```

Give your bookmarklet a descriptive, memorable name like `Add media hit to Salesforce`, and keep it in a place where you'll easily be able to find it in the future, such as your main **Bookmarks** bar. 

### Step 2: Fill out the form

When you come across an article you'd like to add to Salesforce, click the **bookmarklet**. The code you pasted earlier will then execute on the currently open page, causing a form to pop up with some pre-filled information.

![A screenshot of a web form with fields for article title, author, publisher and date published](26-05-12-screenshot-bookmarklet-form.png)

Make sure that the pre-filled data in the form is accurate, and fill in any empty fields. 

> IMPORTANT: Please pay particular attention to the **Outlet** and **Author** fields; these have to match the corresponding entries in Salesforce in order for the 'zap' to execute properly.
>
> For example, 'Globe and Mail' will work; 'The Globe and Mail' will not.

### Step 3: Check Salesforce for your article

After you click the 'Send to Salesforce' button, the form will disappear. You can now close the pop-up window. 

In a new browser tab (keeping the original article open in its own tab), navigate to Salesforce. On the homepage, click the 'Media' heading. This will display a list of the latest media hits, sorted by publication date.

Look for your headline. If you don't see it immediately, give it a minute or two and refresh the list. If it's still not showing up, it's likely that you encountered one of the **known issues** listed below.

If your headline is there, congrats — and thank you! You've added a media hit to Salesforce, contributing to a valuable tool for SHARE to keep track of coverage and spread our message to new audiences.

### Step 4a (optional): Add additional details

Right now, the 'Media' object you created is pretty basic: it contains only the information from the form you submitted earlier.

This is extremely useful information, but what really allows us to tap into the **power of Salesforce** (shout-out Rosie) is by connecting the article to relevant people and organizations. 

To do this, click on your article headline. On the details page for your article, fill in whatever information you can. The most important fields are 'related organization', 'SHARE-related' and 'SHARE spokesperson', but anything else you can add would be helpful.

### Step 4b (optional): Upload a PDF of your article

This step is only important for articles from outlets that have a 'paywall'. If you have subscriber access, it's very helpful to 'print' a PDF of the article directly from the browser, and upload that file, either to Box or directly to the Media object on Salesforce.

[^1]: For security reasons, this code is missing some key information, which is available on Box. Message Adam on Teams for a link.