import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Inventory.css';

const ItemTypes = {
  ITEM: 'item',
};

function Inventory({ items, onItemMove, onAddItem }) {
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [currentSlot, setCurrentSlot] = useState(null);

  const handleDoubleClick = (index) => {
    const item = items.find(item => item.slot === index);
    setCurrentSlot(index);
    setNewItemName(item ? item.name : '');
    setNewItemUrl(item ? item.imageUrl : '');
    setEditingItem(item || { slot: index });
  };

  const handleSaveItem = () => {
    const newItem = {
      itemId: editingItem.itemId || Date.now(),
      name: newItemName,
      imageUrl: newItemUrl,
      slot: currentSlot,
    };
    onAddItem(newItem);
    setEditingItem(null);
    setCurrentSlot(null);
  };

  const handleDeleteItem = () => {
    onAddItem(null, currentSlot); // Signal to remove the item
    setEditingItem(null);
    setCurrentSlot(null);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setCurrentSlot(null);
  };

  const renderSlot = (index) => {
    const item = items.find(item => item.slot === index);

    return (
      <Grid item xs={3} key={index}>
        <Box
          className="inventory-slot"
          sx={{
            position: 'relative',
            width: '85%',
            paddingTop: '70%', 
            margin: 'auto',
          }}
          onDoubleClick={() => handleDoubleClick(index)}
        >
          {item && (
            <InventoryItem item={item} index={index} onItemMove={onItemMove} />
          )}
        </Box>
      </Grid>
    );
  };

  return (
    <div className="inventory-container">
      <Box sx={{ position: 'relative', width: '204px', height: '275px', backgroundImage: 'url(https://oldschool.runescape.wiki/images/Inventory_tab.png)', backgroundSize: 'cover' }}>
        <Grid container spacing={0} sx={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
          {Array.from(Array(28)).map((_, index) => renderSlot(index))}
        </Grid>
      </Box>
      
      {/* Dialog for editing an item */}
      <Dialog open={Boolean(editingItem || currentSlot !== null)} onClose={handleCloseDialog}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details for the item in this slot.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            variant="outlined"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Item Image URL"
            fullWidth
            variant="outlined"
            value={newItemUrl}
            onChange={(e) => setNewItemUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {editingItem && (
            <Button onClick={handleDeleteItem} color="error">
              Delete
            </Button>
          )}
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function InventoryItem({ item, index, onItemMove }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { index, itemId: item.itemId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (draggedItem) => {
      if (draggedItem.index !== index) {
        onItemMove(draggedItem.index, index);
      }
    },
  });

  return (
    <Box
      ref={(node) => drag(drop(node))}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isDragging ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.name || `Item ${item.itemId}`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onError={(e) => { e.target.onerror = null; e.target.src = ''; }} // Fallback to empty string if image fails to load
      />
      {!item.imageUrl && <Box sx={{ textAlign: 'center' }}>{item.name}</Box>}
    </Box>
  );
}

export default Inventory;
