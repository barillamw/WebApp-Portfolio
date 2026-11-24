---
title: "The Save Button That Never Came Back: Debugging a Deadlock in a Shared Queue"
description: "Some saves just hung. The cause turned out to be two well-behaved pieces of database code waiting on each other in the same line."
date: "2026-11-05"
banner:
  src: "../../images/james-lo-BntDJXvsacQ-unsplash.jpg"
  alt: "A long line of cars stopped in traffic"
  caption: 'Photo by <a href="https://unsplash.com/@olsemaj?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">James Lo</a> on <a href="https://unsplash.com/photos/a-long-line-of-cars-in-traffic-BntDJXvsacQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
categories:
  - "Debugging"
  - "Concurrency"
  - "Backend Engineering"
keywords:
  - "Amazon Aurora"
  - "Deadlock"
  - "Transactions"
  - "Concurrency"
  - "Root Cause Analysis"
---

## Problem Statement

The portal let internal staff create and save customer engagements, the first step in onboarding a new customer. Most of the time it worked. Sometimes, a create or save request hung and never came back.

Intermittent hangs are the worst kind of bug to chase. The code looked correct. Each database call worked on its own. The failure only appeared when two kinds of work overlapped, and until someone understood which two, every attempt to fix it was a guess.

## Solution Overview

The root cause sat in the data access layer. Two helpers, one for transactions and one for serialized requests, shared a single in-process FIFO queue. Under the right timing, work in that queue ended up waiting on other work queued behind it, and neither could finish. The fix gave the two paths a way to proceed without waiting on each other, and it shipped on the release branch.

### Two Helpers, One Line

The service talked to Amazon Aurora through two helpers. `runTransaction` wrapped multi-step writes so they committed or rolled back together. `serialRequest` pushed individual requests through a queue one at a time to keep their order predictable.

Each helper made sense alone. Both relied on the same in-process FIFO queue to decide what ran next.

### How the Line Locked Up

A create or save went through a transaction, and the transaction held its place at the front of the queue while it ran. If any step inside it, or a request racing alongside it, went through `serialRequest`, that request joined the same queue behind the transaction. The transaction waited for the request to finish. The request waited for the transaction to leave the front of the line, and the save just sat there.

### Breaking the Cycle

Once the cycle was visible, the fix was small: the transaction path stopped waiting on the queue that it was holding. The change shipped on the release branch, along with documented steps to re-apply it cleanly when that branch merged back into the main development line, so the fix wouldn't get lost in the merge.

### Outcome

Staff can create and save engagements without the hang, and the merge notes keep the fix from quietly disappearing in the next release.

Each helper did its job on its own. The bug lived in the space between them, in a queue both of them assumed they had to themselves.

## Project Stack

[![Amazon Aurora][Aurora]][Aurora-url]
[![Amazon ECS][ECS]][ECS-url]

[Aurora]: https://img.shields.io/badge/Amazon_Aurora-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white
[Aurora-url]: https://aws.amazon.com/rds/aurora/
[ECS]: https://img.shields.io/badge/Amazon_ECS-FF9900?style=for-the-badge&logo=amazonecs&logoColor=white
[ECS-url]: https://aws.amazon.com/ecs/

!["A long line of cars stopped in traffic"](../../images/james-lo-BntDJXvsacQ-unsplash.jpg 'Photo by James Lo on Unsplash')
