# OSRS Leagues Planner: Project Roadmap

This document outlines the next steps for improving the OSRS Leagues Planner. Each task includes an estimated size of the work and a brief explanation of how to approach it.

## 1. Improve UI with a Burger Menu

### Size: Medium

### Description:
To make the UI more streamlined and less cluttered, especially when the user might want to keep the window small next to their RuneLite client, we can introduce a burger menu. This will allow us to move large icons and infrequently used options off the main screen.

### Steps:
1. **Install necessary dependencies** for a burger menu, such as `react-burger-menu` or using Material UI’s `Drawer` component.
2. **Move large icons** (e.g., "Add Step", "Upload Plan", etc.) into the burger menu.
3. **Add a toggle button** in the top-left or top-right corner of the app to open/close the menu.
4. **Test UI** at different window sizes to ensure it remains functional and user-friendly.

## 2. Add a Section to Explain How the App Works

### Size: Small

### Description:
New users may need guidance on how to use the app effectively. Adding a "How It Works" section will improve user onboarding and help them understand the features of the app.

### Steps:
1. **Create a new component** to house the "How It Works" information.
2. **Write clear, concise instructions** on using the app, including creating/editing plans, managing inventory, and using the map.
3. **Link this section** from the burger menu and/or an easily accessible area on the screen.

## 3. Ability to Have Multiple Plans Loaded and Easily Switch Between Them

### Size: Large

### Description:
Users may want to switch between different plans easily. Implementing the ability to load multiple plans and switch between them without losing progress would enhance the app's flexibility.

### Steps:
1. **Modify the state management** to handle multiple plans at once. This could involve using an array of plans in the global state.
2. **Add a plan management component** that displays all loaded plans and allows users to switch between them.
3. **Ensure persistence** by saving the state of each plan in local storage.
4. **Test thoroughly** to ensure no data is lost when switching between plans.

## 4. Track the Current Step

### Size: Small to Medium

### Description:
Tracking the current step automatically will make it easier for users to resume their progress when returning to the app.

### Steps:
1. **Add a field** to the global state to track the current step.
2. **Update the current step** whenever a step is completed or the user navigates through the steps.
3. **Save the current step** in local storage so it can be retrieved when the user returns to the app.
4. **Highlight the current step** visually in the UI.

## 5. Track Banked Resources

### Size: Medium to Large

### Description:
Tracking resources that have been banked will allow users to manage their inventory better, especially for complex plans that involve gathering and storing items.

### Steps:
1. **Create a new component** for tracking banked resources.
2. **Allow users to add items** to this component and manage quantities.
3. **Integrate the banked resources** with the inventory component so that users can transfer items between them.
4. **Persist the banked resources** in local storage.

## 6. Track Equipment Worn

### Size: Medium

### Description:
Adding a component to track equipment worn will help users manage their gear throughout different stages of their plan.

### Steps:
1. **Create a new component** for tracking equipment worn.
2. **Allow users to add/remove equipment** in this component.
3. **Integrate with the inventory component** to allow easy transfer of items to/from the equipment component.
4. **Persist the equipment state** in local storage.

## Summary

This roadmap outlines the key improvements and features that would enhance the OSRS Leagues Planner. Each task is designed to improve user experience, app functionality, and overall usability. The work can be approached incrementally, focusing on one feature at a time, and testing thoroughly to ensure smooth integration with existing components.
