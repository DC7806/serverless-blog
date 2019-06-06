'use strict';

const AWS =  require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, _context, callback) => {
  const timestamp = new Date().getTime()
  const requestId = event.pathParameters.id
  const requestBody = JSON.parse(event.body)

  if (typeof requestBody.title !== 'string' || typeof requestBody.content !== 'string') {
    console.error('Failed to validate');
    callback(new Error('Attributes Type Error'));
    return;
  }

  const params = {
    TableName: 'blogs',
    Key: {
      id: requestId
    },
    ExpressionAttributeValues: {
      ':title': requestBody.title,
      ':content': requestBody.content,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET title = :title, content = :content, updatedAt = :updatedAt'
  };

  dynamoDb.update(params, (error, result) => {
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
      body: JSON.stringify(result.Item)
    }

    callback(null, response)
  })
}
