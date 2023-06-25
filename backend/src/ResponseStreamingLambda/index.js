const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();
const tableName = import.meta.env.VITE_SCAN_DB_NAME;

exports.handler = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    const httpResponseMetadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
    };

    responseStream = awslambda.HttpResponseStream.from(
      responseStream,
      httpResponseMetadata
    );

    let counter = 0;
    await scanDynamoDBTable(tableName);

    async function scanDynamoDBTable(tableName, startKey = null, items = []) {
      // Create a new Scan request with the table name and start key
      const params = {
        TableName: tableName,
        ExclusiveStartKey: startKey,
        Limit: 250,
      };

      // Use the DynamoDB object to scan the table with the specified parameters
      const data = await dynamodb.scan(params).promise();

      // Convert the items from DDB JSON to regular JSON
      data.Items = data.Items.map((item) => {
        return AWS.DynamoDB.Converter.unmarshall(item);
      });

      // Send the scan result to the stream
      responseStream.write(data.Items);

      // Send an identifier to differentiate between the streams
      // Since the transaction are happening
      responseStream.write("${Separator}");

      counter += 1;

      // If there are more items to scan, recursively call the scanDynamoDBTable function with the last evaluated key
      if (data.LastEvaluatedKey && counter < 10) {
        return scanDynamoDBTable(tableName, data.LastEvaluatedKey, items);
      }

      // End stream
      responseStream.end();
    }
  }
);
