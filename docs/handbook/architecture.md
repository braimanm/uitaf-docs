---
sidebar_position: 1
description: ''
---

# UITAF Architecture

## Overview

**UITAF (UI Test Automation Framework)** is a sophisticated, minimalistic framework designed for automated UI testing using Selenium. It incorporates a page-component architecture and integrates with Allure for comprehensive reporting.

UITAF streamlines the creation of automated UI tests by providing:
    - **Automatic Test Data Generation**: Facilitates efficient test creation by automatically generating data sets from page objects.
    - **Detailed Reporting**: Generates comprehensive reports at the end of test executions.

The framework introduces the **"domain-objects"** design pattern, enhancing business-oriented testing by efficiently managing complex scenarios that span multiple web pages.

**UITAF** supports concurrent testing, allowing for:
    - **Simultaneous Execution**: Run multiple test cases concurrently across various browsers, Selenium grids, or cloud-based virtual machines.
    - **Efficient Resource Utilization**: Optimizes testing efficiency and resource management.

The framework integrates seamlessly with continuous integration systems, providing:
    - **Easy Configuration**: Configures tests for execution across different environments.
    - **Embedded Reporting**: Embeds test reports within CI server jobs.

## Architecture

The architecture of UITAF is illustrated below:

![UITAF Architecture](img/uitaf_architecture.svg)

Key components include:

- **Selenium WebDriver:** Automates web browsers to emulate real user interactions with the web application under test, enabling robust, browser-based testing.
- **Web Page Components:** Reusable libraries encapsulating the behavior and testing of composit HTML elements, built using the Selenium WebDriver API, allowing for modular and scalable UI testing.
- **Page Object Models (POM):** Abstractions representing individual web pages that aggregate page components and provide page-specific methods for test automation, promoting both maintainability and reusability.
- **Domain Object Models:** Business-oriented representations that span multiple web pages, aggregating Page Objects and offering higher-level methods that reflect the application’s business logic and workflows.
- **Test Orchestration and Concurrency:** Manages the execution of multiple test scenarios, coordinating data provisioning and allocating execution threads from a configurable thread pool to ensure efficient parallel testing.
- **XML Test Data Sets:** Structured files that define test inputs, parameters, and expected outcomes, serving as data providers for test cases and ensuring consistent validation against predefined criteria.
- **Test Scripts:** Java implementations of test scenarios that utilize Domain Objects and Page Objects to validate application functionality and workflows.
- **Test Context and Parameters:** Centralized configuration management for test environments, including WebDriver instances, timeouts, and other global test settings to ensure consistency across test runs.
- **Test Lifecycle Management:** Tracks and aggregates key events during test execution, providing detailed logging and reporting capabilities for monitoring and debugging.
- **Test Report:** A comprehensive web-based application generated from Test Lifecycle data, offering detailed insights into test execution, results, and performance metrics.

## Test Automation Components

UITAF is built around **Test Automation Components**, which simplify the automation of complex UI elements in modern web applications. These applications often use JavaScript UI component libraries (e.g., Angular, React, Lightning Web Components (LWC)) that combine primitive HTML elements with JavaScript logic.

**Page Components** in UITAF are Java classes that encapsulate automation behavior for reusable UI elements. These components abstract the complexity of underlying HTML elements and JavaScript code, making them reusable across multiple pages. If the UI framework changes, only the Component Library needs to be updated, preserving existing test artifacts.

**Key Benefits**:
    - **Component Libraries**: Abstract complexity and ensure reusability across different pages.
    - **Page Component Integration**: Extends the Page Object model by incorporating Page Components as fields, thus simplifying Page Object code and abstracting Selenium WebDriver API interactions.
    - **Data Framework Facilities**: Handle test data using serialization/deserialization of Page Objects to XML templates, supporting dynamic data generation and expression language mechanisms.

The **Domain Object** design pattern is an extension of the Page Object model that focuses on business logic across multiple pages. Domain Objects aggregate Page Objects to provide methods that manage business processes, making tests more maintainable and understandable.
