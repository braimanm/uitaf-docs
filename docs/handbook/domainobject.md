---
sidebar_position: 4
description: ''
---

# Domain Object

Domain Objects in UITAF share many similarities with Page Objects but serve a distinct purpose within the framework. While Page Objects aggregate individual Page Components to represent specific web elements, Domain Objects aggregate multiple Page Objects. This design enables the development of business methods that span several Page Objects, providing a solution for testing complex business workflows that involve multiple pages.

For instance, when testing a business process that spans several pages or forms, a Domain Object can encapsulate all relevant Page Objects and their associated data. This approach streamlines the management of tests across multiple pages, ensuring that interactions and workflows are efficiently executed within the UITAF framework.

Furthermore, all aspects of dataset generation and deserialization, including the use of data generators and JEXL expressions, are applicable to Domain Objects, ensuring consistency in data handling across both object types. Dataset aliases are also accessible across different Page Objects within a Domain Object, reducing errors associated with manual data duplication and enhancing the efficiency of test data management.

## Example of Domain Object: VehicleInsuranceDO

The VehicleInsuranceDO class exemplifies a Domain Object in UITAF, encapsulating multiple Page Objects and managing their interactions to represent a comprehensive business process.

```java title='VehicleInsuranceDO.java'
package com.yourcompany.example.domainobjects;

@XStreamAlias("vehicle-insurance-domain-object")
public class VehicleInsuranceDO extends DomainObjectModel {
    private AliasedData appUrl;
    private VehicleInfoPO vehicleInfoPO;
    private ClientInfoPO clientInfoPO;
    private SummaryPO summaryPO;

    private VehicleInsuranceDO() {}

    public VehicleInsuranceDO(TestContext context) {
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

### Breakdown of VehicleInsuranceDO

- Class Definition and Inheritance:
  - VehicleInsuranceDO extends DomainObjectModel, indicating it inherits from a base class designed for Domain Objects in UITAF.
- Fields:
  - appUrl: An instance of AliasedData that holds the URL for navigation.
  - vehicleInfoPO, clientInfoPO, summaryPO: Instances of Page Objects (VehicleInfoPO, ClientInfoPO, and SummaryPO, respectively) that manage different sections of the insurance policy process.
- Constructors:
  - Default Constructor: Private to prevent direct instantiation.
  - Parameterized Constructor: Initializes the VehicleInsuranceDO with a TestContext, which is essential for accessing test data and configuration.
- Methods:
  - navigate(): Directs the web driver to the URL specified in appUrl.
  - createNewInsurancePolicy(): Manages the process of creating a new insurance policy by:
    - Navigating to the application URL.
    - Initializing and populating the vehicleInfoPO Page Object, then proceeding to the next step.
    - Initializing and populating the clientInfoPO Page Object, then submitting the information.
  - validateSummary(): Initializes the summaryPO Page Object and performs validation to ensure the summary information is correct.

:::info

This Domain Object represents the process of creating and validating a vehicle insurance policy. By combining the VehicleInfoPO, ClientInfoPO, and SummaryPO Page Objects, VehicleInsuranceDO manages all steps of the insurance policy process in one place. This not only simplifies test execution and interaction management across multiple pages but also creates a Domain-Specific Language (DSL) that can be easily understood by any business stakeholder in the company. This DSL approach helps bridge the gap between technical and business perspectives, ensuring clarity and alignment across teams.

:::
