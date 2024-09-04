---
sidebar_position: 3
description: ''
---

# Page Object (UITAF Version)

The UITAF Page Object Model is conceptually similar to the traditional Selenium Page Object Model but has a distinct difference in its approach to defining elements.

## Selenium Page Object Model

- **Abstract WebElements:** In Selenium, Page Objects use abstract WebElement fields to represent elements on the page. These fields are typically defined as private or protected and are accessed through methods or direct field access.
- **Example:**

    ```java
    public class LoginPage {
        @FindBy(id = "username")
        private WebElement usernameField;

        @FindBy(id = "password")
        private WebElement passwordField;

        @FindBy(id = "loginButton")
        private WebElement loginButton;

        public void login(String username, String password) {
            usernameField.sendKeys(username);
            passwordField.sendKeys(password);
            loginButton.click();
        }
    }
    ```

## UITAF Page Object Model

- **Concrete Page Components:** Unlike Selenium, UITAF’s Page Object Model requires the use of concrete WebComponent instances rather than abstract WebElement fields. These Page Components are fully implemented, encapsulating the interactions with specific elements on the page.
- **Automatic Data Initialization:** A key advantage of the UITAF Page Object Model is its ability to automatically initialize Page Component fields with data. This is achieved through deserialization from an XML dataset, eliminating the need for methods with arguments to populate components. As a result, all Page Object fields are pre-configured with their specific data, simplifies the test data provisioning.
- **Advanced Data Population with setElementValue(PageComponent):** The provided setElementValue(PageComponent) method is highly sophisticated. This method not only populates a specific Page Component with the required data but also simulates realistic user behavior. Upon populating the field, the method verifies that the data has been entered correctly. If the initial attempt is unsuccessful, the method retries up to three times. Should the data entry still fail after these attempts, the test is marked as failed, and an exception is thrown. This approach reflects real-world scenarios where user input may not always be successful on the first try, thereby enhancing the reliability and robustness of UITAF-based tests. In cases where the entered data is mutated, and there is a need to validate which value should be present during component population, the setElementValue method will prioritize the Expected data type over the provided Data type. [(See Data Provisioning and Data Types)](pagecomponent.md#data-provisioning-and-data-types)
- **Example:**

```java
public class LoginPage extends PageObjectModel {
    @FindBy(id = "username")
    private WebComponent usernameField;

    @FindBy(id = "password")
    private WebComponent passwordField;

    @FindBy(id = "loginButton")
    private WebComponent loginButton;

    public void login() {
        setElementValue(usernameField);
        setElementValue(passwordField);
        loginButton.click();
    }
}
```

In summary, the UITAF Page Object Model not only simplifies the test setup process through automatic data initialization but also introduces a sophisticated mechanism for ensuring accurate data entry through the setElementValue(PageComponent) method. This capability, which mimics user behavior and ensures data integrity, significantly enhances the reliability and effectiveness of UITAF in test automation.

## Automating Boilerplate Code in Page Objects

The UITAF Page Object Model offers a powerful time-saving feature for handling repetitive tasks: the Automatic Population of all declared Page Components through a single method called autoFillPage(). This method significantly simplifies the process of populating Page Objects, especially in cases where a form contains numerous fields of various types.

For instance, if you have a form with 20 or more fields, instead of manually populating each field individually, the autoFillPage() method will automatically iterate over all the fields with initialized data, invoking the setElementValue command for each one. This automation reduces the need for boilerplate code and enhances efficiency.

In addition to autoFillPage(), UITAF provides the autoValidatePage() method, which automatically validates all declared Page Components within the Page Object against their expected data types. This ensures that the data entered into each component is accurate and meets the specified requirements.

For scenarios where custom handling of Page Components is required, UITAF includes the enumerateFields() method. This method allows you to iterate over all Page Components in the Page Object, providing the flexibility to implement your own mechanisms for dealing with these components. [(See Vehicle Information POM example)](test_lab/test_logic.md#vehicle-information-pom) and [(Summary POM example)](test_lab/test_logic.md#summary-pom)

