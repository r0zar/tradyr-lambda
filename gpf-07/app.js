const axios = require('axios');
const AWS = require('aws-sdk'),
    dynamoDb = new AWS.DynamoDB.DocumentClient(),
    TABLE_NAME = process.env.TABLE_NAME

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    
    
    let params = {
        TableName: TABLE_NAME
    }
    let experiments = await dynamoDb.scan(params)
    .promise()
    .then(response => {
        let experiments = response.Items
        return experiments;
    })
    
    
    let randomExperiment = experiments[Math.floor(Math.random() * experiments.length)];
    
    let body = {};
    
    return await axios.post(event.response_url, body).then(response => response.status);
    
};
