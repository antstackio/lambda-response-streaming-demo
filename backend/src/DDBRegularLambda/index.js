const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();
const tableName = process.env.SCAN_DB_NAME;

exports.handler = async (event) => {
  let counter = 0;
  const items = await scanDynamoDBTable(tableName);

  async function scanDynamoDBTable(tableName, startKey = null, items = []) {
    // Create a new Scan request with the table name and start key
    const params = {
      TableName: tableName,
      ExclusiveStartKey: startKey,
      Limit: 200,
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
  // End execution
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(items),
  };
  return response;
};
