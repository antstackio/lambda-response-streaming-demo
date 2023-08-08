const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient({
    region: "ap-south-1"
});
const scan_table = "benchmark-normalised-bikes"
const query_table = "benchmark-sta-bikes"

// var credentials = new AWS.SharedIniFileCredentials({profile: '960351580303_AdministratorAccess'});
// AWS.config.credentials = credentials;

var start = process.hrtime()

var elapsed_time = function (note) {
    var precision = 3
    var elapsed = process.hrtime(start)[1] / 1000000
    console.log(process.hrtime(start)[0] + "s, " + elapsed.toFixed(precision) + "ms - " + note)
    start = process.hrtime()
}

async function scanWorker(LastEvaluatedKey = null) {
    const params = {
        TableName: scan_table
    }
    if (LastEvaluatedKey) params.ExclusiveStartKey = LastEvaluatedKey

    const data = await dynamodb.scan(params).promise()
    delete data.Items
    return data
}

async function scanStats() {
    elapsed_time("Start normalised Scan")
    let LastEvaluatedKey = null
    do {
        const result = await scanWorker(LastEvaluatedKey)
        LastEvaluatedKey = result.LastEvaluatedKey
        console.log(result)
    } while (LastEvaluatedKey)
    elapsed_time("End normalised Scan")
}

async function queryWorker(LastEvaluatedKey = null) {
    const params = {
        TableName: query_table,
        KeyConditionExpression: "#PK = :typeName",
        ExpressionAttributeValues: {
            ":typeName": "bikes"
        },
        ExpressionAttributeNames: {
            "#PK": "type"
        }
    }
    if (LastEvaluatedKey) params.ExclusiveStartKey = LastEvaluatedKey

    const data = await dynamodb.query(params).promise()
    delete data.Items
    return data
}

async function queryStats() {
    elapsed_time("Start Single Table Design Query")
    let LastEvaluatedKey = null
    do {
        const result = await queryWorker(LastEvaluatedKey)
        LastEvaluatedKey = result.LastEvaluatedKey
        console.log(result)
    } while (LastEvaluatedKey)
    elapsed_time("End Single Table Design Query")
}

async function run() {
    await scanStats()
    await queryStats()
}

run().catch(console.error)
