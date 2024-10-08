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
├── mvnw
├── mvnw.cmd
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
- **mnv:** - Maven wrapper for Linux and macOS operating systems.
- **mnv.cmd:** - Maven wrapper for Windows operating system.
- **README.md:** - Provides an overview and instructions for the project.

## Adding UITAF to Your Maven Project

UITAF is hosted on Maven Central, which simplifies the integration process. To include UITAF in your test automation project, you need to add the following dependency configuration to your pom.xml:

```xml title="pom.xml"
...
    <dependency>
        <groupId>com.braimanm</groupId>
        <artifactId>uitaf</artifactId>
        <version>3.1.0</version>
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
    <artifactId>test-lab-example</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <java.version>11</java.version>
        <uitaf.version>3.1.0</uitaf.version>
        <aspect-version>1.9.19</aspect-version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.braimanm</groupId>
            <artifactId>uitaf</artifactId>
            <version>${uitaf.version}</version>
        </dependency>

        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjrt</artifactId>
            <version>${aspect-version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.10.1</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <encoding>${project.build.sourceEncoding}</encoding>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>aspectj-maven-plugin</artifactId>
                <version>1.14.0</version>
                <dependencies>
                    <dependency>
                        <groupId>org.aspectj</groupId>
                        <artifactId>aspectjtools</artifactId>
                        <version>${aspect-version}</version>
                    </dependency>
                </dependencies>
                <configuration>
                    <showWeaveInfo>false</showWeaveInfo>
                    <Xlint>ignore</Xlint>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <complianceLevel>${java.version}</complianceLevel>
                    <encoding>UTF-8</encoding>
                    <weaveDependencies>
                        <weaveDependency>
                            <groupId>io.qameta.allure</groupId>
                            <artifactId>allure-java-commons</artifactId>
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
                <version>3.4.1</version>
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
                                    <mainClass>com.braimanm.uitaf.RunTests</mainClass>
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
