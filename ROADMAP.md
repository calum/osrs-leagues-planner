# OSRS Leagues Planner: Project Roadmap

This document outlines the next steps for improving the OSRS Leagues Planner. Each task includes an estimated size of the work and a brief explanation of how to approach it.

## 1. Track the Current Step

### Size: Small to Medium

### Description:
Tracking the current step automatically will make it easier for users to resume their progress when returning to the app.

### Steps:
1. **Add a field** to the global state to track the current step.
2. **Update the current step** whenever a step is completed or the user navigates through the steps.
3. **Save the current step** in local storage so it can be retrieved when the user returns to the app.
4. **Highlight the current step** visually in the UI.

## 2. Track Banked Resources

### Size: Medium to Large

### Description:
Tracking resources that have been banked will allow users to manage their inventory better, especially for complex plans that involve gathering and storing items.

### Steps:
1. **Create a new component** for tracking banked resources.
2. **Allow users to add items** to this component and manage quantities.
3. **Integrate the banked resources** with the inventory component so that users can transfer items between them.
4. **Persist the banked resources** in local storage.

## 3. Track Equipment Worn

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
