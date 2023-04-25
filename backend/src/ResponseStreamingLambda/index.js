const util = require("util");
const stream = require("stream");
const { Readable } = stream;
const pipeline = util.promisify(stream.pipeline);
const zlib = require("zlib");

const AWS = require("aws-sdk");
const fs = require("fs");
const dynamodb = new AWS.DynamoDB();
const tableName = "sandy-scan-table2";

exports.handler = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    const httpResponseMetadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
        "X-Custom-Header": "Example-Custom-Header",
      },
    };

    responseStream = awslambda.HttpResponseStream.from(
      responseStream,
      httpResponseMetadata
    );

    // // Dump data code
    // const fileContents = fs.readFileSync('tweet.json', 'utf8');
    // const jsonData = JSON.parse(fileContents).results;
    // let counter = 0
    // for (const item of jsonData) {
    //   item.id=Date.now().toString()
    //   item.category = "random"
    //   const params = {
    //     Item: AWS.DynamoDB.Converter.marshall(item),
    //     TableName: tableName
    //   };
    //   await dynamodb.putItem(params).promise()
    //   counter+=1
    //   console.log(counter)
    // }
    // return counter

    let counter = 0;
    const items = await scanDynamoDBTable(tableName);

    async function scanDynamoDBTable(tableName, startKey = null, items = []) {
      // Create a new Scan request with the table name and start key
      const params = {
        TableName: tableName,
        ExclusiveStartKey: startKey,
        Limit: 100,
      };

      // Use the DynamoDB object to scan the table with the specified parameters
      const data = await dynamodb.scan(params).promise();

      data.Items = data.Items.map((item) => {
        return AWS.DynamoDB.Converter.unmarshall(item);
      });

      responseStream.write(data.Items);
      responseStream.write("${Separator}");
      // 2. const requestStream = Readable.from(Buffer.from(JSON.stringify(data.Items)));

      // Add the scanned items to the items array
      items = items.concat(data.Items);
      counter += 1;

      // If there are more items to scan, recursively call the scanDynamoDBTable function with the last evaluated key
      if (data.LastEvaluatedKey && counter <= 2) {
        return scanDynamoDBTable(tableName, data.LastEvaluatedKey, items);
      }

      responseStream.end();
      // 2. await pipeline(requestStream, responseStream);
      return items;
    }
  }
);
