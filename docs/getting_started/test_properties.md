---
sidebar_position: 4
description: ''
---

# Test Properties

The configuration of tests can be managed through several different mechanisms, allowing flexibility and control over how parameters are set and overridden. The mechanisms available for configuring tests include:

1. **Operating System Environment Variables:** Environment variables set at the OS level.
2. **Java Environment Variables:** Variables set through the Java command line or within the JVM.
3. **test.properties File:** A properties file within your project that contains key-value pairs for configuration.

## Precedence Order

When determining the final value of a parameter, the following precedence order is applied:

1. **Operating System Environment Variables:** These have the highest precedence. If a variable is set at the OS level, it will override any other settings.
2. **Java Environment Variables:** If no OS-level environment variable is found, the system will look for a corresponding Java environment variable.
3. **test.properties file:** If neither of the above variables is set, the value from the test.properties file will be used.

Because the test.properties file has the lowest precedence, its parameter values can be used as default values. These default values can then be overwritten by their corresponding OS or Java environment variables as needed. This setup allows you to define baseline configurations within the test.properties file and customize them in different environments without changing the file itself. Alternatively, you can opt out and choose not to include the test.properties file at all.

## Naming Conventions

The properties have different naming conventions between the test.properties file, Java Environment Variables, and OS Environment Variables:

    - In the test.properties file and Java Environment Variables, the naming conventions include a . (dot).
    - In OS Environment Variables, the . (dot) is replaced with an _ (underscore).
For example, the Java Environment Variable webdriver.browser.type=CHROME should be set as WEBDRIVER_BROWSER_TYPE=CHROME in OS Environment Variables.

## Example test.properties

```bash title="Example test.properties"
#These properties can be overwritten by their counterpart system variables where dot is replaced by underscore
#Ex: For Java parameter webdriver.browser.type use WEBDRIVER_BROWSER_TYPE

#webdriver.install - Install webdrivers on local machine prior to test execution
webdriver.install=true
webdriver.drivers.to.install=CHROME
#webdriver.browser.type - Browser type; one of the following values are accepted: FIREFOX, CHROME, EDGE, IE, SAFARI, or OPERA_BLINK. For Mobile tests, use IPHONE or ANDROID
webdriver.browser.type=CHROME

#webdriver.screen.size - Initial browser window size
webdriver.screen.size=1280x800
#timeout.page - Timeout for page load in seconds
timeout.page=30
#timeout.element - Timeout in seconds for web element to load or for any other web element action
timeout.element=30
#test.env - Test Environment to use for test
test.env=environments.xml:prod
#test.suites - List of test suites to execute
test.suites=suites/suite.xml

#report.folder - Where to save the report
#report.port - Report server port for viewing using browser
#report.show - To show report at the end of the test execution or not
report.show=true
#test.parallel.threads - Overwrite suite parallel execution
#test.default.retry - Default number of test retries
test.default.retry=2
```

:::warning

The test.properties file includes only predefined parameters and will not accept any additional arbitrary parameters entered. This ensures that only recognized and valid configurations are applied during test execution.

:::info

There is a way to add additional parameters, but it involves overwriting the ui.auto.core.support.TestProperties.java file in your project by recreating its package structure. By doing so, Maven will override the original file with your version of the same file.

:::

## Test Properties Parameters

1. webdriver.install (OS: WEBDRIVER_INSTALL)
    - Values: true, false
    - Description: If set to true, the specified WebDriver will be installed prior to test execution.
2. webdriver.drivers.to.install (OS: WEBDRIVER_DRIVERS_TO_INSTALL)
    - Values: A comma-separated, uppercase list of WebDrivers (e.g., CHROME, FIREFOX)
    - Description: Lists the WebDrivers to install before running the tests.
3. webdriver.browser.type (OS: WEBDRIVER_BROWSER_TYPE)
    - Values: Specific browser types like CHROME, FIREFOX, etc.
    - Description: Determines which browser to use for the current test execution.
4. webdriver.screen.size (OS: WEBDRIVER_SCREEN_SIZE)
    - Values: A string representing the initial browser window size (e.g., 1280x800)
    - Description: Sets the initial size of the browser window.
5. timeout.page (OS: TIMEOUT_PAGE)
    - Values: Time in seconds (e.g., 30)
    - Description: Specifies the maximum time to wait for a page to load.
6. timeout.element (OS: TIMEOUT_ELEMENT)
    - Values: Time in seconds (e.g., 30)
    - Description: Defines the maximum time to wait for a web element to be found.
7. test.env (OS: TEST_ENV)

    - Values: A file name and environment name (e.g., environments.xml:prod)
    - Description: Specifies the test environment file and the specific environment within it to use.
8. test.suites (OS: TEST_SUITES)
    - Values: A list of test suites (e.g., suites/suite.xml)
    - Description: Lists the test suites to be executed.
9. report.folder (OS: REPORT_FOLDER)
    - Values: Directory path (e.g., /reports)
    - Description: Specifies the directory where the resulting report will be saved.
10. report.port (OS: REPORT_PORT)
    - Values: Port number (e.g., 8080)
    - Description: If the test was executed locally, this specifies the port on which to host the report.
11. report.show (OS: REPORT_SHOW)
    - Values: true, false
    - Description: If set to true and the test was executed locally, this launches and loads the test execution report in the default web browser.
12. test.parallel.threads (OS: TEST_PARALLEL_THREADS)
    - Values: Integer value (e.g., 4)
    - Description: Overrides the suite's parallel thread execution number with the specified value.
13. test.default.retry (OS: TEST_DEFAULT_RETRY)
    - Values: Integer value (e.g., 2)
    - Description: Sets the default number of test retries for tests annotated with @Retry.
