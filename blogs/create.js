'use strict';

const uuid = require('uuid');
const AWS =  require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, _context, callback) => {

  const timestamp = new Date().getTime();
  const requestBody = JSON.parse(event.body);

  if (typeof requestBody.title !== 'string' || typeof requestBody.body !== 'string') {
    console.error('Failed to validate');
    callback(new Error('Attributes Type Error'));
    return;
  }

  const params = {
    TableName: 'blogs',
    Item: {
      id: uuid.v1(),
      title: requestBody.title,
      body: requestBody.body,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  dynamoDb.put(params, (error, result) => {
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