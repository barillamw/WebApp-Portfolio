---
title: "Unit Tests Pass, the API Still Breaks: Adding Integration Tests to CI"
description: "A pipeline with security scans and unit tests still couldn't tell you whether the API worked. Wiring a shared library of Postman suites into CI closed that gap on every build."
date: "2026-11-24"
banner:
  src: "../../images/albert-stoynov-dyUp7WPu5q4-unsplash.jpg"
  alt: "Close-up of blue network cables plugged into a switch"
  caption: 'Photo by <a href="https://unsplash.com/@albertstoynov?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Albert Stoynov</a> on <a href="https://unsplash.com/photos/a-close-up-of-a-network-with-wires-connected-to-it-dyUp7WPu5q4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
categories:
  - "CI/CD"
  - "Testing"
  - "Backend Engineering"
keywords:
  - "Postman"
  - "Integration Testing"
  - "CI/CD"
  - "Spring Boot"
  - "JUnit"
  - "API Testing"
---

## Problem Statement

The API behind a government claims-processing application already had a CI/CD pipeline with security scanning and unit tests. Both mattered. Neither one answered the question a caller cares about: when you send this request to the running API, do you get the right response back?

Unit tests check pieces in isolation, with their dependencies mocked out. An API can pass every one of them and still return the wrong status code, drop a field, or break a contract another service relies on. Without integration tests in the pipeline, those problems waited for a person to find them.

## Solution Overview

I added automated integration testing to the pipeline. A shared library of Postman suites now runs against the API codebase as part of CI, alongside the security scans and unit tests that were already there.

### A Library, Not a One-Off

The Postman suites came from a shared library, so the pipeline could pull them in and run them the same way every time. The team could add suites to the library as the API grew.

### Running in the Pipeline

The pipeline already ran security scans and unit tests on every change. The integration suites joined them as another automated stage, so a change that broke the API's behavior showed up in the build instead of in a later environment.

### Standards for the Layer Below

Integration tests work best when the unit tests underneath them are solid. Alongside the pipeline work, I set testing standards across the backend services and drove unit test coverage with JUnit and Mockito. The two layers answer different questions. Unit tests show whether the logic is right, and integration tests show whether the API behaves the way its callers expect.

### Outcome

The pipeline now checks the API the way a caller uses it, on top of the security and unit checks it already ran.

A green build should mean the service works for the people calling it, and that takes a test that calls it.

## Project Stack

[![Postman][Postman]][Postman-url]
[![Spring Boot][Spring]][Spring-url]
[![JUnit][JUnit]][JUnit-url]
[![Java][Java]][Java-url]

[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white
[Postman-url]: https://www.postman.com/
[Spring]: https://img.shields.io/badge/spring_boot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white
[Spring-url]: https://spring.io/projects/spring-boot
[JUnit]: https://img.shields.io/badge/JUnit5-25A162?style=for-the-badge&logo=junit5&logoColor=white
[JUnit-url]: https://junit.org/
[Java]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.java.com/

!["Close-up of blue network cables plugged into a switch"](../../images/albert-stoynov-dyUp7WPu5q4-unsplash.jpg 'Photo by Albert Stoynov on Unsplash')
