# React Todo App 📝

A simple and intuitive Todo application built with React and TypeScript.

## ✨ Features

*   **Add Tasks:** Easily add new tasks to your list.
*   **Mark as Complete:** Toggle tasks as complete with a simple click.
*   **Delete Tasks:** Remove tasks that are no longer needed.
*   **Theme Support:** Toggle between light and dark themes. ☀️🌙
*   **Weather Widget:** Display current weather information. 🌦️
*   **Modern UI:** Built with Radix UI and Tailwind CSS for a sleek and accessible user interface.

## 📸 Screenshots

**Light Theme:**

![Light Theme Screenshot](<img width="1440" alt="Screenshot 2025-03-31 at 3 38 09 PM" src="https://github.com/user-attachments/assets/22a04ef6-006b-42f7-8568-50aaf113d40a" />)

**Dark Theme:**
![Dark Theme Screenshot](<img width="1439" alt="Screenshot 2025-03-31 at 3 37 56 PM" src="https://github.com/user-attachments/assets/32bd9f63-4658-43c4-bf9e-349b58f2071f" />)


## 🚀 Installation

### Prerequisites

*   Node.js (v18 or higher)
*   pnpm (recommended) or npm or yarn

### Detailed Setup and Running Instructions

1.  **Clone the repository:**

    Open your terminal and use the following command to clone the repository to your local machine:

    ```bash
    git clone https://github.com/7sumona02/react-todo-app.git
    ```

    This will download all the project files into a new directory named `react-todo-app`.

2.  **Navigate to the project directory:**

    Use the `cd` command to navigate into the newly created directory:

    ```bash
    cd react-todo-app
    ```

3.  **Install dependencies:**

    This project uses `pnpm` as its preferred package manager. If you don't have `pnpm` installed, you can install it globally using npm:

    ```bash
    npm install -g pnpm
    ```

    Once `pnpm` is installed, run the following command to install all the project dependencies:

    ```bash
    pnpm install
    ```

    Alternatively, you can use `npm` or `yarn` if you prefer:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

    This command will read the `package.json` file and download all the necessary packages into the `node_modules` directory.

4.  **Configure Environment Variables (Optional):**

    The weather widget likely requires an API key.  If so, you'll need to obtain one from a weather API provider (e.g., OpenWeatherMap) and create a `.env.local` file in the root of your project.  Add the API key to this file:

    ```
    NEXT_PUBLIC_OPENWEATHER_API_KEY
    ```

    **Important:**  Never commit your `.env.local` file to your repository.  It should be added to your `.gitignore` file.

5.  **Start the development server:**

    To start the development server, use the following command:

    ```bash
    pnpm dev
    ```

    or

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    This command will start the development server and automatically open the application in your default web browser.  You can usually access it at `http://localhost:3000`.

6.  **Using the Application:**

    *   **Adding a Task:** Type your task into the input field and press Enter or click the "Add" button.
    *   **Completing a Task:** Click the checkbox next to a task to mark it as complete.
    *   **Deleting a Task:** Click the "Delete" button (usually an "X" icon) next to a task to remove it.
    *   **Changing Theme:**  Look for a theme toggle (usually a sun/moon icon) to switch between light and dark themes.
    *   **Weather Widget:** The weather widget will display the current weather information for a default location (or a location you can configure, depending on the implementation).

## 🌐 Homepage

Visit the live demo at: [https://react-todo-app-five-lyart.vercel.app](https://react-todo-app-five-lyart.vercel.app)

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the `main` branch of the original repository.

## 🧑‍💻 Contributors

*   [7sumona02](https://github.com/7sumona02)
