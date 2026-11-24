---
title: "Workout Buddy: Fitness Tracking REST API"
description: "Built a custom REST API to log and track weight lifting workouts."
date: "2023-08-19"
banner:
  src: "../../images/workoutBuddy_header.jpg"
  alt: "Person putting weight plates on a barbell during a workout"
  caption: 'Photo by <u><a href="https://unsplash.com/photos/vjkM-0m34KU">Victor Freitas</a></u>'
categories:
  - "Backend Development"
keywords:
  - "Python"
  - "Sql"
  - "Django"
  - "Development"
  - "Projects"
---

## Problem Statement
Traditionally, workouts have been tracked with notebooks and pencils. This manual process makes repeating workouts difficult and requires people to bring additional supplies to the gym with them. The management of workouts can be streamlined and integrated into devices that users already take to the gym for a more seamless experience when working out.

## Solution Overview
A comprehensive solution for logging and managing workout routines and exercises. Built on Django, this RESTful API provides a robust backend to support your fitness journey. Backed by a MySQL Server database, the API stores and recalls your workout history so you can track progress over time.

[Check Out My Code!](https://github.com/barillamw/Project-WorkoutTrackingAPI)

### Exercise Logging and Tracking
The Workout Tracker API enables users to log their exercises and workouts efficiently. With a range of predefined exercises and the flexibility to create custom exercises, users can tailor their fitness routines to match their goals.

### Routine Management
Users can organize exercises into workout routines. The API allows users to create, modify, and delete routines based on their preferences. This feature ensures that users can easily switch between different workout plans.

### MySQL Database
The API is powered by a MySQL database, which ensures secure and efficient storage of exercise and routine data. This relational database structure allows for smooth data retrieval and manipulation.

## Lessons Learned
Previously I had worked with pre-built APIs, but building one I found it interesting to see all of the different views that had to be thought through. This helped me get a better grasp on how to structure databases to reference the necessary information. User authentication to the API was a challenge learning how to implement and ensure security of data. 

## Project Stack
[![Django][Django]][Django-url]
[![Python][Python]][Python-url]
[![MySQL][MySQL]][MySQL-url]
[![Azure][Azure]][Azure-url]


!["Person lifting weights during a workout"](../../images/workoutBuddy_lifting.jpg 'Photo by <u><a href="https://unsplash.com/photos/vqDAUejnwKw">Victor Freitas</a></u>')




[Django]: https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white
[Django-Url]: https://www.djangoproject.com/
[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://www.python.org/
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Azure]: https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white
[Azure-url]: https://azure.microsoft.com/en-us/
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
