---
sidebar_position: 1
---

# Test Logic Overview

The test example is designed to validate a simple <a href="/test/" target="_blank" rel="noopener noreferrer">**Vehicle Insurance Quoting application**</a> created to demonstrate the capabilities of UITAF.

## Application under the test logic

The Vehicle insurance quoting application consists of three pages:

1. **Vehicle Information Page:** Users input vehicle details, with the number of visible fields adjusting based on the selected vehicle type. For instance, choosing “Automobile” will show fewer fields, while selecting “Truck” or “Motorcycle” will reveal additional fields. The application ensures that all required fields are completed before allowing the user to proceed. If any mandatory fields are missing, error messages will appear next to those fields, blocking progression until all required information is provided. After the “Next” button is clicked and all required fields are filled out, the application will move to the Client Information form.

2. **Client Information Page:** Users input the client related information. Same validation rooles for mandatory fields is setup the same way as previous page. Once the necessary client information is entered and submitted, the final Summary page is presented.

3. **Summary Page:** This page consolidates and displays all previously entered information, providing a comprehensive overview of the data submitted in the earlier steps.

## Test Automation Design Flow

Since we have three distinct application pages, we need to introduce three separate Page Object Model classes.

### Vehicle Information POM

```java title='VehicleInfoPO.java'
package com.yourcompany.example.pageobjects;

import ...

@XStreamAlias("vehicle-info-page-object")
public class VehicleInfoPO extends PageObjectModel {
    @FindBy(css = "select#vehicleType")
    private SelectComponent vehicleType;
    @FindBy(css = "select#make")
    private SelectComponent make;
    @FindBy(css = "input#enginePerformance")
    private WebComponent enginePerformance;
    @FindBy(css = "input#dateOfManufacture")
    private DateComponent manufacturerDate;
    @FindBy(css = "input#numberOfSeats")
    private WebComponent seats;
    @FindBy(css = "select#fuelType")
    private SelectComponent fuelType;
    @FindBy(css = "input#listPrice")
    private WebComponent listPrice;
    @FindBy(css = "input#licensePlateNumber")
    private WebComponent licensePlate;
    @FindBy(css = "input#annualMileage")
    private WebComponent annualMileage;
    //Truck related fields
    @FindBy(css = "input#payload")
    private WebComponent payload;
    @FindBy(css = "input#totalWeight")
    private WebComponent totalWeight;
    //Motorcycle related fields
    @FindBy(css = "input#model")
    private WebComponent model;
    @FindBy(css = "input#cylinderCapacity")
    private WebComponent cylinderCapacity;
    @Data(skip = true)
    private WebComponent nextButton;

    @Step("Populate Vehicle Info form with provided data")
    public void populate() {
        autoFillPage();
    }

    @Step("Click Next Button")
    public void next() {
        nextButton.click();
        WebDriverUtils.getWebDriverWait().until(ExpectedConditions.invisibilityOfElementLocated(nextButton.getLocator()));
    }

    //Generate report entry for each populated component
    @Override
    @Step("Populate field \"{0}\" with value \"{1}\"")
    protected void reportForAutoFill(String fieldName, String value) {
        super.reportForAutoFill(fieldName, value);
    }

}

```

This Page Object Model **(POM)** class adheres to the **Page Object design pattern** and represents the Vehicle Information page. Each POM class in the UITAF framework should extend the **PageObjectModel** class. The fields within the POM class correspond to visible and interactable components on the page. Each field is annotated with the **@FindBy** annotation, which is used to locate web elements using **CSS**, **XPath**, or other valid Selenium selectors.

The field types are components that can either be built-in UITAF components, such as **PageComponent** and **SelectComponent**, or user-defined components located in the components package. In this specific POM example, we use:

- **PageComponent**, a generic component similar to Selenium’s WebElement,
- **SelectComponent** for handling dropdown selections, and
- **DateComponent**, a user-defined component responsible for populating date fields.

Additionally, the POM class includes methods that expose the functionality of the page object and provide additional behaviors:

- **populate():** This method is particularly significant as it invokes UITAF’s built-in **autoFillPage()** method. This method automatically populates all fields declared in the POM with the specified dataset. During population, each field’s visibility is checked. If a field is not visible, UITAF will wait for a duration specified in the test.properties file. If the field remains invisible beyond this time, the test will fail. When a component is located and visible, UITAF attempts to populate the field with the given data. Each attempt to enter data is evaluated, and if the data is entered incorrectly, UITAF will retry up to three times. This behavior mimics human interaction by accounting for potential data entry issues and retries, thus enhancing the stability and reliability of UITAF tests.

- **next():** This method handles clicking the **“Next”** button and verifies that navigation to the subsequent page has occurred. It waits and checks that the **“Next”** button is no longer visible to confirm that the page transition is complete. If mandatory fields are not filled in, the **“Next”** button will remain visible after the click, causing the test to fail.

- **reportForAutoFill(String fieldName, String value):** This method overrides the corresponding method in the inherited PageObjectModel class in UITAF. It is invoked for reporting purposes each time the **autoFillPage()** method populates a field. This overridden method is automatically called by **autoFillPage()** with the field name and the populated value as arguments, which are then used by the reporting facility. The **@Step** annotation leverages these arguments to generate a report entry. The method itself is empty, serving solely as a reporting mechanism.

### Client Information POM

```java title='ClientInfoPO.java'
package com.yourcompany.example.pageobjects;

import ...

@XStreamAlias("client-info-page-object")
public class ClientInfoPO extends PageObjectModel {
    private WebComponent firstName;
    private WebComponent lastName;
    private DateComponent dateOfBirth;
    private SelectComponent gender;
    private WebComponent streetAddress;
    private WebComponent country;
    private WebComponent zipCode;
    private WebComponent city;
    private WebComponent occupation;
    private WebComponent hobbies;
    private WebComponent website;
    private FileUploadComponent picture;
    @Data(skip = true)
    private WebComponent submitButton;

    @Step("Populate Client Info form with provided data")
    public void populate() {
        autoFillPage();
    }

    @Step("Click Submit Button")
    public void submit() {
        submitButton.click();
        WebDriverUtils.getWebDriverWait().until(ExpectedConditions.invisibilityOfElementLocated(submitButton.getLocator()));
    }

    //Generate report entry for each populated component
    @Override
    @Step("Populate field \"{0}\" with value \"{1}\"")
    protected void reportForAutoFill(String fieldName, String value) {
        super.reportForAutoFill(fieldName, value);
    }

}

```

The Client Information POM follows the same development pattern as the previous one. It includes a populate() method that automatically populates all the components on the page, along with other methods similar to those in the previously discussed POM. The distict detail in this POM class is usage of user-defined custom File Upload component:

- **FileUploadComponent:** This custom component manages the uploading of picture files by accepting data representing the file name and its path relative to the project’s resources directory. It is located in the components package folder.

### Summary POM

```java title='SummaryPO.java'
package com.yourcompany.example.pageobjects;

import ...

public class SummaryPO extends PageObjectModel {
    //Vehicle Info related fields
    @FindBy(xpath = "//strong[.='Type of Vehicle:']/../span")
    private WebComponent vehicleType;
    @FindBy(xpath = "//strong[.='Make:']/../span")
    private WebComponent make;
    @FindBy(xpath = "//strong[.='Engine Performance [kW]:']/../span")
    private WebComponent enginePerformance;
    @FindBy(xpath = "//strong[.='Date of Manufacture:']/../span")
    private WebComponent manufacturerDate;
    @FindBy(xpath = "//strong[.='Number of Seats:']/../span")
    private WebComponent seats;
    @FindBy(xpath = "//strong[.='Fuel Type:']/../span")
    private WebComponent fuelType;
    @FindBy(xpath = "//strong[.='List Price [$]:']/../span")
    private WebComponent listPrice;
    @FindBy(xpath = "//strong[.='License Plate Number:']/../span")
    private WebComponent licensePlate;
    @FindBy(xpath = "//strong[.='Annual Mileage [mi]:']/../span")
    private WebComponent annualMileage;
    //Truck related fields
    @FindBy(xpath = "//strong[.='Payload [kg]:']/../span")
    private WebComponent payload;
    @FindBy(xpath = "//strong[.='Total Weight [kg]:']/../span")
    private WebComponent totalWeight;
    //Motorcycle related fields
    @FindBy(xpath = "//strong[.='Model:']/../span")
    private WebComponent model;
    @FindBy(xpath = "//strong[.='Cylinder Capacity [ccm]:']/../span")
    private WebComponent cylinderCapacity;

    //Client Info related fields
    @FindBy(xpath = "//strong[.='First Name:']/../span")
    private WebComponent firstName;
    @FindBy(xpath = "//strong[.='Last Name:']/../span")
    private WebComponent lastName;
    @FindBy(xpath = "//strong[.='Date of Birth:']/../span")
    private WebComponent dateOfBirth;
    @FindBy(xpath = "//strong[.='Gender:']/../span")
    private WebComponent gender;
    @FindBy(xpath = "//strong[.='Street Address:']/../span")
    private WebComponent streetAddress;
    @FindBy(xpath = "//strong[.='Country:']/../span")
    private WebComponent country;
    @FindBy(xpath = "//strong[.='Zip Code:']/../span")
    private WebComponent zipCode;
    @FindBy(xpath = "//strong[.='City:']/../span")
    private WebComponent city;
    @FindBy(xpath = "//strong[.='Occupation:']/../span")
    private WebComponent occupation;
    @FindBy(xpath = "//strong[.='Hobbies:']/../span")
    private WebComponent hobbies;
    @FindBy(xpath = "//strong[.='Website:']/../span")
    private WebComponent website;
    @FindBy(xpath = "//strong[.='Picture:']/../span")
    private WebComponent picture;

    @Step("Validate Summary Page")
    public void validate() {
        enumerateFields((pageComponent, field) -> {
            if (pageComponent.getData() != null && !pageComponent.getData().isEmpty()) {
                reportForValidation(field.getName(), pageComponent.getData());
                pageComponent.validateData(DataTypes.Data);
            } else {
                validateFieldIsNotDisplayed(field.getName(), pageComponent);
            }
        });
    }

    @Step("Validate that the \"{0}\" field has the value \"{1}\"")
    private void reportForValidation(String name, String value) {
        hideStepParams();
    }

    @Step("Validate that the \"{0}\" field is hidden")
    private void validateFieldIsNotDisplayed(String fieldName, PageComponent component) {
        hideStepParams();
        Assertions.assertThat(WebDriverUtils.isDisplayed(component))
                .withFailMessage("Field " + fieldName + " is displayed but should be hidden!").isFalse();
    }

}

```

The final POM, which represents the Summary page, includes relevant page components with specific locators and validation logic. This logic verifies all previously entered values from earlier pages. Additionally, it contains validation to ensure that certain fields are visible or hidden based on the selected vehicleType field.

- **validate():** This method utilizes UITAF’s **enumerateFields()** method to traverse through all page components and perform a series of validations. If data is provided for a specific component, the method checks that the field is visible and contains the correct value. On the other hand, if no data is provided or the data is empty, the method verifies that the component is not visible on the page. The provided test dataset drives these validations accordingly.

- **reportForValidation(String name, String value):** This method is called by the **validate()** method solely for reporting purposes.

- **validateFieldIsNotDisplayed(String fieldName, PageComponent component):** This method is invoked by the **validate()** method when no data is provided for a component. It performs an assertion to ensure that the specified component is not visible on the page.

### Vehicle Insurance Domain Object Model

The Domain Object model (DO) is a design pattern introduced by UITAF to provide business-oriented methods or Domain-Specific Language (DSL). It is also used for consolidating multiple POMs for aggregation. In our business scenario, we need to validate a business-specific activity referred to by stakeholders as “Create New Insurance Policy.” This involves validating different scenarious, such as creating vehicle insurance for automobiles, trucks, and motorcycles.

To handle this, we will create a VehicleInsuranceDO. The Domain Object is a Java class with fields representing the POMs that are part of the common business transaction. Each vehicle type requires different scenarios and data to validate various possibilities, making the VehicleInsuranceDO essential for managing these validations effectively.

```java title='VehicleInsuranceDO.java'
package com.yourcompany.example.domainobjects;

import ...

@XStreamAlias("vehicle-insurance-domain-object")
public class VehicleInsuranceDO extends DomainObjectModel {
    private AliasedData appUrl;
    private VehicleInfoPO vehicleInfoPO;
    private ClientInfoPO clientInfoPO;
    private SummaryPO summaryPO;

    private VehicleInsuranceDO() {}

    public VehicleInsuranceDO(WebDriverContext context) {
        this.context = context;
    }

    private void navigate() {
        getDriver().get(appUrl.getData());
    }

    public void createNewInsurancePolicy() {
        navigate();

        vehicleInfoPO.initPage(getContext());
        vehicleInfoPO.populate();
        vehicleInfoPO.next();

        clientInfoPO.initPage(getContext());
        clientInfoPO.populate();
        clientInfoPO.submit();
    }

    public void validateSummary() {
        summaryPO.initPage(getContext());
        summaryPO.validate();
    }
}

```

Method breakdown for vehicleInsuranceDO:


- **VehicleInsuranceDO(TestContext context) Constructor:** This constructor initializes the Domain Object with the provided context, which represents the browser instance (Selenium WebDriver) and various properties needed to run the test.

:::danger
If any non-default constructors are declared, the empty default constructor should be declared as well. If the default constructor is not used anywhere, it can be declared with the private modifier. The default constructor is essential for generating a dataset template, which will be discussed in the next topic.
:::

- **navigate():** This method is used to navigate to the Vehicle Insurance web application url.

- **createNewInsurancePolicy():** This method handles the creation of a new insurance policy by initializing each POM, populating the relevant fields, and advancing through the pages by clicking the appropriate buttons until the summary page is reached.

- **validateSummary():** This method initializes the Summary POM and invokes its validation logic.

### UITAF Test Data provisioning

UITAF is a distinctive framework designed to eliminate the guesswork involved in test data creation. Each artifact in UITAF, whether a POM or Domain Object, can be executed using the IntelliJ IDE. Running a Domain Object or POM generates an XML dataset template, which can be customized with static or dynamic data for testing purposes.

To generate data for the VehicleInsuranceDO, [follow these steps](../handbook/pageobject.md#data-generation)

```xml title='automobile-data.xml'
<?xml version="1.0" encoding="UTF-8"?>

<vehicle-insurance-domain-object>
    <aliases>
        <url>${env.getUrl()}</url>
        <vehicleType>Automobile</vehicleType>
        <make>Audi</make>
        <enginePerformance>192</enginePerformance>
        <manufacturerDate>2023-10-12</manufacturerDate>
        <seats>5</seats>
        <fuelType>Petrol</fuelType>
        <listPrice>60000</listPrice>
        <licensePlate>ABC123</licensePlate>
        <annualMileage>10000</annualMileage>
        <firstName>John</firstName>
        <lastName>Brown</lastName>
        <dateOfBirth>1975-11-18</dateOfBirth>
        <gender>Male</gender>
        <streetAddress>101 Big Street</streetAddress>
        <country>USA</country>
        <zipCode>10010</zipCode>
        <city>New York</city>
        <occupation>Business Analyst</occupation>
        <hobbies>Cars Collector</hobbies>
        <website>www.cars.com</website>
    </aliases>
    <appUrl>${url}</appUrl>
    <vehicleInfoPO>
        <vehicleType>${vehicleType}</vehicleType>
        <make>${make}</make>
        <enginePerformance>${enginePerformance}</enginePerformance>
        <manufacturerDate>${manufacturerDate}</manufacturerDate>
        <seats>${seats}</seats>
        <fuelType>${fuelType}</fuelType>
        <listPrice>${listPrice}</listPrice>
        <licensePlate>${licensePlate}</licensePlate>
        <annualMileage>${annualMileage}</annualMileage>
    </vehicleInfoPO>
    <clientInfoPO>
        <firstName>${firstName}</firstName>
        <lastName>${lastName}</lastName>
        <dateOfBirth>${dateOfBirth}</dateOfBirth>
        <gender>${gender}</gender>
        <streetAddress>${streetAddress}</streetAddress>
        <country>${country}</country>
        <zipCode>${zipCode}</zipCode>
        <city>${city}</city>
        <occupation>${occupation}</occupation>
        <hobbies>${hobbies}</hobbies>
        <website>${website}</website>
        <picture>data/face.png</picture>
    </clientInfoPO>
    <summaryPO>
        <vehicleType>${vehicleType}</vehicleType>
        <make>${make}</make>
        <enginePerformance>${enginePerformance}</enginePerformance>
        <manufacturerDate>${manufacturerDate}</manufacturerDate>
        <seats>${seats}</seats>
        <fuelType>${fuelType}</fuelType>
        <listPrice>${listPrice}</listPrice>
        <licensePlate>${licensePlate}</licensePlate>
        <annualMileage>${annualMileage}</annualMileage>
        <firstName>${firstName}</firstName>
        <lastName>${lastName}</lastName>
        <dateOfBirth>${dateOfBirth}</dateOfBirth>
        <gender>${gender}</gender>
        <streetAddress>${streetAddress}</streetAddress>
        <country>${country}</country>
        <zipCode>${zipCode}</zipCode>
        <city>${city}</city>
        <occupation>${occupation}</occupation>
        <hobbies>${hobbies}</hobbies>
        <website>${website}</website>
        <picture>face.png</picture>
    </summaryPO>
</vehicle-insurance-domain-object>
```

This XML dataset file includes an aliases section that defines aliases. Aliases function like variables, holding values that can be used across your dataset or even across multiple datasets during test execution.

Values can be provided directly for each field, such as ```<firstName>John</firstName>```. However, if the same value needs to be replicated in multiple fields, using an alias helps avoid errors. Aliases are represented with the notation ```xml ${...}```. For example, to embed the alias firstName, you would write ```<firstName>${firstName}</firstName>```.

Alias resolution occurs in the Aliases section of the XML dataset, where you can specify static values and dynamic expressions. These expressions may include data generators that produce random data or valid JEXL expressions that perform various tasks, such as connecting to databases or invoking services to retrieve data for use in your tests.

For example, you can use random data generators to produce unique data each time you run the test. This illustrates how random data generation can be incorporated into your test scenarios.

```xml title='random-data.xml'
<?xml version="1.0" encoding="UTF-8"?>

<vehicle-insurance-domain-object>
    <aliases>
        <url>${env.getUrl()}</url>
        <vehicleType>$[CUSTOM_LIST('','Automobile,Truck,Motorcycle')]</vehicleType>
        <make>$[CUSTOM_LIST('','Audi,BMW,Ford,Honda,Mazda,Mercedes Benz,Nissan,Opel,Porsche,Renault,Skoda,Suzuki,Toyota,Volkswagen,Volvo')]</make>
        <enginePerformance>$[NUMBER('#','50,500')]</enginePerformance>
        <manufacturerDate>$[DATE('yyyy-MM-dd','2000/01/01|2024/12/31|yyyy/MM/dd')]</manufacturerDate>
        <seats>$[NUMBER('#','1,6')]</seats>
        <fuelType>$[CUSTOM_LIST('','Petrol,Diesel,Electric Power,Gas,Other')]</fuelType>
        <listPrice>$[NUMBER('#','1000,100000')]</listPrice>
        <licensePlate>$[ALPHANUMERIC('(A)(B)(C)(D)-[a][b][c]','')]</licensePlate>
        <annualMileage>$[NUMBER('#','1000,100000')]</annualMileage>
        <firstName>$[HUMAN_NAMES('{M}','')]</firstName>
        <lastName>$[HUMAN_NAMES('{S}','')]</lastName>
        <dateOfBirth>$[DATE('yyyy-MM-dd','1960/01/01|2003/12/31|yyyy/MM/dd')]</dateOfBirth>
        <gender>$[CUSTOM_LIST('','Male,Female,Other')]</gender>
        <address>${AddressGen.generateAddress()}</address>
        <streetAddress>${address.streetNumber + " " + address.streetName}</streetAddress>
        <country>${address.country}</country>
        <zipCode>${address.postalCode}</zipCode>
        <city>${address.city}</city>
        <occupation>$[CUSTOM_LIST('','Software Developer,Graphic Designer,Electrician,Chef,Teacher,Nurse,Pilot,Photographer,Accountant')]</occupation>
        <hobbies>$[CUSTOM_LIST('','Reading,Hiking,Painting,Cooking,Gardening,Photography,Traveling,Playing Guitar,Writing,Biking,Fishing')]</hobbies>
        <website>$[WORD('https://{a}{b}.com','')]</website>

        <payload>${vehicleType.equals("Truck") ? "116450" : ""}</payload>
        <totalWeight>${vehicleType.equals("Truck") ? "125000" : ""}</totalWeight>

        <model>${vehicleType.equals("Motorcycle") ? "Gold Wing DCT" : ""}</model>
        <cylinderCapacity>${vehicleType.equals("Motorcycle") ? "1833" : ""}</cylinderCapacity>
    </aliases>
    <appUrl>${url}</appUrl>
    <vehicleInfoPO>
        <vehicleType>${vehicleType}</vehicleType>
        <make>${make}</make>
        <enginePerformance>${enginePerformance}</enginePerformance>
        <manufacturerDate>${manufacturerDate}</manufacturerDate>
        <seats>${seats}</seats>
        <fuelType>${fuelType}</fuelType>
        <listPrice>${listPrice}</listPrice>
        <licensePlate>${licensePlate}</licensePlate>
        <annualMileage>${annualMileage}</annualMileage>
        <payload>${payload}</payload>
        <totalWeight>${totalWeight}</totalWeight>
        <model>${model}</model>
        <cylinderCapacity>${cylinderCapacity}</cylinderCapacity>
    </vehicleInfoPO>
    <clientInfoPO>
        <firstName>${firstName}</firstName>
        <lastName>${lastName}</lastName>
        <dateOfBirth>${dateOfBirth}</dateOfBirth>
        <gender>${gender}</gender>
        <streetAddress>${streetAddress}</streetAddress>
        <country>${country}</country>
        <zipCode>${zipCode}</zipCode>
        <city>${city}</city>
        <occupation>${occupation}</occupation>
        <hobbies>${hobbies}</hobbies>
        <website>${website}</website>
        <picture>data/face.png</picture>
    </clientInfoPO>
    <summaryPO>
        <vehicleType>${vehicleType}</vehicleType>
        <make>${make}</make>
        <enginePerformance>${enginePerformance}</enginePerformance>
        <manufacturerDate>${manufacturerDate}</manufacturerDate>
        <seats>${seats}</seats>
        <fuelType>${fuelType}</fuelType>
        <listPrice>${listPrice}</listPrice>
        <licensePlate>${licensePlate}</licensePlate>
        <annualMileage>${annualMileage}</annualMileage>
        <firstName>${firstName}</firstName>
        <lastName>${lastName}</lastName>
        <dateOfBirth>${dateOfBirth}</dateOfBirth>
        <gender>${gender}</gender>
        <streetAddress>${streetAddress}</streetAddress>
        <country>${country}</country>
        <zipCode>${zipCode}</zipCode>
        <city>${city}</city>
        <occupation>${occupation}</occupation>
        <hobbies>${hobbies}</hobbies>
        <website>${website}</website>
        <picture>face.png</picture>
        <payload>${payload}</payload>
        <totalWeight>${totalWeight}</totalWeight>
        <model>${model}</model>
        <cylinderCapacity>${cylinderCapacity}</cylinderCapacity>
    </summaryPO>
</vehicle-insurance-domain-object>
```

### Test Class

The test class serves as the entry point to our test, as it contains all the test methods. In our case, there is only one simple test, which creates an instance of our Domain Object and invokes its methods.

The test class is a TestNG-related class, utilizing the TestNG @Test annotation. For debugging purposes, the test is annotated with an optional parameter that specifies the dataset. This allows us to change the dataset to any existing one, and the test will run accordingly. The optional parameter is used only during debugging and is not included in formal test execution.

```java title='TestInsurancePolicy.java'
package com.yourcompany.example.tests;

import ...

public class TestInsurancePolicy extends TestNGBase {

    @Features("Insurance Policy")
    @Stories("User creates new insurance policy quote")
    @Parameters("data-set")
    @Test
    public void testCreatePolicy(@Optional("data/random-data.xml") String dataSet){
        VehicleInsuranceDO vehicleInsuranceDO = new VehicleInsuranceDO(getContext()).fromResource(dataSet);
        vehicleInsuranceDO.createNewInsurancePolicy();
        vehicleInsuranceDO.validateSummary();
    }

}
```

### TestNG Suite File

The TestNG suite file is utilized to execute a collection of test cases for a specific feature as a suite. This file includes the declaration of the test classes to be invoked and the datasets to be used for specific test cases. The test cases can be executed sequentially or in parallel, depending on the configuration. For more detailed information and best practices, please consult the [TestNG framework documentation](https://testng.org/). It provides comprehensive guidance on how to structure, manage, and execute your test cases effectively.

In this scenario, a single test class is executed with different datasets, each designed to test a specific scenario of the **"Create Vehicle Insurance Policy"** functionality. The example below shows a suite file that runs five distinct scenarios for the **"Create Vehicle Insurance Policy"** functionality: **Automobile**, **Truck**, **Motorcycle**, and two variations of randomly generated vehicle insurance—one for **BDD** and one **without BDD**.

```xml title='suite.xml'
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >

<suite name="Policy suite" verbose="1" parallel="tests">

    <test name="Automobile Policy Quote">
        <parameter name="data-set" value="data/automobile-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>

    <test name="Truck Policy Quote">
        <parameter name="data-set" value="data/truck-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>

    <test name="Motorcycle Policy Quote">
        <parameter name="data-set" value="data/motorcycle-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>

    <test name="Random Policy Quote">
        <parameter name="data-set" value="data/random-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicy"/>
        </classes>
    </test>

    <test name="BDD Random Policy Quote">
        <parameter name="data-set" value="data/random-data.xml"/>
        <classes>
            <class name="com.yourcompany.example.tests.TestInsurancePolicyBDD"/>
        </classes>
    </test>


</suite>
```

This concludes the explanation of the Automation Example Test. For further topics, please refer to the Handbook.
