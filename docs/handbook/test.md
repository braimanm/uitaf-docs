---
sidebar_position: 5
description: ''
---

# UITAF Test Execution

In UITAF, a test is represented as a TestNG class that extends the TestNGBase UITAF class. This base class is responsible for managing essential aspects of the testing environment, including WebDriver context, concurrency, and data handling. By extending TestNGBase, UITAF tests inherit these foundational capabilities, enabling them to focus on defining test scenarios while benefiting from built-in support for handling browser interactions, parallel test execution, and efficient data management.

## Test Context

The `TestContext` object in UITAF is a singleton with various functionalities. It can be accessed by invoking the `getContext()` method. Since `TestContext` is a singleton, only one instance exists per execution thread. In parallel test execution, each thread receives its own unique instance of `TestContext`. The initial call to `getContext()` will initialize the web browser and return the `TestContext` instance. Subsequent calls to `getContext()` will return the previously created instance, ensuring consistency throughout the test execution.

`TestContext` encapsulates the Selenium WebDriver, which can be retrieved using the `getDriver()` method. Additionally, TestContext manages various timeouts for page and element loading, providing control over how long the framework waits for pages to become ready and elements to be found and visible.


## Data Provisioning

A common pattern in UITAF tests involves creating an instance of a Page Object or Domain Object and then calling its methods. During the initialization of a Page Object or Domain Object, a dataset must be provided to deserialize the data into a concrete instance of the object.

The syntax for this process is as follows:

```java
VehicleInsuranceDO vehicleInsuranceDO = new VehicleInsuranceDO(getContext()).fromResource("data/motorcycle-data.xml");
```

In this example, VehicleInsuranceDO is instantiated using the getContext() method, and the fromResource() method is used to load and deserialize the dataset from the specified XML file. The result is a fully initialized Domain Object, with WebDriver and all fields populated with data from the dataset.

Below is a complete test example that demonstrates how to create and validate a new insurance policy using UITAF:

```java
public class TestInsurancePolicy extends TestNGBase {

    @Parameters("data-set")
    @Test
    public void testCreatePolicy(@Optional("data/random-data.xml") String dataSet) {
        VehicleInsuranceDO vehicleInsuranceDO = new VehicleInsuranceDO(getContext()).fromResource(dataSet);
        vehicleInsuranceDO.createNewInsurancePolicy();
        vehicleInsuranceDO.validateSummary();
    }

}
```

In this example:

- TestInsurancePolicy extends TestNGBase, which manages WebDriver context, concurrency, and data handling.
- @Parameters annotation is used to specify the dataset parameter for the test. The default value is "data/random-data.xml", but it can be overridden by providing a different dataset file.
- testCreatePolicy method performs the following steps:
  - Instantiates VehicleInsuranceDO using getContext() and initializes it with data from the specified XML file via fromResource().
  - Calls createNewInsurancePolicy() to perform the actions required to create the insurance policy.
  - Calls validateSummary() to ensure the policy creation process was successful and the summary is as expected.

## TestNG Suite File

The test example provided can be executed with various datasets, allowing for a data-driven testing approach. The dataset not only provides data but also influences the flow of the test. Below is an example of a TestNG suite file that runs the same test with four different datasets:

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >

<suite name="Policy suite" verbose="1" parallel="tests">

    <test name="Automobile Policy Creation">
        <parameter name="data-set" value="data/automobile-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>

    <test name="Truck Policy Creation">
        <parameter name="data-set" value="data/truck-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>

    <test name="Motorcycle Policy Creation">
        <parameter name="data-set" value="data/motorcycle-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>

    <test name="Random Policy Creation">
        <parameter name="data-set" value="data/random-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>


</suite>
```

In this example:

- The `<suite>` tag defines the suite name as "Policy Suite" and sets the verbosity level and parallel execution mode.
- Each `<test>` tag represents a separate test configuration, specifying a different dataset through the `<parameter>` tag.
- The data-set parameter value is set to different XML files for each test, allowing the TestInsurancePolicy class to be executed with various datasets.
- The `<classes>` tag lists the class to be executed for each test configuration, in this case, com.yourcompany.example.tests.TestInsurancePolicy.
This TestNG suite file enables the execution of the same test with different datasets, facilitating comprehensive testing across various scenarios.

