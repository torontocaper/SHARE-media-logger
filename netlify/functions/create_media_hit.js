exports.handler = async function (event) {
  try {
    const formData = new URLSearchParams(event.body);

    const data = {
      headline: formData.get("headline"),
      outlet: formData.get("outlet"),
      author: formData.get("author"),
      url: formData.get("url"),
      publication_date: formData.get("publication_date"),
    };

    console.log("Received new form data:", data);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: `
        <html>
          <body style="font-family:sans-serif;padding:20px;">
            <h2>Success</h2>
            <p><strong>${data.headline || "Media hit"}</strong> was received.</p>
            <p>You can now close this window.</p>
          </body>
        </html>
      `,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: `
        <html>
          <body style="font-family:sans-serif;padding:20px;">
            <h2>Error</h2>
            <p>${err.message}</p>
          </body>
        </html>
      `,
    };
  }
};