# OSRS Leagues Planner

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/calum/osrs-leagues-planner)
![GitHub issues](https://img.shields.io/github/issues/calum/osrs-leagues-planner)

**OSRS Leagues Planner** is a React-based web application designed to help players plan their strategies and progress for Old School RuneScape (OSRS) Leagues events. The app allows users to create, edit, and visualize step-by-step plans, including inventory management, location tracking on an interactive map, and tracking skill XP gains and task points.

## Features

- **Step-by-Step Planning:** Create detailed plans for each stage of your OSRS Leagues journey.
- **Inventory Management:** Visualize your inventory at each step, with the ability to drag and drop items, select from previously used items, and manually add new ones.
- **Interactive Map Integration:** Track your location on an interactive map, with the ability to edit and save map URLs for specific steps.
- **Markdown Support:** Use Markdown to format descriptions, including lists, sublists, blockquotes, and code blocks.
- **Skill XP Tracker:** Automatically track XP gains in various skills throughout your plan, with level indications and formatted XP values.
- **Task Tracker:** Track the number of tasks completed and points earned at each step in your plan.
- **Google Drive Syncing:** Sign in with your Google account to save and load plans directly from Google Drive. Avoid duplicates by selecting an existing plan or overwriting a current one.
- **Autosave and Persistence:** Your plans are automatically saved in the browser, so you can pick up right where you left off.
- **CSV Export/Import:** Easily share your plans by exporting them to CSV or importing from a CSV file.
- **GitHub Pages Deployment:** The app is deployed automatically to GitHub Pages on each commit to the `main` branch.

## Demo

Check out the live demo: [OSRS Leagues Planner](https://calum.github.io/osrs-leagues-planner)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or higher)
- [npm](https://www.npmjs.com/) (v7.x or higher)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/calum/osrs-leagues-planner.git
   cd osrs-leagues-planner
   ```

2. **Install dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the application locally:**

   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3000`.

## Usage

### Creating a Plan

- **Add Steps:** Use the "Add Step" button to create new steps in your plan. Each step can include a title, description, inventory items, skill XP gains, task points, and a location on the map.
- **Edit Steps:** Double-click a step title to edit it. You can also edit the description using the integrated Markdown editor, which now supports advanced formatting options.
- **Manage Inventory:** Drag and drop items in your inventory to reorder them, or double-click to edit or add new items. The dropdown menu allows you to quickly select previously used items.
- **Skill XP Tracking:** Add skill XP gains directly in the step description using the format "Skill +XP" (e.g., "Attack +15000xp"). The Skill XP Tracker will automatically update to reflect the total XP for each skill.
- **Task Tracking:** Include task points in your step descriptions by adding "<X>" where X is the number of points. The Task Tracker will display the cumulative points earned before and after each step.
- **Map Location:** Click "Edit Map Location" to set the location for a step. The map URL will be saved and can be reused across steps.

### Exporting and Importing Plans

- **Export to CSV:** Click the "Download Plan" button to export your current plan to a CSV file.
- **Import from CSV:** Click "Upload Plan" and select a CSV file to import a plan.

### Saving and Loading

- **Google Drive Syncing:** Sign in with your Google account to save your plan directly to Google Drive. The save dialog allows you to select an existing plan to overwrite or create a new one. Load plans by selecting from a list of saved plans on your Google Drive.
- **Autosave:** Your plan is automatically saved to your browser's local storage.
- **Reload:** The app will automatically load your last saved plan when you return to the site.

## Deployment

The app is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch.

### Manual Deployment

To manually deploy the app to GitHub Pages:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy using GitHub Actions:**

   GitHub Actions will automatically deploy your app to the `gh-pages` branch.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:** `git checkout -b feature/your-feature-name`
3. **Commit your changes:** `git commit -m 'Add some feature'`
4. **Push to the branch:** `git push origin feature/your-feature-name`
5. **Open a pull request.**

### Issues

If you encounter any issues or have suggestions, please open an issue on the [Issues](https://github.com/calum/osrs-leagues-planner/issues) page.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.