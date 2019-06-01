'use strict';

const AWS =  require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = { TableName: 'blogs' }

module.exports.list = (_event, _context, callback) => {
  dynamoDb.scan(params, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Items)
    };

    callback(null, response)
  });
}
