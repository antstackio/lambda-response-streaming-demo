const AWS = require("aws-sdk");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.ORG_ID,
  apiKey: process.env.API_KEY,
});

exports.handler = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    const httpResponseMetadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
    };

    responseStream = awslambda.HttpResponseStream.from(
      responseStream,
      httpResponseMetadata
    );

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: event.body }],
        stream: true,
      },
      { responseType: "stream" }
    );

    const stream = completion.data;
    await stream.on("data", (chunk) => {
      const payloads = chunk.toString().split("\n\n");
      for (const payload of payloads) {
        if (payload.includes("[DONE]")) {
          responseStream.end();
          return;
        }
        if (payload.startsWith("data:")) {
          const data = JSON.parse(payload.replace("data: ", ""));
          try {
            const chunk = data.choices[0].delta?.content;
            if (chunk) {
              responseStream.write(chunk);
            }
          } catch (error) {
            console.log(`Error with JSON.parse and ${payload}.\n${error}`);
          }
        }
      }
    });
  }
);
