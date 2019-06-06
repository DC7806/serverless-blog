'use strict';

const AWS =  require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, _context, callback) => {
  const requestId = event.pathParameters.id

  if (typeof requestId !== 'string') {
    console.error('Failed to validate');
    callback(new Error('Record not found'));
    return;
  }

  const params = {
    TableName: 'blogs',
    Key: {
      id: requestId
    }
  }

  dynamoDb.delete(params, error => {
    if (error) {
      console.error(error);
      callback(new Error(`Something went wrong: ${error}`));
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({})
    }

    callback(null, response)
  })
}
