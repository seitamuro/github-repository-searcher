import * as cdk from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new NodejsFunction(this, "ApiHandler", {
      entry: "./lambda/main.ts",
      runtime: Runtime.NODEJS_22_X,
      bundling: {
        sourceMap: true,
      },
      timeout: cdk.Duration.seconds(300),
    });
    const functionUrl = handler.addFunctionUrl();

    new cdk.CfnOutput(this, "GitHubCrawlerEndpoint", {
      value: functionUrl.url,
    });
  }
}
