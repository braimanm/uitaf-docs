---
sidebar_position: 2
description: ''
---

# Page Component

## Introduction

From the UITAF perspective, a Page Component is a visible user interface element designed for interaction via keyboard or mouse. It presenting relevant information to the user and enabling interaction. A Page Component is a custom Java class implemented using the Selenium API, responsible for managing data exchange with this visual component. It is used as a field within a Page Object, which aggregates multiple Page Components to represent the functionality of a specific web page.

## UITAF Provided Page Components

UITAF offers several generic Page Components out of the box:

- **WebComponent:** A versatile component that can be used in place of other components when basic functionality is sufficient. It supports typing and retrieving values for text-based elements and can be used for buttons and other simple components.
- **SelectComponent:** A specialized component designed for interacting with basic select elements, such as dropdown menus.
- **CheckBox:** A fundamental Page Component for checkboxes, capable of setting the checked state and retrieving whether the checkbox is selected (true) or not (false).

Here is an example of how Page Components are declared within a UITAF Page Object. The Page Object class field is defined with a specific Page Component type, and the @FindBy Selenium annotation specifies the locator strategy for identifying the root web element of the component, referred to as coreElement in the context of the Page Object.

```java
@FindBy(css = "select#vehicleType")
private SelectComponent vehicleType;
@FindBy(css = "input#listPrice")
private WebComponent listPrice; 
@FindBy(xpath = "//label[.='Gender']/../p")
private RadioGroupComponent gender;
```


## Creating Custom Components

To develop a custom Page Component, you should create a Java class that extends UITAF’s PageComponent class. This custom Page Component class must implement four abstract methods inherited from its superclass:

1. **init():** Initializes the Page Component prior to its use.
2. **setValue():** Provides the Page Component with the specified data.
3. **getValue():** Retrieves the current value displayed by the Page Component.
4. **validateData(DataTypes):** Validates the Page Component’s value against the expected result.

In the previous example, we declared the **gender** field as a **RadioGroupComponent**. Let’s now create this component, which will represent a group of radio buttons that can accept only one value. The RadioGroupComponent will select a specific radio button based on the provided data.

```java title='RadioGroupComponent.java'
import ...

public class RadioGroupComponent extends PageComponent {

    @Override
    protected void init() {
    }

    @Override
    public void setValue() {
        coreElement.findElement(By.xpath(".//input[@value='" + getData() + "'])).click();
    }

    @Override
    public String getValue() {
        return coreElement.findElement(By.cssSelector("input:checked")).getAttribute("value");
    }

    @Override
    public void validateData(DataTypes dataTypes) {
        Assertions.assertThat(getValue()).isEqualTo(getData(dataTypes));
    }
}
```

The **init()** method is typically an empty method that must be declared, though it generally requires no additional logic. The **setValue()** method is responsible for assigning data to the component, with the data accessed via the **getData()** method from the PageComponent class. For example, if the provided data contains the value “Male,” the corresponding radio button is selected by clicking the input element with the required value. The **getValue()** method returns the value attribute of the checked input web element. The **validateData()** method uses an assertion library to ensure that the value matches the expected result.

## Data Provisioning and Data Types

Page Objects in UITAF are serializable to and from XML datasets. These datasets include data values for each Page Component declared as a field within a Page Object. The dataset comprises three distinct types of values:

- **Initial:** Used to validate the component when first landing on a specific page, before interacting with the Page Components.
- **Data:** Provided to the Page Component to simulate user input or interaction.
- **Expected:** Used to validate the outcome of interactions with the Page Component.

These data types serve as guidelines, but as a test automation developer, you have the flexibility to determine which type of data best suits your specific needs. To provide data for a specific Page Component in a Page Object, you need to include XML attributes for Initial and Expected values. For the Data value, you simply provide the value directly. For example:

```xml
<manufactureDate initial='' expected='2010/05/06' custom='custom value'>20100506</manufactureDate>
```

In this example:

- **initial=''** attribute is used to validate the initial state of the component when the specific web page is first visited, which in this case is empty.
- **expected='2010/05/06'** attribute defines the expected final value that should appear on the page after the value has been populated for validation purposes.
- The text content **20100506** represents the actual data value provided to the component for population.

:::note
The populated data can undergo mutation, where the input value is provided in one format but is transformed and presented differently. For instance, in a formatted date component, you might enter a date as 20100506, but it could be displayed as 2010/05/06. In this scenario, the Data type should retain the original input format, 20100506, while the Expected data type should represent the final, formatted date, 2010/05/06.
:::

In a custom Page Component, if you need to retrieve and utilize these data types, you should use the UITAF Page Component’s **getData(DataTypes)** method. The DataTypes enum provides the necessary values:

- For Initial data, use **getData(DataTypes.Initial)**.
- For Expected data, use **getData(DataTypes.Expected)**.
- To retrieve the actual data in a custom Page Component, you can use the **getData(DataTypes.Data)** method. Alternatively, you can use the method without arguments by calling **getData()**.

There is also an overloaded version of the getData(String) method, which can be used to retrieve arbitrary attributes in addition to the standard data types. For example, you can use this method to access custom attributes not covered by the **DataTypes** enum. Here’s how it can be utilized:

```java
String initialValue = getData("initial");
String expectedValue = getData("expected");
String dataValue = getData();
String customAttribute = getData("custom");
```

In this example, **getData("initial")**, **getData("expected")**, and **getData()** retrieve the corresponding values for Initial, Expected, and Data attributes, while **getData("custom")** retrieves any additional custom attributes specified in the XML tag.
