---
title: "The Whole Cloud on a Laptop: Local Development for a Serverless API"
description: "Every change meant a deploy just to find out whether it worked. This is how the full request path moved onto a developer's machine, plus two production fixes made along the way."
date: "2026-11-24"
banner:
  src: "../../images/clement-h-95YRwf6CNw8-unsplash.jpg"
  alt: "Laptop showing a code editor on a white desk beside a plant and a yellow mug"
  caption: 'Photo by <a href="https://unsplash.com/photos/95YRwf6CNw8">Clément Hélardot</a> on <a href="https://unsplash.com">Unsplash</a>'
categories:
  - "Developer Tooling"
  - "Serverless"
  - "Cloud Infrastructure"
keywords:
  - "AWS Lambda"
  - "LocalStack"
  - "DynamoDB"
  - "AWS X-Ray"
  - "AWS CDK"
  - "Local Development"
---

## Problem Statement

Two new services ran as AWS Lambda functions behind API Gateway. A request passed through a custom authorizer, reached a Lambda handler, read from DynamoDB, and pulled credentials from Secrets Manager before calling anything upstream.

Testing any of that meant deploying it. A one-line change to a handler needed a deploy to real AWS before you could send a request and see what happened, and every round trip cost the time of a deploy.

## Solution Overview

The fix ran the entire request path locally with LocalStack Pro: API Gateway, the authorizer, the Lambda handlers, DynamoDB, and Secrets Manager, all on a developer's machine. The same two services also needed two production fixes: they had no tracing, and their Lambdas were running a subnet out of IP addresses.

### Mapping the Request Path

The local setup had to match the deployed one closely enough that a passing request on a laptop meant something. That meant standing up each piece in order: the API definition, the authorizer in front of it, the handlers behind it, and the tables and secrets they read at runtime.

Another service on the team already had a working LocalStack setup. Instead of inventing a new layout, this one mirrored it. Anyone who knew one service's local environment could run the other without learning anything new.

### Tracing Without the Patient Data

The services handled healthcare requests, so observability came with a constraint: no patient data could end up in traces. AWS X-Ray went onto all four Lambda handlers using a tracing pattern another team service already used.

Each trace subsegment got a fixed, static label instead of anything derived from the request. You can see which step was slow without seeing who the request was about. Tracing defaults to on in the development environment only.

### The Subnet That Ran Out of IPs

The Lambdas ran inside a VPC. The infrastructure code, written with AWS CDK, let each function create its own security group automatically. Every one of those took addresses from a shared subnet, and the subnet was running out.

The fix moved both services onto the team's shared security group. The functions behaved the same, and the subnet stopped filling up.

### Outcome

Engineers can now run the full request path on their own machines, from API Gateway through DynamoDB and Secrets Manager, without deploying. Both services have tracing that's safe for health data, and neither one competes for subnet addresses anymore.

Because the local setup copies an existing service's layout, the next new service on the team can copy it too.

## Project Stack

[![AWS Lambda][Lambda]][Lambda-url]
[![API Gateway][APIGateway]][APIGateway-url]
[![DynamoDB][DynamoDB]][DynamoDB-url]
[![LocalStack][LocalStack]][LocalStack-url]
[![AWS CDK][CDK]][CDK-url]

[Lambda]: https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white
[Lambda-url]: https://aws.amazon.com/lambda/
[APIGateway]: https://img.shields.io/badge/API_Gateway-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white
[APIGateway-url]: https://aws.amazon.com/api-gateway/
[DynamoDB]: https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white
[DynamoDB-url]: https://aws.amazon.com/dynamodb/
[LocalStack]: https://img.shields.io/badge/LocalStack-2D1B69?style=for-the-badge&logo=localstack&logoColor=white
[LocalStack-url]: https://www.localstack.cloud/
[CDK]: https://img.shields.io/badge/AWS_CDK-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white
[CDK-url]: https://aws.amazon.com/cdk/

!["Laptop showing a code editor on a white desk"](../../images/clement-h-95YRwf6CNw8-unsplash.jpg 'Photo by Clément Hélardot on Unsplash')
