var coldStart = true;
console.log('Cold Start');

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const scanTableName = 'sandy-scan-table2';
const queryTableName = 'sandy-query-table2';

exports.handler = async (event) => {
  // NOTE: This is a make shift arrangement, might not be a reliable metric
  let coldStartResponse;
  if (coldStart) {
    coldStartResponse = coldStart;
  }
  coldStart = false;

  const queryParam = event.queryStringParameters;
  console.log('🚀 ~ file: index.js:8 ~ exports.handler= ~ queryParam:', queryParam);

  let counter = 0,
    items;

  if (queryParam?.query) {
    items = await queryDynamoDBTable(queryTableName, 'bikes');
  } else {
    items = await scanDynamoDBTable(scanTableName);
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

    data.Items = data.Items.map((item) => {
      return AWS.DynamoDB.Converter.unmarshall(item);
    });

    // Add the scanned items to the items array
    items = items.concat(data.Items);
    counter += 1;

    // If there are more items to scan, recursively call the scanDynamoDBTable function with the last evaluated key
    if (data.LastEvaluatedKey && counter < 10) {
      return scanDynamoDBTable(tableName, data.LastEvaluatedKey, items);
    }

    return items;
  }

  async function queryDynamoDBTable(tableName, category, startKey = null, items = []) {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'category = :category',
      ExpressionAttributeValues: {
        ':category': { S: category },
      },
      ExclusiveStartKey: startKey,
      Limit: 300,
    };

    const data = await dynamodb.query(params).promise();

    data.Items = data.Items.map((item) => {
      return AWS.DynamoDB.Converter.unmarshall(item);
    });

    items = items.concat(data.Items);
    counter += 1;

    if (data.LastEvaluatedKey && counter < 10) {
      return queryDynamoDBTable(tableName, category, data.LastEvaluatedKey, items);
    }

    return items;
  }

  // End execution
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ items, coldStart: coldStartResponse }),
  };
  return response;
};
