---
sidebar_position: 6
description: ''
---

# Reporting Facilities

UITAF integrates the open-source Allure reporting framework to capture events during test execution and generate detailed Allure reports. These reports can be hosted on various platforms, including CI tools like Jenkins.

<a href="/report/" target="_blank" rel="noopener noreferrer">**Click here to view Test Automation Report Example**</a>

## @Step annotation for methods

To include entries in the Allure report, annotate each method with the `@Step` annotation. This annotation creates a report entry for each annotated method, with the text provided in the `@Step` annotation serving as the entry description. If a method has arguments, these can also be reflected in the report. In this case, the @Step annotation should use placeholders to represent the arguments. The placeholders are formatted as `{0}` for the first argument, `{1}` for the second argument, and so on.

Here is an example:

```java
@Step("Populate field {0} with value {1}")
@Override
    protected void populateField(String fieldName, String value) {
        ...
    }
```

In this example:

- The `@Step` annotation is used to describe the action performed by the populateField method.
- `{0}` and `{1}` are placeholders for the fieldName and value arguments, respectively.

## @Features, @Stories, @Description

Test methods in UITAF can be annotated with @Features, @Stories, and @Description to group and label tests for better organization and reporting.

- @Features: This annotation is used to specify the feature or functionality being tested. It helps categorize tests based on high-level features of the application.

- @Stories: This annotation provides a more granular level of categorization by defining specific user stories or scenarios related to the feature being tested. It allows for tracking and reporting on individual aspects of a feature.

- @Description: This annotation allows for a detailed description of what the test method does. It provides additional context and clarity about the purpose and scope of the test.

Here is an example of how these annotations can be used:

```java
@Features("User Management")
@Stories("User login with valid credentials")
@Description("Tests the login functionality for users with valid credentials")
@Test
public void testUserLogin() {
    // Test implementation
}
```

In this example:

- @Features("User Management") categorizes the test under the user management feature.
- @Stories("User login with valid credentials") specifies the user story being tested.
- @Description("Tests the login functionality for users with valid credentials") provides a clear explanation of what the test method does.
These annotations enhance the organization of tests, making it easier to generate meaningful reports and track test execution based on features and user stories.

## Using Dataset Aliases for Reporting

When a single test method is executed with multiple datasets that validate various features and stories, UITAF provides a way to include these details in the report using aliases. UITAF supports the following aliases for reporting:

```xml
<aliases>
    <test-name>Test User Login</test-name>
    <test-description>Tests the login functionality for users with valid credentials</test-description>
    <test-features>User Management</test-features>
    <test-stories>User login with valid credentials</test-stories>
</aliases>
```

:::note

The reporting description, features, and stories can be distributed between the Test annotation and Dataset aliases. This approach allows some common reporting attributes to be associated with the test itself, while other reporting attributes can be provided through Dataset aliases.

:::

<a href="/report/" target="_blank" rel="noopener noreferrer">**Click here to view Test Automation Report Example**</a>
