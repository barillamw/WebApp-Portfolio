---
title: "Observability That Knows When to Be Quiet: Logging Across 11 Environments"
description: "Trace IDs worked. You could follow a request as it bounced between microservices — right up until it hit our API. Then the trail went cold. This is the story of closing that gap without creating a new one."
date: "2026-02-14"
banner:
  src: "../../images/markus-spiske-PsRUMc7vilg-unsplash.jpg"
  alt: "Authentication error and source code text representing distributed system logging output"
  caption: 'Photo by <a href="https://unsplash.com/@markusspiske?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Markus Spiske</a> on <a href="https://unsplash.com/photos/text-PsRUMc7vilg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
categories:
  - "Observability"
  - "Distributed Systems"
  - "Backend Engineering"
keywords:
  - "Java"
  - "Spring"
  - "OpenSearch"
  - "Logging"
  - "Feature Flags"
  - "Microservices"
---

## Problem Statement

The distributed system had 11 environments and a logging problem nobody had fully solved.

The trace IDs worked. You could follow a request as it bounced between microservices, right up until it hit the API. Then the trail went cold. Sparse logs. Sometimes nothing at all.

For engineers doing on-call debugging, this meant hours of archaeology. Something broke in production. You knew roughly where. But the data to confirm it, trace it, and fix it just wasn't there. Every incident response started with the same frustrating search through incomplete evidence.

## Solution Overview

The fix was straightforward in concept: add structured logging at the right points. Entry points into the service. Entity state throughout the call chain. External calls — especially anything touching the cache, where silent misses were their own category of headache that left no trace in the existing logs.

It worked.

And then, looking at what had been built, the problem became clear: a new one had been created.

### The Log Volume Problem

Across 11 environments, log storage isn't free. Verbose logging that's always on isn't a solution — it's just a different kind of noise, and eventually an expensive one. The raw implementation produced full visibility, but full visibility at all times in all environments was neither practical nor sustainable.

The question shifted from "how do we get more signal?" to "how do we make that signal something we can actually live with in production?"

### Feature-Flagged Log Levels

The answer was wrapping the majority of the new logging in feature flags with configurable log levels. The flags could be toggled per environment without a deployment.

Debugging mode on: full trace, full entity state, every external call logged, everything needed to diagnose an incident. Debugging mode off: clean, lean, and storage-friendly — just enough to confirm normal operation.

This made the system's observability practical. Engineers doing on-call rotation got the full picture when they needed it. Production environments in steady state stayed quiet. Log storage costs stayed manageable across the full fleet of environments.

### Outcome

The result was a system where the logs were there exactly when you needed them and invisible when you didn't. Incident response went from archaeological dig to a directed investigation with a clear data trail.

The harder lesson was about the nature of observability itself: the difficult part isn't adding visibility. It's building something you can actually live with in production.

## Project Stack

[![Java][Java]][Java-url]
[![Spring][Spring]][Spring-url]
[![OpenSearch][OpenSearch]][OpenSearch-url]

[Java]: https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.oracle.com/java/
[Spring]: https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Spring-url]: https://spring.io/
[OpenSearch]: https://img.shields.io/badge/OpenSearch-005EB8?style=for-the-badge&logo=opensearch&logoColor=white
[OpenSearch-url]: https://opensearch.org/

!["Authentication error and source code text"](../../images/markus-spiske-PsRUMc7vilg-unsplash.jpg 'Photo by Markus Spiske on Unsplash')
