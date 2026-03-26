# 💡 Lights Out Game

Logic puzzle game "Lights Out".
Implemented on React + TypeScript + Vite.

## 🎮 Game Rules

The game consists of a grid of lights that can be switched on or off.

- **Interaction:** Clicking on a cell toggles its state and the state of its adjacent neighbors (top, bottom, left, right).
- **Goal:** Turn off all the lights on the grid.
- **Challenge:** Try to achieve this in the minimum number of steps!

## 🛠 Technology stack

- **Core:** React, TypeScript, Vite
- **Styles:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Routing:** React Router
- **State Management:** Zustand

## 🚀 How to launch a project

1. **Clone the repository**

    ```bash
    git clone https://github.com/vt231dmyu/lights-out
    cd lights-out
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the project**
    ```bash
    npm run dev
    ```

## ✨ Implemented best practises

1. **Component-Based Architecture**
    - **Description:** The project follows a clear, modular structure by separating UI into distinct component categories: pages, layouts, and reusable UI/game components. This enhances maintainability and scalability.
    - **Evidence:** `src/pages/GamePage.tsx`, `src/layouts/ContainerLayout.tsx`, `src/components/ui/Button.tsx`, `src/components/game/GameGrid.tsx`.

2. **Code Quality & Consistency with ESLint and Prettier**
    - **Description:** The project enforces code quality and consistent formatting using ESLint for linting and Prettier for code formatting. This ensures a uniform codebase and helps prevent common errors.
    - **Evidence:** `eslint.config.js`, `.prettierrc`, `.prettierignore`, `package.json` (for scripts).

3. **Advanced State Management & Persistence with Zustand**
    - **Description:** Global state is managed using Zustand with its `persist` middleware. This implementation ensures that game settings, player history, and active game sessions are preserved across page reloads, providing a seamless user experience.
    - **Features:**
        - **Session Recovery:** Active games (grid state, steps, timer) are saved in real-time, allowing players to resume exactly where they left off.
        - **Game History:** Persistent log of the last 10 games played.
        - **Personal Bests:** Tracks the minimum steps taken to win for each grid size.
    - **Evidence:** `src/store/settings.ts`, `src/store/results.ts`, and `src/store/game.ts`.

4. **Strong Typing with TypeScript**
    - **Description:** The entire codebase is written in TypeScript, providing type safety that prevents common bugs, improves code completion, and makes the code self-documenting.
    - **Evidence:** All `.ts` and `.tsx` files in the project, such as `src/types/settings.ts` and component prop definitions.

5. **Declarative Routing**
    - **Description:** The application uses React Router to declaratively define its pages and navigation flow, making the application structure easy to understand and manage.
    - **Evidence:** The routing configuration is defined in `src/router/index.tsx`.
