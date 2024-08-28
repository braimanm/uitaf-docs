---
sidebar_position: 1
---

# UITAF Reporting Facilities

If you successfully followed the steps described in the **"Automation Example"** section, the report will automatically be presented in your default web browser.
<a href="/report/" target="_blank" rel="noopener noreferrer">**Click here to view Test Automation Report Example**</a>

## Automatic report generation

UITAF uses the Allure open-source reporting library to automatically generate reports from executed methods annotated with **@Step** annotation. To generate a report entry, simply annotate your methods with the **@Step** annotation and when this method is executed, the corresponding event will trigger the creation of a specific entry in the report.

```Java title="Here is a snippet from the ClientInfoPO.java example file"
    ...
    @Step("Populate Client Info form with provided data")
    public void populate() {
        autoFillPage();
    }
    ...
```
