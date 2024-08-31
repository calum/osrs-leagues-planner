import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function MapView({ location, onSaveLocation, isEditing }) {
  const defaultLocation = "https://explv.github.io/";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLocation, setNewLocation] = useState(location || defaultLocation);

  const isValidLocation = location && location.includes("explv.github.io");
  const mapUrl = isValidLocation ? location : defaultLocation;

  const handleOpenDialog = () => {
    setNewLocation(location || defaultLocation); // Reset to current location
    setIsDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleSaveLocation = () => {
    onSaveLocation(newLocation); // Save the new location
    handleCloseDialog(); // Close the dialog after saving
  };

  const handleClearLocation = () => {
    onSaveLocation(""); // Clear the location
    handleCloseDialog(); // Close the dialog after clearing
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative',
          padding: '10px',
        }}
      >
        <iframe
          src={mapUrl}
          title="Map View"
          style={{ border: 'none', width: '100%', height: '300px' }}
          allowFullScreen
        />
        {isEditing && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '0.75rem',
              padding: '4px 8px',
              lineHeight: 1,
            }}
          >
            Edit Map
          </Button>
        )}
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Map Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new map location URL. Only URLs from explv.github.io are allowed.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Map Location URL"
            type="url"
            fullWidth
            variant="outlined"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearLocation} color="secondary">
            Clear Location
          </Button>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleSaveLocation} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MapView;
