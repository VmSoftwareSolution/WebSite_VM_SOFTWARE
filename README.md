# Oficial_Page_VM_SOFTWARE

![Angular Version](https://img.shields.io/badge/Angular-18.2.10-red)
![Node.js Version](https://img.shields.io/badge/Node.js-23.1.0-brightgreen)
![npm Version](https://img.shields.io/badge/npm-10.9.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3.0-blue)
![EmailJS](https://img.shields.io/badge/EmailJS-Ready-yellow)


This project is a website for company **Vm Software**, where anyone can contact them and lear more about they are. 


## Table contents
- [Branch Naming Convention](#branch-naming-convention)
- [Environments Variable](#environments-variable)
- [Setup and Dependencies](#setup-and-dependencies)
- [Contributing](#contributing)

## Branch Naming Convention

In our project, we adhere to well-defined branch naming conventions to ensure a consistent and organized workflow. Our branch name are structure provide clear information about their purpose and context.

**[type]-[hu-name]-[plane]**

- **`Type`**: Represent the type of branch.
    - `FT` for developing new feature.
    - `FX` for bug o fixes or issue resolution.
    - `DC` for changes or updates to the project documentation.
    - `RF` for refactoring code without changing it's functionality.
    - `TS` for creating or updating unit/integration test.
    - `CI` for changes related to CI/CD pipelines.
    - `HB` for urgent fixes applied directly to production.
    - `CH` for non-functional task like dependency updates or code cleanup.
    - `RE` for preparing the code for a new version release.
    - `SP` for research or exploration of a potential solution before implementation.
    - `BR` for creating or validating bug report.
    - `MG` for merging changes from different branches or resolving conflicts.  
    - `ST` for visual or design-related updates.

- **`Hu-name`**: stands for the Hypothetical User Story name, witch provides context for the branch.
- **`Plane`**: Indicates the plane number associated with the task or issue.

## Example

- **Feature Branch Example**
    - Branch Name: `FT-WEBSI-1`
    - Purpose: Implementation of a feature tied to task VMPAG-1.

By adhering to these branch naming conventions, we enhance clarity and traceability within our development process.


## Environments Variable

To configure environment variable for your project.

1. **Copy Template**: Duplicate the `.environment.template.ts` file and rename it to `.environment.ts`.

2. **Edit values**: Open the newly created `.environment.ts` file with a text editor and replace the placeholder values with the appropriate configuration.


By following these steps, you'll configure the necessary environment variables for your project without exposing sensitive information in your version control system.

## Setup and Dependencies

To set up and run this project, follow these steps:

1. **Clone the repository**: Clone this project repository to your local machine using Git. You can do this by running the following command in your terminal.

    ```
    https://github.com/VmSoftwareSolution/WebSite_VM_SOFTWARE.git
    ```

2. **Install Node.js and Npm**: Angular requires Node.js and npm(Node package Manager). if you haven`t installed them, you can do so by running the following command in your terminal.

    ```
    sudo apt update
    sudo apt upgrade
    ```

    ```
    curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    ```

    ```
    sudo apt install -y nodejs
    ```

    ```
    node -v
    npm -v
    ```
3. **Install AngularCli**: If you haven't installed it, you can do so by running the following command in your terminal.

    ```
    npm install -g @angular/cli
    ```
4. **Install Dependencies** Install Project Dependencies: Navigate to the project's root directory using your terminal and install the required Node.js dependencies by running.

    ```
    npm install
    ```
5. **Start Project**: Running this command to start project.
    ```
    ng serve
    ```
## Contributing


### How to Contribute

1. **Create a new branch**: Create a branch for the feature, bug fix, or change you intend to work on. Follow the branch naming conventions specified above.
    ```
    git checkout -b FT-VMPAG-1
    ```
2. **Make your changes**: Implement the feature, fix the bug, or update the documentation as needed.
3. **Test your changes**: Ensure that the code works as expected and passes all tests.
4. **Commit your changes**: Commit your changes with a clear and descriptive commit message. For example:
    ```
    git commit -m "Implement feature: Add contact form" -m "Description"
    ```
5. **Push your changes**: Push your changes to your forked repository.
    ```
    git push origin FT-VMPAG-1
    ```
6. **Create a pull request**: Once your changes are pushed, open a pull request (PR) to merge your changes into the main repository.

### Pull Request Guidelines

- Ensure that your pull request is targeting the `develop` branch.
- Provide a clear description of the changes made in the pull request.
- If applicable, link to relevant issues or user stories.
- Make sure your code follows the project's coding standards and passes all tests.
- Keep your pull request focused on one task or issue.

