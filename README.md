# Squares Project

This project is a web application that dynamically generates blocks with random colors upon each button click in a square formation. It is built with **React.js** and **TypeScript** on the frontend and a **.NET/C# API** for the backend. The position and color of each square are stored in a JSON file, allowing the layout to persist across page reloads.

## Technologies Used

- **Frontend:** React.js with TypeScript
- **Backend:** .NET/C#
- **Storage:** JSON file (via .NET API)
- **API Documentation:** Swagger
- **Versioning:** API versioning with v1

## Requirements

- Node.js (for running the React frontend)
- ASP.NET Core API (for running the backend API)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Kikres/Squares.git
   cd Squares
   ```

2. **Backend (API)**

   Navigate to the `Squares.Server` folder to set up and run the .NET backend:

   - Install dependencies and restore the project:

     ```bash
     dotnet restore
     ```

   - Run the backend server:

     ```bash
     dotnet run
     ```

   The API will start on `http://localhost:5085`.

3. **Frontend (React)**

   Navigate to the `Squares.Client` folder to set up and run the React frontend:

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the React development server:

     ```bash
     npm run dev
     ```

   The React app will run on `http://localhost:5173`.

## API Documentation

The API documentation is automatically generated and can be accessed via Swagger UI. Once the backend server is running, you can view the API documentation at:

- [http://localhost:5085](http://localhost:5085)

## Notes

I drew inspiration from your demo on the challenge and post, leading to significant enhancements in my project. Below are some personal reflections and changes made during the update:

- To simulate the sequence, I created a data structure representing a list of "pieces" needed to create the next size square. The arithmetic sequence is defined as x + (x - 1) where x ∈ Z^+.
- From a scalable and reusable perspective, I developed a generic component that can be reused for displaying product cards or similar items.
- Removed summary comments from private methods, as their context is typically clear from the code.
- Fixed naming conventions in the React components for improved clarity and consistency.
- Minor cleanup and further separation
