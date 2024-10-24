# Infokes Explorer

A full-stack web application using PostgreSQL, .NET Core 8 for backend APIs, and React JS for the frontend.

## Project Overview

Infokes Explorer is a web application that provides file and directory management capabilities. It consists of a React JS frontend, a .NET Core 8 backend API, and a PostgreSQL 16 database. The backend provides RESTful APIs consumed by the frontend.

## Technologies Used

- **Database**: PostgreSQL (version 16)
- **Backend**: .NET Core 8
- **Frontend**: React JS
- **Node.js**: Version 20.18.0

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js (version 20.18.0 or higher)](https://nodejs.org/en/download/prebuilt-installer)
- [.NET Core SDK (version 8)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [PostgreSQL (version 16)](https://www.postgresql.org/download/)

## Database Setup (PostgreSQL 16)

1. Install PostgreSQL 16 (if not already installed) from the official website: [PostgreSQL Downloads](https://www.postgresql.org/download/)

2. Restore the database from the provided SQL backup file.

### Restoring from Backup
The database backup is located at `infokes_explorer/explorer_database/infokes_explorer.sql`. Follow the steps below to restore it:

1. Open your PostgreSQL command line or use a tool like pgAdmin.

2. Create a new database (if it doesn't already exist):

```sql
CREATE DATABASE infokes_explorer;
```
3. Restore the SQL backup using the psql command:

```bash
psql -U your-username -d infokes_explorer -f infokes_explorer/explorer_database/infokes_explorer.sql
```
Make sure to replace `your-username` with your PostgreSQL username.

4. Verify that the database has been restored successfully.

## Backend Setup (.NET Core 8)

1. Install .NET 8 (if not already installed) from the official website: [.NET 8 Downloads](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

2. Navigate to the backend directory:
```bash
cd infokes_explorer/explorer_api
```

3. Restore the .NET Core dependencies:
```bash
dotnet restore
```
4. Update the `appsettings.json` with your PostgreSQL connection string:

```json
"InfokesExplorer": "Host=localhost; Database=infokes_explorer; Port=5432; Username=postgres; Password={yourpassword}"
```

5. build the backend API:

```bash
dotnet build
```

6. Run the backend API:

```bash
dotnet run
```
The API will be running on `http://localhost:5002`

## Frontend Setup (React JS)

2. Node.js (version 20.18.0 or higher) (if not already installed) from the official website: [Node.js Downloads](https://nodejs.org/en/download/prebuilt-installer)

3. Navigate to the frontend directory:

```bash
cd ../explorer_ui
```
4. Install the dependencies:

```bash
npm install
```

5. Start the React development server:

```bash
npm run dev
```
The frontend will be running on `http://localhost:5173`.
