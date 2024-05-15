import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {

    console.log(process.env.TABLE_NAME)
    await client.send(
        new PutItemCommand({
          TableName: process.env.TABLE_NAME,
          Item: {
            id: {
              S: Math.random().toString(36).substring(2),
            },
            content: {
              S: JSON.stringify(event),
            },
          },
        })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
      }),
    };
  } catch (err) {

    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
      }),
    };
  }
};
