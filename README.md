# MediaLogger

A tool for logging media hits to Salesforce, developed by SHARE Communications Manager Adam Burns (aka @torontocaper).

## Purpose

This app is used to log media hits for SHARE. Its current working form is a **bookmarklet** — a piece of Javascript code that the user adds to their browser as a bookmark, then clicks to execute a particular action.

In this case, clicking the **bookmarklet** when the user has a news article open begins a flow of data from the user's browser, through a 'webhook' hosted by the automation platform [Zapier](https:zapier.com), and finally to [SHARE's Salesforce database](https://share.lightning.force.com/lightning/page/home)[^1], where the article is saved as a custom 'media' object, complete with information about the Author, Outlet and Publishing Date. 

## User Guide

> [!NOTE]
> This User Guide is a work-in-progress. For help using the app, please [contact Adam](mailto:aburns@share.ca) directly.

### Step 1: Add the bookmarklet to your browser

The first step is to add the **bookmarklet** to your browser. You can do this in much the same way you add a (regular) **bookmark**. The difference is that, instead of entering a 'regular' URL (e.g. https://facebook.com) in the URL field, you want to paste in a line of code starting with `javascript:`.

> [!TIP]
> 
> For a detailed guide on how to do this in different browsers (e.g. Chrome, Firefox, Safari), check out this article:
> 
> [What are Bookmarklets? How to Use JavaScript to Make a Bookmarklet in Chromium and Firefox](https://www.freecodecamp.org/news/what-are-bookmarklets/)

If you're interested in what else you can do with bookmarklets, there are plenty of resources out there. For now, all you need to do is copy the following line of code (it's very long!), and paste that into the URL field for a new bookmark[^2]:

```js
javascript:(function(){function getDate(){const m=document.querySelector('meta[property="article:published_time"],meta[name="pubdate"],meta[name="date"]');if(m?.content)return%20m.content;const%20t=document.querySelector(%27time[datetime]%27);if(t?.dateTime)return%20t.dateTime;const%20ld=document.querySelector(%27script[type=%22application/ld+json%22]%27);if(ld){try{const%20j=JSON.parse(ld.innerText);if(j.datePublished)return%20j.datePublished;if(Array.isArray(j[%27@graph%27])){const%20d=j[%27@graph%27].find(n=%3En.datePublished);if(d)return%20d.datePublished}}catch(e){}}return%22%22}const%20h=document.querySelector(%27meta[property=%22og:title%22]%27)?.content||document.title;const%20u=window.location.href;const%20oRaw=document.querySelector(%27meta[property=%22og:site_name%22]%27)?.content||window.location.hostname.replace(/^www\./,%27%27);const%20o=oRaw.replace(/^the\s+/i,%27%27);const%20d=getDate();const%20a=document.querySelector(%27meta[name=%22author%22]%27)?.content||%27%27;const%20w=window.open(%27%27,%27%27,%27width=550,height=600%27);w.document.write(`%3Chtml%3E%3Chead%3E%3Ctitle%3ELog%20Media%20Hit%3C/title%3E%3C/head%3E%3Cbody%20style=%22font-family:sans-serif;padding:20px;%22%3E%3Ch3%3ELog%20Media%20Hit%3C/h3%3E%3Cp%20style=%22margin-bottom:1em;line-height:1.4;%22%3EThis%20form%20feeds%20directly%20into%20%3Cstrong%3ESalesforce%3C/strong%3E.%20Most%20of%20the%20fields%20below%20will%20auto-populate.%3Cbr%3E%3Cbr%3EPlease%20%3Cstrong%3Efill%20in%20any%20missing%20information%3C/strong%3E%20and%20review%20all%20entries%20before%20submitting.%3Cbr%3E%3Cbr%3E%3Cstrong%3EIMPORTANT:%3C/strong%3E%20Match%20entries%20as%20closely%20as%20possible%20to%20how%20they%20appear%20in%20Salesforce%20(e.g.,%20%3Cem%3E%22Responsible-Investor.com%22%3C/em%3E%20instead%20of%20%3Cem%3E%22Responsible%20Investor%22%3C/em%3E).%3C/p%3E%3Cform%20method=%22POST%22%20action=%22{{ZAPIER_WEBHOOK_URL}}%22%3E%3Clabel%20title=%22Title%20of%20the%20article%20as%20extracted%20from%20the%20page%22%3EHeadline:%3Cbr%3E%3Cinput%20name=%22headline%22%20value=%22${h.slice(0,80).replace(/%22/g,%27&quot;%27)}%22%20style=%22width:100%%22%20/%3E%3C/label%3E%3Cbr%3E%3Cbr%3E%3Clabel%20title=%22Name%20of%20the%20media%20outlet%20or%20publisher%22%3EOutlet:%3Cbr%3E%3Cinput%20name=%22outlet%22%20value=%22${o.replace(/%22/g,%27&quot;%27)}%22%20style=%22width:100%%22%20/%3E%3C/label%3E%3Cbr%3E%3Cbr%3E%3Clabel%20title=%22Author%20name,%20if%20available%20in%20the%20page%20metadata%22%3EAuthor:%3Cbr%3E%3Cinput%20name=%22author%22%20value=%22${a.replace(/%22/g,%27&quot;%27)}%22%20style=%22width:100%%22%20/%3E%3C/label%3E%3Cbr%3E%3Cbr%3E%3Clabel%20title=%22Full%20URL%20of%20the%20article%22%3EURL:%3Cbr%3E%3Cinput%20name=%22url%22%20value=%22${u.replace(/%22/g,%27&quot;%27)}%22%20style=%22width:100%%22%20/%3E%3C/label%3E%3Cbr%3E%3Cbr%3E%3Clabel%20title=%22Date%20of%20publication,%20if%20detected%22%3EPublication%20Date:%3Cbr%3E%3Cinput%20name=%22publication_date%22%20value=%22${d.replace(/%22/g,%27&quot;%27)}%22%20style=%22width:100%%22%20/%3E%3C/label%3E%3Cbr%3E%3Cbr%3E%3Cbutton%20type=%22submit%22%3ESend%20to%20Salesforce%3C/button%3E%3C/form%3E%3C/body%3E%3C/html%3E`);})();
```

Give your bookmarklet a descriptive, memorable name like `Add media hit to Salesforce`, and keep it in a place where you'll easily be able to find it in the future, such as your main **Bookmarks** bar. 

### Step 2: Fill out the form

When the user opens (clicks) the bookmarklet, the code executes on the currently open page, causing a form to pop up:

![A screenshot of a web form with fields for article title, author, publisher and date publsihed](docs/26-05-12-screenshot-bookmarklet-form.png)

The user then checks that the pre-filled data in the form is accurate -- particularly that the entries for "Outlet" and "Author" match the corresponding entries in Salesforce (*e.g. 'Globe and Mail' instead of 'The Globe and Mail'*) 

## Known issues

### Difficulty debugging
Because of the nature of the `bookmarklet -> webhook -> Zapier -> Salesforce` data-flow, it's difficult for developers — let alone users! — to know whether logging was successful, and if not, what went wrong.

### Only existing authors/outlets allowed

If the author of the article or the outlet isn't found in Salesforce, the 'zap' will fail without alerting the user. 

## Roadmap

I hope to eventually turn this into a standalone 'web app' or browser extension, to limit the amount of potential points of failure

## Security notes

Don't publish unedited json exported from Zapier; it exposes the Salesforce API key.

Replace with `SALESFORCE_AUTH`. It's usually the last line in the json file.

Ditto the Zapier webhook URL; replace with `ZAPIER_WEBHOOK_URL` in both `bookmarklet.js` and `bookmarklet.txt`.

(It follows "action": in the "form" html component.)

[^1]: Internal link, accessible only to SHARE staff
[^2]: For security reasons, this code is missing a key piece of information; [contact Adam](mailto:aburns@share.ca) to get the working version.