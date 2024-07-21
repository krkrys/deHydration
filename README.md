# deHydration
deHydration is an application designed for doctors (especially Paediatricians) to assist them with treatment of dehydrated patients. It is built using ASP.NET WebAPI for the backend and React for the frontend, and it utilizes MS SQL Server as the database.

## Description
deHydration is inteded for Paediatricians to help them with calculation of fluid suplementation for dehydrated patients. Based on examination results and symptoms it calculates level of dehydration and needed fluid suplementation for the next 24h.

## Features

### ASP.NET WebAPI and MSSQLServer (Backend) and React (Frontend)
- **Database Setup**: The application has a fully built database with tables for Users, Patients, Examinations and Symptoms.
- **Sample Data**: The database is pre-populated with sample data.
- **User Authentication**: Users can log in to the system. JWT Authorization has been implemented.
- **Manage Patients**: Doctors can perform Create, Read, Update and Delete operations on Patiens. Validation allows to manage only Patients, that are assigned to currently logged in User (Doctor).
- **Manage Examinations**: Doctors can perform Create, Read, Update and Delete operations on Examinations. Validation allows to manage only Examinations of Patients, that are assigned to currently logged in User (Doctor).
- **Calculations**: Based on Examination results, Users can calculate Patient's
    - **Dehydration level** based on Patient's symptoms (mild, moderate, severe)
    - **Daily fluid requirements** fluid lost during sickness, standard fluid requirement and fluid requirement based on examination results. 
    - **Fluid requirements details** divided to time intervals and specific fluid types and amounts in ml.
- **Frontend**: All of the above functionalities are implemented in React frontend app, which is created based on Vite+React template and mostly utilizes [antDesign](https://ant.design/) components.
## Installation

### Prerequisites
- .NET 8.0 SDK
- Node.js 14+
- MSSQLServer

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/krkrys/deHydration.git
    ```
2. Restore dependencies and build the project:
    ```bash
    dotnet restore
    dotnet build
    ```
3. Update the `appsettings.json` file with your MSSQLServer connection string.
4. Run the application:
    ```bash
    dotnet run
    ```

### Frontend Setup
1. Frontend app is in the dehydration-app folder
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Run the application:
    ```bash
    npm run dev
    ```
## Further development

Current project roadmap is available in [JIRA](https://dehydration.atlassian.net/jira/software/projects/DHDR/boards/1/backlog)
