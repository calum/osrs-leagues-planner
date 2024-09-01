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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './Inventory.css';

function convertToUnderscoreFormat(str) {
  return str
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert the entire string to lowercase
    .split(/\s+/) // Split the string by spaces (or any whitespace)
    .map((word, index) => 
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
    ) // Capitalize the first word, keep others lowercase
    .join('_'); // Join the words with underscores
}

const ItemTypes = {
  ITEM: 'item',
};

function Inventory({ items, onItemMove, onAddItem, uniqueItems }) {
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [currentSlot, setCurrentSlot] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [itemUrlEdited, setItemUrlEdited] = useState(false);

  const handleDoubleClick = (index) => {
    const item = items.find(item => item.slot === index);
    setCurrentSlot(index);
    setNewItemName(item ? item.name : '');
    setNewItemUrl(item ? item.imageUrl : '');
    setItemUrlEdited(!!item?.imageUrl); // Set itemUrlEdited to true if the URL is already set
    setEditingItem(item || { slot: index });
  };

  const handleSaveItem = () => {
    const selectedItem = uniqueItems.find(item => item.itemId === selectedItemId);
    const newItem = selectedItem
      ? { ...selectedItem, slot: currentSlot }
      : {
          itemId: editingItem.itemId || Date.now(),
          name: newItemName,
          imageUrl: itemUrlEdited ? newItemUrl : `https://oldschool.runescape.wiki/images/${convertToUnderscoreFormat(newItemName)}.png`,
          slot: currentSlot,
        };

    onAddItem(newItem);
    setEditingItem(null);
    setCurrentSlot(null);
    setSelectedItemId('');
    setItemUrlEdited(false);
  };

  const handleDeleteItem = () => {
    onAddItem(null, currentSlot); // Signal to remove the item
    setEditingItem(null);
    setCurrentSlot(null);
    setItemUrlEdited(false);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setCurrentSlot(null);
    setSelectedItemId('');
    setItemUrlEdited(false);
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
          <InventoryItem item={item} index={index} onItemMove={onItemMove} />
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
            Enter the details for the item in this slot or select from existing items.
          </DialogContentText>
          <Select
            value={selectedItemId}
            onChange={(e) => {
              setSelectedItemId(e.target.value);
              const selectedItem = uniqueItems.find(item => item.itemId === e.target.value);
              if (selectedItem) {
                setNewItemName(selectedItem.name);
                setNewItemUrl(selectedItem.imageUrl);
                setItemUrlEdited(true);
              }
            }}
            displayEmpty
            fullWidth
            style={{ marginBottom: '10px' }}
          >
            <MenuItem value="">
              <em>Select Existing Item</em>
            </MenuItem>
            {uniqueItems.map((item) => (
              <MenuItem key={item.itemId} value={item.itemId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            variant="outlined"
            value={newItemName}
            onChange={(e) => {
              setNewItemName(e.target.value);
              if (!itemUrlEdited) {
                setNewItemUrl(`https://oldschool.runescape.wiki/images/${convertToUnderscoreFormat(e.target.value)}.png`);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveItem();
              }
            }}
            disabled={!!selectedItemId} // Disable if an item is selected from the dropdown
          />
          <TextField
            margin="dense"
            label="Item Image URL"
            fullWidth
            variant="outlined"
            value={newItemUrl}
            onChange={(e) => {
              setNewItemUrl(e.target.value);
              setItemUrlEdited(true); // Manually editing the URL
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveItem();
              }
            }}
            disabled={!!selectedItemId} // Disable if an item is selected from the dropdown
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
    item: { index, itemId: item ? item.itemId : null },
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
      {item ? (
        <img
          src={item.imageUrl}
          alt={item.name || `Item ${item.itemId}`}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => { e.target.onerror = null; e.target.src = ''; }} // Fallback to empty string if image fails to load
        />
      ) : (
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" // 1x1 pixel transparent gif
          alt="Empty Slot"
          style={{ width: '100%', height: '100%', opacity: 0 }} // Invisible but present for drag/drop
        />
      )}
    </Box>
  );
}

export default Inventory;
