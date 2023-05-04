var coldStart = true;
console.log('Cold Start');

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const scanTableName = 'sandy-scan-table2';
const queryTableName = 'sandy-query-table2';

exports.handler = awslambda.streamifyResponse(async (event, responseStream, context) => {
  // TODO: Unsure how this can be sent to client in streaming
  // NOTE: This is a make shift arrangement, might not be a reliable metric
  let coldStartResponse;
  if (coldStart) {
    coldStartResponse = coldStart;
  }
  coldStart = false;

  const queryParam = event.queryStringParameters;

  const httpResponseMetadata = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  };

  responseStream = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata);

  let counter = 0;
  if (queryParam?.query) {
    await queryDynamoDBTable(queryTableName, 'bikes');
  } else {
    await scanDynamoDBTable(scanTableName);
  }

  async function scanDynamoDBTable(tableName, startKey = null, items = []) {
    // Create a new Scan request with the table name and start key
    const params = {
      TableName: tableName,
      ExclusiveStartKey: startKey,
      Limit: 300,
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
    responseStream.write('${Separator}');

    counter += 1;

    // If there are more items to scan, recursively call the scanDynamoDBTable function with the last evaluated key
    if (data.LastEvaluatedKey && counter < 10) {
      return scanDynamoDBTable(tableName, data.LastEvaluatedKey, items);
    }

    // End stream
    responseStream.end();
  }

  async function queryDynamoDBTable(tableName, category, startKey = null) {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'category = :category ',
      ExpressionAttributeValues: {
        ':category': { S: category },
      },
      ExclusiveStartKey: startKey,
      Limit: 300,
    };

    const data = await dynamodb.query(params).promise();

    // Convert the items from DDB JSON to regular JSON
    data.Items = data.Items.map((item) => {
      return AWS.DynamoDB.Converter.unmarshall(item);
    });

    // Send the queried items to the stream
    responseStream.write(JSON.stringify(data.Items));

    // Send an identifier to differentiate between the streams
    responseStream.write('${Separator}');

    counter += 1;
    // If there are more items to query, recursively call the queryDynamoDBTable function with the last evaluated key
    if (data.LastEvaluatedKey && counter < 10) {
      return queryDynamoDBTable(tableName, category, data.LastEvaluatedKey);
    }

    // End stream
    responseStream.end();
  }
});
