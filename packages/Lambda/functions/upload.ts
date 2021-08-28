import { APIGatewayProxyHandler } from "aws-lambda"

export const handler: APIGatewayProxyHandler = async (event, context, cb) => {
    return {
        statusCode: 200,
        body: "nice"
    }
}

export default {}