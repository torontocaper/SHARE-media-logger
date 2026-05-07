exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    console.log("Received:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Media hit received",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: err.message,
      }),
    };
  }
};