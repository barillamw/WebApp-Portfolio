---
title: "Trust, but Read the Diff: Code Review When AI Writes Half the Code"
description: "AI-generated changes compile, pass CI, and look reasonable. Two of them were wrong in ways no pipeline would catch, and both came down to a reviewer reading what actually changed."
date: "2026-11-24"
banner:
  src: "../../images/charles-deluvio-DgoyKNgPiFQ-unsplash.jpg"
  alt: "Hands typing on a laptop keyboard"
  caption: 'Photo by <a href="https://unsplash.com/photos/DgoyKNgPiFQ">Charles Deluvio</a> on <a href="https://unsplash.com">Unsplash</a>'
categories:
  - "Code Review"
  - "AI Engineering"
  - "Software Quality"
keywords:
  - "Code Review"
  - "AI Agents"
  - "Claude Code"
  - "GitHub Copilot"
  - "Testing"
  - "Microservices"
---

## Problem Statement

AI coding tools changed how fast code shows up in a pull request. They didn't change what makes a change correct.

Review habits grew up around human authors. A person who breaks a test usually fixes the test or the code, and a person who designs a data layer usually knows why it has the shape it does. Agents fail differently. They optimize for the check in front of them, and they produce designs that look complete without carrying the reasoning behind them. A green pipeline tells you the agent satisfied the checks. You still have to find out whether it did the right thing.

## Solution Overview

Two catches on two different teams shaped how I review AI-assisted work. One was a set of tests that quietly disappeared. The other was a design that worked and was slow for reasons nobody had chosen. Both turned into specific things to look for, and both fed into review at a much higher volume.

### The Tests That Disappeared

On a team building claims-processing services, an agent made a code change that left existing tests failing. Instead of updating those tests to validate the new behavior, it commented them out or deleted them. With the failures gone, the change looked finished.

The diff told a different story. The tests that should have proved the new behavior weren't there anymore. They had to come back, rewritten to cover what the code now did. Since then, when an agent touches tests, I read the test diff first.

### The Database in the UI

On a later project, an AI-driven design exposed database tables directly to the user interface instead of treating the service behind them as a proper microservice. It worked, and it was slow. The UI pulled data it didn't need, and the design kept duplicate copies of the same data in more than one table.

The correction segmented the data layer so the UI talked to the service, the service owned its tables, and caching went in where the access patterns called for it. The latency came from the shape of the design, so the fix had to change the shape.

### What Review Checks Now

Those two cases turned into a short list of questions for any AI-assisted pull request:

- Did any test get deleted, skipped, or commented out? If so, why?
- Does new behavior come with new tests, or did existing ones just stop failing?
- What data crosses this boundary, and does the caller need all of it?
- Does this change create a second copy of data that already lives somewhere else?

### Review at Volume

Over two months, I reviewed 66 pull requests across 9 repositories. To keep up, I built a multi-agent tool that automates a first review pass across 18 microservice repositories, so human attention goes to the questions above instead of formatting and obvious mistakes.

### Outcome

Both problems were sitting in the diff for anyone who read it closely. The agent still writes much of the code. A person still decides whether it's right.

Green CI means the checks passed. Somebody still has to read what the checks were checking.

## Project Stack

[![GitHub][GitHub]][GitHub-url]
[![Claude][Claude]][Claude-url]
[![GitHub Copilot][Copilot]][Copilot-url]

[GitHub]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[GitHub-url]: https://github.com/
[Claude]: https://img.shields.io/badge/Claude_Code-D97757?style=for-the-badge&logo=claude&logoColor=white
[Claude-url]: https://www.anthropic.com/claude-code
[Copilot]: https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=githubcopilot&logoColor=white
[Copilot-url]: https://github.com/features/copilot

!["Hands typing on a laptop keyboard"](../../images/charles-deluvio-DgoyKNgPiFQ-unsplash.jpg 'Photo by Charles Deluvio on Unsplash')
