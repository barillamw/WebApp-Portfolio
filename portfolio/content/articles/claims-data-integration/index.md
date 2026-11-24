---
title: "Records That Didn't Agree: Wiring New Data Sources into a Claims System"
description: "A claims system made decisions from records that lived in more than one place, and those places didn't always agree. Connecting them let the system notice and resynchronize the mismatches on its own."
date: "2026-11-24"
banner:
  src: "../../images/alan-aprilio-EwVWnl4Z4Wo-unsplash.jpg"
  alt: "Hands connecting colorful puzzle pieces together"
  caption: 'Photo by <a href="https://unsplash.com/@alanaprilio?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alan Aprilio</a> on <a href="https://unsplash.com/photos/hands-connecting-colorful-puzzle-pieces-together-EwVWnl4Z4Wo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
categories:
  - "Backend Engineering"
  - "Data Integration"
  - "Microservices"
keywords:
  - "Java"
  - "Spring Boot"
  - "Feign"
  - "JWT"
  - "Data Quality"
  - "Microservices"
---

## Problem Statement

A government claims-processing application tracked the status of each case as it moved toward a decision. It served millions of records, and the information behind a single case often lived in several outside systems.

Those systems weren't connected to the decision-making process. When one source said one thing and another said something else, the application had no way to see it. The records drifted apart, and someone had to notice and fix them by hand.

## Solution Overview

The work connected more than five outside data sources to the services that decide a case's status. With that data in hand, the system could spot records that had drifted apart and resynchronize them automatically.

### A Monolith and Its Neighbors

The application was a Java and Angular monolith with Spring Boot microservices around it. The integration work ran through both: new endpoints and service logic on the backend, plus the UI changes that showed the result to the people working the cases.

### A Client for Each Source

Each outside system got its own Feign client, so a call to another service read like a call to a local interface. Every source required authentication, so each client carried JWT-based auth. Onboarding a new source followed the same pattern every time: define the client, wire in its credentials, and map its data to the shape the decision logic expected.

### Putting the Data to Work

Fetching the data was only half the job. The status logic had to use it. Once the services could see every source side by side, they could detect when the sources disagreed and bring the records back in line without anyone stepping in.

### Testing It

New integrations are easy to break and hard to debug in production. I set the team's testing standards for the backend services and drove unit test coverage with JUnit and Mockito.

### Outcome

Records that used to drift apart across systems now get resynchronized automatically, drawing on sources the system had never used before.

Connecting a data source is a plumbing job until the decision logic starts using it. That's the point where data quality stops being someone's manual chore.

## Project Stack

[![Java][Java]][Java-url]
[![Spring Boot][Spring]][Spring-url]
[![Angular][Angular]][Angular-url]
[![JWT][JWT]][JWT-url]

[Java]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.java.com/
[Spring]: https://img.shields.io/badge/spring_boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white
[Spring-url]: https://spring.io/projects/spring-boot
[Angular]: https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.dev/
[JWT]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/

!["Hands connecting colorful puzzle pieces together"](../../images/alan-aprilio-EwVWnl4Z4Wo-unsplash.jpg 'Photo by Alan Aprilio on Unsplash')
