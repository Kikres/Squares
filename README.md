This project is a web application that dynamically generates squares with random colors upon each button click. It is built with React.js on the frontend and a .NET/C# API for the backend. The position and color of each square are stored in a JSON file, allowing the layout to persist across page reloads.
  
## Technologies Used

- **Frontend**: React.js
- **Backend**: .NET/C#
- **Storage**: JSON file (via .NET API)

## Requirements

- **Node.js** (for running the React frontend)
- **ASP.NET Core API** (for running the backend API)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Kikres/Squares.git
cd Squares
```

### 2. Backend (API)
Navigate to the `Squares.Server` folder to set up and run the .NET backend:

1. Install dependencies and restore the project.
   ```bash
   dotnet restore
   ```
2. Run the backend server.
   ```bash
   dotnet run
   ```

The API will start on `http://localhost:5085`.

### 3. Frontend (React)
Navigate to the `Squares.Client` folder to set up and run the React frontend:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the React development server:
   ```bash
   npm run dev
   ```

The React app will run on `http://localhost:5173`.

## API Endpoints

### POST `/api/squares`
- **Description**: Saves the state of a new square (position and color).
- **Request Body**:
  ```json
  {
    "position": { "x": 10, "y": 20 },
    "color": "#ff5733"
  }
  ```

### GET `/api/squares`
- **Description**: Retrieves the state of all previously saved squares.
