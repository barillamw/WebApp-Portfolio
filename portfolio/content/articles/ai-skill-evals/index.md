---
title: "Does the Skill Help? Testing AI Instructions Like Code"
description: "Custom AI skills are easy to write and easy to trust. This project gave a team's skills the same treatment as the rest of the codebase: a baseline, a comparison, and evidence before anyone relied on them."
date: "2026-11-24"
banner:
  src: "../../images/myles-bloomfield-p8JbzOUwdjg-unsplash.jpg"
  alt: "Small balance scale tipping between spheres on a marble base"
  caption: 'Photo by <a href="https://unsplash.com/@loomydoons?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Myles Bloomfield</a> on <a href="https://unsplash.com/photos/balance-scale-with-spheres-on-marble-p8JbzOUwdjg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
categories:
  - "AI Engineering"
  - "Developer Tooling"
  - "Software Quality"
keywords:
  - "Claude"
  - "GitHub Copilot"
  - "MCP"
  - "AI Agents"
  - "Evals"
  - "Developer Workflow"
---

## Problem Statement

The team worked on a large government claims-processing application: a Java and Angular monolith alongside a set of Spring Boot microservices. The codebase had its own patterns, and a new engineer needed time to learn them.

AI coding assistants didn't know those patterns either. Out of the box, they wrote code that compiled and looked fine but ignored how the team did things. You can fix that with custom instructions, or skills, that teach the assistant the codebase. The catch is that a skill is just text. It's easy to write one, feel good about it, and never find out whether it changed anything.

## Solution Overview

I led the team's move onto AI assistants, built skills tailored to the codebase, connected the assistant to the tools where the team's context lived, and ran evals to check whether each skill helped.

### Starting with Copilot

The first step was getting the team onto GitHub Copilot and making it part of daily work. That meant more than turning it on. I built custom skills and agents for the work the team did over and over, and those became tools the team used every day.

### Teaching the Codebase

Each skill captured one of the team's own patterns, such as how a service was laid out or how tests were written. The goal was an assistant that wrote code the way a teammate would, so reviewers spent their time on logic instead of style.

### Context the Assistant Can See

A lot of what an engineer needs isn't in the code. It's in the ticket, the open pull requests, and the current state of the repo. I connected Claude to Jira and GitHub through MCP servers, so the assistant could read the ticket and the repo directly instead of relying on whatever someone pasted into the chat.

### Measuring with Evals

To find out whether a skill earned its place, I ran the same tasks twice: once with the skill and once without it. Comparing the two runs showed what the skill changed. A skill that made no difference was just extra text for the assistant to read, and the evals made that visible.

### Outcome

The team got an assistant that knew its codebase, its tickets, and its repos, and a way to check each skill against a baseline before trusting it.

A skill is code that happens to be written in English. It deserves a test before anyone relies on it.

## Project Stack

[![Claude][Claude]][Claude-url]
[![GitHub Copilot][Copilot]][Copilot-url]
[![MCP][MCP]][MCP-url]
[![Jira][Jira]][Jira-url]

[Claude]: https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=white
[Claude-url]: https://www.anthropic.com/claude
[Copilot]: https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=githubcopilot&logoColor=white
[Copilot-url]: https://github.com/features/copilot
[MCP]: https://img.shields.io/badge/MCP-000000?style=for-the-badge&logo=modelcontextprotocol&logoColor=white
[MCP-url]: https://modelcontextprotocol.io/
[Jira]: https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white
[Jira-url]: https://www.atlassian.com/software/jira

!["Small balance scale tipping between spheres on a marble base"](../../images/myles-bloomfield-p8JbzOUwdjg-unsplash.jpg 'Photo by Myles Bloomfield on Unsplash')
