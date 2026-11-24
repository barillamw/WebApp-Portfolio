---
title: "Your 502 Is Lying: Hardening a Partner-Facing API Contract"
description: "To a partner, a 502 means the service is down. For three bugs, it really meant the request had something the API didn't expect, and nobody on the other end could tell the difference."
date: "2026-11-24"
banner:
  src: "../../images/markus-spiske-PsRUMc7vilg-unsplash.jpg"
  alt: "Error messages and source code text on a dark screen"
  caption: 'Photo by <a href="https://unsplash.com/@markusspiske?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Markus Spiske</a> on <a href="https://unsplash.com/photos/text-PsRUMc7vilg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
categories:
  - "API Design"
  - "Backend Engineering"
  - "Serverless"
keywords:
  - "AWS Lambda"
  - "API Gateway"
  - "OpenAPI"
  - "Postman"
  - "Input Validation"
  - "Error Handling"
---

## Problem Statement

The API was a set of proxy services in front of an internal system. Partners called it to look up locations, look up test details, and schedule pickups. The proxy checked who was calling, shaped the request, and passed it upstream.

After launch, before any partner had onboarded, three bugs turned up with the same shape. A caller sent something slightly wrong. The proxy forwarded it anyway. The upstream system choked, and the caller got back a 502 Bad Gateway.

A 502 tells a partner your service is broken. Their engineers would open an incident, wait, and retry. None of that helps when the real problem sits in their own request.

## Solution Overview

Each fix moved a decision from the upstream system to the proxy. The proxy now validates what it can before calling upstream, returns a status code that describes what happened, and rejects fields it doesn't support. Every fix also updated the OpenAPI spec and the Postman regression suite in the same change.

### Validate at the Front Door

The first bug: a caller sent a non-numeric account number. The proxy passed it upstream, the upstream call failed, and the caller saw a 502. The proxy now checks the format first and returns a 400 with a message that names the bad field.

The second bug followed the same pattern. When a lookup request left out the identifier type or value, the proxy forwarded a malformed request and surfaced the upstream failure as a 502. Presence checks now catch missing and empty values and return a structured 400. Optional fields got type checks too, so a string where the API expects a boolean fails fast with a clear reason.

### Empty Isn't an Error

Some valid requests matched nothing. The upstream system returned an empty location list, and the proxy treated that as a failure. A partner would have no way to tell "no locations near this address" from "the service is down." Empty results now return a 404, which tells the caller the request worked and found nothing.

### Saying No to Mystery Fields

A teammate noticed the third bug. The scheduling endpoint accepted extra fields that appeared nowhere in the documentation. The proxy ignored some and passed others along, with no defined behavior for either. A partner could build an integration around a field that did nothing.

The fix tightened the request schema to accept only supported fields and updated the docs to match. Anything else now gets a 400.

### The Contract Is the Docs

Each of these fixes changed what the API promised, so the OpenAPI spec and the Postman suite changed in the same pull request. Partners read the published docs to build their integrations. If the docs drift from the code, partners pay for it later.

### Outcome

When partners onboard, they'll get errors they can act on: a 400 that names the field, a 404 for an empty result, and a 502 only when something upstream has failed. The work also left the regression suite with a test for each case.

Your error codes are part of your interface, and partners build their integrations around them as much as around the success responses.

## Project Stack

[![AWS Lambda][Lambda]][Lambda-url]
[![API Gateway][APIGateway]][APIGateway-url]
[![OpenAPI][OpenAPI]][OpenAPI-url]
[![Postman][Postman]][Postman-url]

[Lambda]: https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white
[Lambda-url]: https://aws.amazon.com/lambda/
[APIGateway]: https://img.shields.io/badge/API_Gateway-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white
[APIGateway-url]: https://aws.amazon.com/api-gateway/
[OpenAPI]: https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge&logo=openapiinitiative&logoColor=white
[OpenAPI-url]: https://www.openapis.org/
[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[Postman-url]: https://www.postman.com/

!["Error messages and source code text"](../../images/markus-spiske-PsRUMc7vilg-unsplash.jpg 'Photo by Markus Spiske on Unsplash')
