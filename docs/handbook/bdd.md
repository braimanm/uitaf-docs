---
sidebar_position: 7
description: ''
---

# BDD (UITAF Way)

Behavior Driven Development (BDD) is a popular collaboration tool used to specify, develop, and test user stories in plain English. While frameworks like Cucumber are commonly associated with BDD for writing automated test cases, it is important to note that BDD is not tied to Cucumber; the same concept can be implemented in different ways.

UITAF offers a different approach to BDD by providing a simplified BDD-style DSL for writing test automation. This DSL enables the execution and reporting of user stories written in a Gherkin-like format, offering a streamlined and flexible alternative to traditional BDD frameworks like Cucumber. By doing so, UITAF retains the key principles of BDD while enhancing efficiency in test automation.

## BDD Style Domain Object

Since the UITAF Domain Object represents business logic, it can be implemented similarly to a step definition (also known as glue code) in Cucumber. However, the key distinction between a regular Domain Object and a BDD Domain Object lies in the granularity of the steps. A BDD Domain Object should align closely with the user stories, meaning that for each line in a Gherkin scenario, there should be a corresponding method declared in the BDD Domain Object. This ensures that each step of the user story is clearly defined and executable within the test automation framework, preserving the clarity and intent of the BDD approach while integrating business logic.

Below is an example of the Domain Object for our Vehicle Insurance Quote example application, as outlined in the documentation [here](/docs/test_lab/test_logic.md#vehicle-insurance-domain-object-model). We will now refactor this Domain Object to align with Behavior-Driven Development (BDD) practices.

```java title='VehicleInsuranceBDD.java'
package com.yourcompany.example.domainobjects;

import com.braimanm.ui.auto.context.WebDriverContext;
import com.braimanm.ui.auto.pagecomponent.AliasedData;
import com.braimanm.uitaf.support.DomainObjectModel;
import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.yourcompany.example.pageobjects.ClientInfoPO;
import com.yourcompany.example.pageobjects.SummaryPO;
import com.yourcompany.example.pageobjects.VehicleInfoPO;
import io.qameta.allure.Param;
import io.qameta.allure.Step;
import static io.qameta.allure.model.Parameter.Mode.*;

@XStreamAlias("vehicle-insurance-domain-object")
public class VehicleInsuranceBDD extends DomainObjectModel {
    private AliasedData appUrl;
    private VehicleInfoPO vehicleInfoPO;
    private ClientInfoPO clientInfoPO;
    private SummaryPO summaryPO;

    private VehicleInsuranceBDD() {}

    public VehicleInsuranceBDD(WebDriverContext context) {
        this.context = context;
    }

    @Step("{0} the user is on Vehicle Insurance page")
    public void is_on_vehicle_insurance_page(@Param(mode = HIDDEN) String gwt) {
        getDriver().get(appUrl.getData());
    }

    @Step("{0} the user populates the vehicle insurance information page with provided data and clicks next button")
    public void populates_vehicle_insurance_information(@Param(mode = HIDDEN) String gwt) {
        vehicleInfoPO.initPage(getContext());
        vehicleInfoPO.populate();
        vehicleInfoPO.next();
    }

    @Step("{0} the user populates the client information with provided data and clicks submit button")
    public void populates_client_information_page(@Param(mode = HIDDEN) String gwt) {
        clientInfoPO.initPage(getContext());
        clientInfoPO.populate();
        clientInfoPO.submit();
    }

    @Step("{0} user validates that the summary page contains the expected fields and values")
    public void validates_summary_page_contains_expected_fields_and_values(@Param(mode = HIDDEN) String gwt) {
        hideStepParams();
        summaryPO.initPage(getContext());
        summaryPO.validate();
    }
}
```

## BDD Style Test

Now, we have additional methods in our Domain Object that align with the following simplified BDD story, written from the user’s perspective:

- **Given** the user is on the Vehicle Insurance page
- **When** the user populates the Vehicle Insurance page with the provided data and clicks the next button
- **And** the user populates the Client Information page with the provided data and clicks the submit button
- **Then** the user validates that the Summary page contains the expected fields and values

Below is how we can write this story using our UITAF BDD DSL. To utilize this DSL, ensure you statically import the ui.auto.core.utils.GivenWhenThen.* classes:
```java import static ui.auto.core.utils.GivenWhenThen.*;```

```java title='TestInsurancePolicyBDD.java'
package com.yourcompany.example.tests;

import com.braimanm.uitaf.testng.TestNGBase;
import com.yourcompany.example.domainobjects.VehicleInsuranceBDD;
import io.qameta.allure.Description;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import static com.braimanm.uitaf.utils.GivenWhenThen.*;

public class TestInsurancePolicyBDD extends TestNGBase {

    @Feature("Insurance Policy")
    @Story("BDD: User creates new insurance policy quote")
    @Parameters("data-set")
    @Description("Given the user is on Vehicle Insurance page\n" +
            "When the user populates the vehicle insurance information page with provided data and clicks next button\n" +
            "And the user populates the client information with provided data and clicks submit button\n" +
            "Then user validates that the summary page contains the expected fields and values")
    @Test
    public void testCreatePolicyQuoteBDD(@Optional("data/random-data.xml") String dataSet){
        VehicleInsuranceBDD user = new VehicleInsuranceBDD(getContext()).fromResource(dataSet);

        Given(user::is_on_vehicle_insurance_page);
        When(user::populates_vehicle_insurance_information);
        And(user::populates_client_information_page);
        Then(user::validates_summary_page_contains_expected_fields_and_values);
    }

}

```

:::info
The UITAF BDD DSL used in this test is valid Java code compatible with Java 8 and later versions. It leverages functional programming, specifically method references, to streamline the definition of BDD-style steps.
:::

A significant advantage of this BDD approach is its integration of test code directly with BDD scenarios, reflecting user stories without the need for additional feature files, as is typical in the Cucumber framework. By aligning the test code directly with the BDD scenarios, this approach enhances readability and maintainability. The steps in the test method closely mirror the user story, ensuring that the test remains aligned with the intended functionality.

To experience and evaluate the BDD report for this test, <a href="/report/#behaviors/0cad488ea037dc4ffceb5d7c1aa90d04/d7a4544ba7dc9dec/" target="_blank" rel="noopener noreferrer">**Click here to view BDD Test Automation Report Example**</a>
