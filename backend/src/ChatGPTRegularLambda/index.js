const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.ORG_ID,
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
exports.handler = async (event) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: event.body }],
  });

  console.log(completion.data);
  console.log(typeof completion.data);
  // End execution
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(completion.data.choices[0].message.content),
  };
  return response;
};
