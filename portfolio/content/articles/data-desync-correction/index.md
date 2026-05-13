---
title: "Same Person, Different Records: Automated Data Desynchronization Correction"
description: "When the same individual exists across multiple databases under slightly different names, birthdates, or file numbers, finding and fixing those discrepancies at scale is a data integrity problem worth solving deliberately. This project built a system to detect, validate, and correct drifted records — automatically."
date: "2025-06-01"
banner:
  src: "../../images/a-chosen-soul-EoxXApH1UKI-unsplash.jpg"
  alt: "Black and white network of interconnected dots representing distributed data relationships"
  caption: 'Photo by <a href="https://unsplash.com/@a_chosensoul?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">A Chosen Soul</a> on <a href="https://unsplash.com/photos/a-black-and-white-photo-of-a-network-of-dots-EoxXApH1UKI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
categories:
  - "Enterprise Software"
  - "Data Engineering"
  - "System Integration"
keywords:
  - "Java"
  - "Spring"
  - "Data Integrity"
  - "REST API"
  - "SOAP"
  - "Decision Table"
---

## Problem Statement

Distributed enterprise systems accumulate a subtle class of bug over time: the same real-world entity represented differently across databases. One system has "Michael," another has "Mike." A date of birth is off by a day. A file number was transposed during a manual entry years ago. None of these are catastrophic in isolation — but at scale, they compound. Records that should match don't. Downstream processes make decisions based on incomplete or inconsistent data. Support tickets pile up.

The existing resolution path was entirely manual: a ServiceNow ticket, a human investigation, a correction applied one record at a time. That process was slow, inconsistent, and didn't scale with the volume of drift the system was accumulating.

## Solution Overview

This project built an automated pipeline to detect, evaluate, and correct record desynchronization across disparate data sources. The system correlates records that appear to reference the same individual, applies a decision matrix to determine whether correction is appropriate, and — where permitted — surfaces an automated correction prompt to the end user. The result was a meaningful reduction in SNOW ticket volume and a faster path to data accuracy.

### Record Correlation

The first challenge was determining which records across different systems likely referred to the same person. The system compared key identity fields — name, date of birth, file number — using fuzzy matching to tolerate the exact kinds of minor drift that cause these problems in the first place. A confident match doesn't require perfect equality; it requires enough signal to conclude the records share an identity.

### Decision Matrix & External Validation

Once a potential match was identified, it wasn't enough to simply apply a correction. The system needed to understand the current state of the record before touching it. The decision matrix ingested data from multiple external APIs — claim status, dependent relationships, account standing, and more — to determine whether a correction was appropriate, risky, or should be deferred to a human reviewer.

A key addition to this matrix was claims data integration, which had not previously been part of the evaluation. Claims status turned out to be a meaningful signal: an active claim on a record changes the risk profile of automated correction significantly. Incorporating that context improved both the accuracy and the safety of the system's decisions.

### Automated Correction Workflow

For records that cleared the decision matrix, the system surfaced a correction prompt to the end user rather than silently applying changes. This kept a human in the loop for the final step while eliminating the overhead of the full SNOW ticket process. Users could review and confirm the proposed correction in a fraction of the time previously required.

## Project Stack

[![Java][Java]][Java-url]
[![Spring][Spring]][Spring-url]
[![REST API][REST-API]][REST-API-url]
[![SOAP][SOAP]][SOAP-url]

[Java]: https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.oracle.com/java/
[Spring]: https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]: https://spring.io/
[REST-API]: https://img.shields.io/badge/REST_API-02569B?style=for-the-badge&logo=json&logoColor=white
[REST-API-url]: https://restfulapi.net/
[SOAP]: https://img.shields.io/badge/SOAP-FF6C37?style=for-the-badge&logoColor=white
[SOAP-url]: https://www.w3.org/TR/soap/

!["Black and white network of interconnected dots"](../../images/a-chosen-soul-EoxXApH1UKI-unsplash.jpg 'Photo by A Chosen Soul on Unsplash')
