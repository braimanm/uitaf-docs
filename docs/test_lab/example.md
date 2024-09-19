---
description: ''
---

# Test Automation Example

This test automation example uses the UITAF open-source framework to perform UI testing on the Vehicle Insurance Quote minimalistic application located at [http://uitaf.org/test/](http://uitaf.org/test/). The test is executed using the Chrome browser and is supported only by Java&nbsp;8.

## [Prerequisites](/getting_started/prerequsits)

Before running the test, ensure that the following software is installed on the target machine:

1. **JDK Version 8**: Ensure that Java 8 is installed, as the test is only supported by this version.
2. **Git**: Needed to clone the project repository.
3. **Chrome Browser**: Ensure Chrome browser is installed on the machine where the test will run.
4. **IntelliJ IDEA** (Optional): You can use IntelliJ to open and work with the project as a Maven project.

## Setup and Execution

To build and execute the test automation solution, follow these steps:

1. **Clone the Repository**:
   - Open a terminal and run the following command to clone the repository:

    ```bash
    git clone https://github.com/braimanm/test-lab-example.git
    ```

2. **Navigate to the Project Folder**:
    - Change the directory to the project folder:

    ```bash
    cd test-lab-example
    ```

3. **Build the Solution**:
   - Execute the following command to build the solution:

    ```bash title="For Linux/macOS:"
    ./mvnw clean package
    ```

    ```bash title="For Windows:"
    mvnw.cmd clean package
    ```

4. **Execute the Solution**:
   - After the build is complete, execute the solution by running:

    ```bash
     java -jar target/example.jar
    ```

   - This command will start the test execution.

## Test Execution Details

- The test will launch **five instances of the Chrome browser** and run **five different test cases in parallel**.
- Upon completion of the test execution, a detailed <a href="/report/" target="_blank" rel="noopener noreferrer">**report**</a> with the results will be automatically launched in your default web browser.

:::info

This example demonstrates how to set up, build, and execute a test automation project using UITAF to test a web application. UITAF also introduces parallel execution of tests across multiple browser instances, which helps to reduce overall execution time and quickly validate the application under test.

:::
