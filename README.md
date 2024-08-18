# Eight Sleep By Flo

**Eight Sleep By Flo** is a web application designed to provide detailed sleep statistics, built with Next.js using App Router version 14.2.5.

## Technologies Used

- Next.js
- React
- TypeScript
- Day.js
- GSAP
- ECharts
- Tailwind CSS

## Installation

To start the project, clone the repository and run the following commands:

```bash
git clone https://github.com/your_username/eightsleep-flo.git
cd eightsleep-flo
npm install
``` 

## Scripts

These are the available commands for development and testing:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter to check for code issues.
- `npm run test`: Runs unit tests.
- `npm run test:watch`: Runs tests in watch mode.

## Project Structure

- **`app`**:
  - **`api`**: Contains route handlers to manage API requests.
  - **`user`**: Contains the structure for user-related views (e.g., `/user/[slug]`).
- **`components`**:
  - **`ui`**: Contains UI elements.
  - **`family`**: Contains components related to the landing page where family stats and comparisons are displayed.
  - **`user`**: Contains components related to the user view (e.g., `/user/[slug]`).
- **`lib`**:
  - **`definitions`**: TypeScript definitions.
  - **`utils`**: Utility functions.
  - **`gsap`**: GSAP configuration.
- **`public`**: Contains static assets.

## How to Run

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/floflor/eightsleep-flo.git
   cd eightsleep-flo
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to http://localhost:3000 to see the application running.**
  




