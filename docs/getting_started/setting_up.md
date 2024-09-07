---
sidebar_position: 2
description: ''
---

# Setting Up the Project

## **Project Folder Structure:**

Here's a recommended folder structure for a UITAF-based test automation project that can help keep your project organized:

```bash title="Project Folder Structure"
project_example/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── yourcompany/
│       │           └── example/
│       │               ├── components/
│       │               │   └── (UI component classes)
│       │               ├── domainobjects/
│       │               │   └── (Domain object classes)
│       │               ├── pageobjects/
│       │               │   └── (Page object classes)
│       │               └── tests/              
│       │                    └── (Test classes)
│       └── resources/
│           ├── data/
│           │   └── testdata.xml
│           ├── suites/
│           │   └── (TestNG suite files)
│           ├── test.properties
│           └── environments.xml
│
├── .gitignore
├── pom.xml
└── README.md
```

## **Folder Structure Explanation**

- **project_example/:** - Root directory of your project.
- **src/main/java/com/yourcompany/example/components/:** - Contains reusable UI components used in tests.
- **src/main/java/com/yourcompany/example/domainobjects/:** - Contains domain objects used in tests.
- **src/main/java/com/yourcompany/example/pageobjects/:** - Contains page objects representing different web pages for testing.
- **src/main/java/com/yourcompany/example/tests/:** - Folder for test classes.
- **src/main/resources/:** - Contains resources needed for tests.
- **data/:** - Stores test data files.
- **suites/:** - Contains TestNG suite files.
- **test.properties:** - Properties file for test configurations.
- **environments.xml:** - XML file for environment configurations.
- **.gitignore:** - Specifies files and directories to ignore in version control.
- **pom.xml:** - Maven configuration file for managing dependencies and build configuration.
- **README.md:** - Provides an overview and instructions for the project.

## Adding UITAF to Your Maven Project

UITAF is hosted on Maven Central, which simplifies the integration process. To include UITAF in your test automation project, you need to add the following dependency configuration to your pom.xml:

```xml title="pom.xml"
...
<properties>
    <compiler.version>1.8</compiler.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <ui_auto_core_version>2.7.1</ui_auto_core_version>
</properties>
...
<dependency>
    <groupId>com.googlecode.page-component</groupId>
    <artifactId>ui_auto_core</artifactId>
    <version>${ui_auto_core_version}</version>
</dependency>
...
```

**Here's how you can incorporate this dependency into a complete pom.xml file:**

```xml title="Complete pom.xml Example"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.yourcompany</groupId>
    <artifactId>example</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <compiler.version>1.8</compiler.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <ui_auto_core_version>2.7.1</ui_auto_core_version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.googlecode.page-component</groupId>
            <artifactId>ui_auto_core</artifactId>
            <version>${ui_auto_core_version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>
                <configuration>
                    <source>${compiler.version}</source>
                    <target>${compiler.version}</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>aspectj-maven-plugin</artifactId>
                <version>1.10</version>
                <dependencies>
                    <dependency>
                        <groupId>org.aspectj</groupId>
                        <artifactId>aspectjtools</artifactId>
                        <version>1.8.3</version>
                    </dependency>
                </dependencies>
                <configuration>
                    <showWeaveInfo>false</showWeaveInfo>
                    <Xlint>ignore</Xlint>
                    <source>${compiler.version}</source>
                    <target>${compiler.version}</target>
                    <complianceLevel>${compiler.version}</complianceLevel>
                    <encoding>UTF-8</encoding>
                    <weaveDependencies>
                        <weaveDependency>
                            <groupId>ru.yandex.qatools.allure</groupId>
                            <artifactId>allure-java-aspects</artifactId>
                        </weaveDependency>
                    </weaveDependencies>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.2.1</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <createDependencyReducedPom>false</createDependencyReducedPom>
                            <finalName>example</finalName>
                            <filters>
                                <filter>
                                    <artifact>*:*</artifact>
                                    <excludes>
                                        <exclude>META-INF/*.SF</exclude>
                                        <exclude>META-INF/*.DSA</exclude>
                                        <exclude>META-INF/*.RSA</exclude>
                                    </excludes>
                                </filter>
                            </filters>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                    <mainClass>ui.auto.core.RunTests</mainClass>
                                </transformer>
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>

    </build>

</project>

```
