---
title: "Agents Don't Get the Keys: Orchestrating AI Development with a State Machine"
description: "Running one AI coding agent at a time worked until a story touched four microservices. This project built a control plane that lets agents write code fast while a separate system decides what happens next."
date: "2026-11-24"
banner:
  src: "../../images/kelly-sikkema-Hl3LUdyKRic-unsplash.jpg"
  alt: "Hand holding a pencil over a blank sketchbook beside a row of pens"
  caption: 'Photo by <a href="https://unsplash.com/photos/Hl3LUdyKRic">Kelly Sikkema</a> on <a href="https://unsplash.com">Unsplash</a>'
categories:
  - "AI Engineering"
  - "Developer Tooling"
  - "Automation"
keywords:
  - "Python"
  - "SQLite"
  - "MCP"
  - "AI Agents"
  - "State Machines"
  - "Developer Workflow"
---

## Problem Statement

Real stories rarely live in one repository. A single feature might touch an API, an orchestrator, and a UI, each in its own microservice with its own tests and its own pull request.

Running AI coding agents against that work one repo at a time fell apart fast. Each agent started without the context the others had built. Agents skipped checks when they got stuck and drifted outside the task. A developer had to sit in the middle, copying specs between windows and deciding what ran next. The agents wrote code quickly. Everything around them stayed slow.

## Solution Overview

I built a command-line tool that runs a story as a validated graph: spec, vertical slices, implementation, checks, and review, with human gates at the decisions that matter. A background daemon owns every transition. Agents write output files, and the daemon reads them and decides where the work goes next.

### One Story, Many Repos

The tool treats the story as the unit of work. One spec covers the whole change, and each affected repository gets a "leg" with its own git worktree, branch, and pull request. The daemon keys stories by workspace and ticket together, so the same ticket number in two projects never collides.

### A Control Plane Agents Can't Touch

The daemon keeps all state in SQLite. Transactional writes let the CLI, the daemon, and an MCP server work on the same story at once without stepping on each other.

Agents can't route themselves, push code, or open or merge pull requests. Each role agent runs headless in a scrubbed worktree where it can't see secrets or other stories. The agent does one job. The daemon decides whether that job is done.

### Gates Outside the Sandbox

The tool's gate command runs lint, type checks, targeted tests, and commit checks outside the agent's environment, so an agent can't skip a failing check or edit it away. Implementation moves in test-driven vertical slices, with a red/green loop per slice instead of a wall of tests written up front.

Four independent review lanes then read the result: builder, standards, product, and QA.

### Approvals That Can't Go Stale

Each human approval binds to a hash of the work the reviewer saw. If anything changes afterward, the hash stops matching and the tool asks again. A rework command sends a story backward with a note, and nothing moves forward without passing its gate. The live dashboard has a single write action: Approve.

An MCP server brings the tool into the editor's chat, so you can drive a story from chat while the terminal gates still apply.

### Outcome

On real production work, stories that took about a week now finish in one to two working days, with better results than separate agents produced on their own. The tool is still early, and I'm still working through bugs.

The speed came from giving each agent less to decide. A narrow job, a hard gate, and a person signing off at the right moments turned out to beat a capable agent left to manage itself.

## Project Stack

[![Python][Python]][Python-url]
[![SQLite][SQLite]][SQLite-url]
[![MCP][MCP]][MCP-url]
[![Cursor][Cursor]][Cursor-url]

[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://www.python.org/
[SQLite]: https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/
[MCP]: https://img.shields.io/badge/MCP-000000?style=for-the-badge&logo=modelcontextprotocol&logoColor=white
[MCP-url]: https://modelcontextprotocol.io/
[Cursor]: https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white
[Cursor-url]: https://cursor.com/

!["Hand holding a pencil over a blank sketchbook"](../../images/kelly-sikkema-Hl3LUdyKRic-unsplash.jpg 'Photo by Kelly Sikkema on Unsplash')
