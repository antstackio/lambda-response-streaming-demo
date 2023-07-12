const AWS = require("aws-sdk");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-kjCeNR9OEGrYk8r8tdQbDU0O",
  apiKey: process.env.API_KEY,
});

exports.handler = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    let messageJson = [];
    if (event?.body) {
      console.info(JSON.stringify(event?.body));

      event.body.map((data) => {
        messageJson.push(data);
      });

      console.info(messageJson);
    } else {
      messageJson = [{ role: "user", content: "Hello" }];
    }

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messageJson,
    });

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

    // Send the scan result to the stream
    responseStream.write(completion.data);

    // End stream
    responseStream.end();
  }
);
