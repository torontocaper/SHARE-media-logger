(function () {
  function getDate() {
    const m = document.querySelector(
      'meta[property="article:published_time"],meta[name="pubdate"],meta[name="date"]'
    );

    if (m?.content) return m.content;

    const t = document.querySelector('time[datetime]');
    if (t?.dateTime) return t.dateTime;

    const ld = document.querySelector('script[type="application/ld+json"]');

    if (ld) {
      try {
        const j = JSON.parse(ld.innerText);

        if (j.datePublished) return j.datePublished;

        if (Array.isArray(j["@graph"])) {
          const d = j["@graph"].find((n) => n.datePublished);
          if (d) return d.datePublished;
        }
      } catch (e) {}
    }

    return "";
  }

  const h =
    document.querySelector('meta[property="og:title"]')?.content ||
    document.title;

  const u = window.location.href;

  const oRaw =
    document.querySelector('meta[property="og:site_name"]')?.content ||
    window.location.hostname.replace(/^www\./, "");

  const o = oRaw.replace(/^the\s+/i, "");
  const d = getDate();

  const a = document.querySelector('meta[name="author"]')?.content || "";

  const w = window.open("", "", "width=550,height=600");

  w.document.write(`
<html>
<head>
  <title>Log Media Hit</title>
</head>
<body style="font-family:sans-serif;padding:20px;">
  <h3>Log Media Hit</h3>

  <p style="margin-bottom:1em;line-height:1.4;">
    This form feeds directly into <strong>Salesforce</strong>.
    Most of the fields below will auto-populate.<br><br>

    Please <strong>fill in any missing information</strong> and review all entries before submitting.<br><br>

    <strong>IMPORTANT:</strong> Match entries as closely as possible to how they appear in Salesforce
    (e.g., <em>"Responsible-Investor.com"</em> instead of <em>"Responsible Investor"</em>).
  </p>

  <form method="POST" action="ZAPIER_WEBHOOK_URL">
    <label title="Title of the article as extracted from the page">
      Headline:<br>
      <input name="headline" value="${h.slice(0, 80).replace(/"/g, "&quot;")}" style="width:100%" />
    </label>
    <br><br>

    <label title="Name of the media outlet or publisher">
      Outlet:<br>
      <input name="outlet" value="${o.replace(/"/g, "&quot;")}" style="width:100%" />
    </label>
    <br><br>

    <label title="Author name, if available in the page metadata">
      Author:<br>
      <input name="author" value="${a.replace(/"/g, "&quot;")}" style="width:100%" />
    </label>
    <br><br>

    <label title="Full URL of the article">
      URL:<br>
      <input name="url" value="${u.replace(/"/g, "&quot;")}" style="width:100%" />
    </label>
    <br><br>

    <label title="Date of publication, if detected">
      Publication Date:<br>
      <input name="publication_date" value="${d.replace(/"/g, "&quot;")}" style="width:100%" />
    </label>
    <br><br>

    <button type="submit">Send to Salesforce</button>
  </form>
</body>
</html>
`);
})();