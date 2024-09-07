---
sidebar_position: 3
description: ''
---

# Environments Configuration

The environments.xml file is used to define and configure the environments against which your tests will be executed. This file is crucial for managing different test environment setups and ensuring consistency across various environments.

## Structure of environments.xml

The environments.xml file typically includes:

- Environment Name: A unique identifier for each environment (e.g., uat, development, staging, production).
- URL: The base URL for the environment where the application is hosted.
- Users: A list of users with specific roles and credentials that will be used during testing.

``` xml title="Example environments.xml"
<?xml version="1.0" encoding="UTF-8"?>

<setup>
    <!-- Define Environment 1 -->
    <environment environmentName="prod" url="http://prod.sampleapp.yourcomapny.com">
        <user role="admin" fullName="Mike Smith" userName ="mikes@company.com" password="mikes_Password"/>
        <user role="user1" fullName="Jane Doe" userName ="janed@company.com" password="janed_Password"/>
        <user role="guest1" fullName="David Brown" userName ="davidb@company.com" password="davidb_Password"/>
    </environment>

    <!-- Define Environment 2 -->
    <environment environmentName="uat" url="http://uat.sampleapp.yourcomapny.com">
        <user role="admin" fullName="John Davis" userName ="johnd@company.com" password="johnd_Password"/>
        <user role="user1" fullName="Anna Johnson" userName ="annaj@company.com" password="annaj_Password"/>
        <user role="guest1" fullName="Emily Miller" userName ="emilym@company.com" password="emilym_Password"/>
    </environment>

    <!-- Define Environment 3 -->       
    <environment environmentName="dev" url="http://dev.sampleapp.yourcomapny.com">
        <user role="admin" fullName="Robert Taylor" userName ="robertt@company.com" password="robertt_Password"/>
        <user role="user1" fullName="Michael Moore" userName ="michaelm@company.com" password="michaelm_Password"/>
        <user role="guest1" fullName="Sarah Wilson" userName ="sarahw@company.com" password="sarahw_Password"/>
    </environment>

</setup>
```

:::warning

Ensure that the user roles and credentials are consistent across all environments. This allows you to run the same tests with specific user roles in different environments without modifying the test code.

:::

:::info

By defining multiple environments and their configurations, you can easily switch between different environments, making your testing process more flexible and manageable.
The **environments.xml** file helps maintain a structured and organized approach to managing those environments.

:::
