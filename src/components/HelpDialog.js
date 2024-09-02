// src/components/HelpDialog.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const HelpDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="help-dialog-title">
      <DialogTitle id="help-dialog-title">How to Use OSRS Leagues Planner</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Welcome to the OSRS Leagues Planner!</strong> This application is designed to help you create and manage your Old School RuneScape Leagues plans.
        </DialogContentText>
        <DialogContentText>
          <strong>Steps:</strong> 
          <ul>
            <li>Click on "Add Step" to create a new step.</li>
            <li>Double-click a step name to edit it.</li>
            <li>Use the inventory grid to manage your items. Double-click a slot to edit or add an item.</li>
            <li>Drag and drop items to rearrange them within your inventory.</li>
          </ul>
        </DialogContentText>
        <DialogContentText>
          <strong>Tasks and XP Tracking:</strong> 
          <ul>
            <li>Add tasks by including text like <code>&lt;10&gt;</code> in the step description. This will track one task worth 10 points.</li>
            <li>Add XP gains by including text like <code>Attack +15000 XP</code> in the step description. The XP tracker will automatically sum the XP for each skill.</li>
          </ul>
        </DialogContentText>
        <DialogContentText>
          <strong>Map Integration:</strong> 
          <ul>
            <li>Click "Edit Map Location" to set or edit the map location for a step.</li>
          </ul>
        </DialogContentText>
        <DialogContentText>
          <strong>Export/Import:</strong>
          <ul>
            <li>Use the "Download Plan" button to export your plan to a CSV file.</li>
            <li>Click "Upload Plan" to import a previously saved plan.</li>
          </ul>
        </DialogContentText>
        <DialogContentText>
          <strong>Google Drive Syncing:</strong>
          <ul>
            <li>Sign in with your Google account to enable plan syncing with Google Drive.</li>
            <li>Click "Save to Google Drive" to save your current plan. If a plan with the same name exists, it will be overwritten.</li>
            <li>Use the "Load Plan" button to load a plan from your Google Drive. A dialog will list all available plans.</li>
            <li>When saving, you can choose an existing plan from a dropdown to avoid duplicates or overwrite an existing plan.</li>
          </ul>
        </DialogContentText>
        <DialogContentText>
          Enjoy planning your OSRS Leagues journey!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
