const AWS = require("aws-sdk");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-kjCeNR9OEGrYk8r8tdQbDU0O",
  apiKey: process.env.API_KEY,
});

let messageJson = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hello world" },
];

exports.handler = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    messageJson = messageJson.push(JSON.stringify(event.body));
    console.log(messageJson);
    const httpResponseMetadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messageJson,
    });

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
