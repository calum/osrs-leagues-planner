import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDrag, useDrop } from 'react-dnd';
import './StepList.css';

const ItemTypes = {
  STEP: 'step',
};

function StepList({ steps, currentStep, onStepSelect, onTitleUpdate, onStepMove, onDeleteStep, editingStep, setEditingStep }) {
  const [editingTitle, setEditingTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleEditClick = (index, title) => {
    setEditingStep(index);
    setEditingTitle(title);
  };

  const handleTitleChange = (event) => {
    setEditingTitle(event.target.value);
  };

  const handleTitleSave = (index) => {
    onTitleUpdate(index, editingTitle);
    setEditingStep(null);
  };

  const handleDeleteClick = (index) => {
    setShowDeleteConfirm(index);
  };

  const confirmDeleteStep = (index) => {
    onDeleteStep(index);
    setShowDeleteConfirm(null);
  };

  const cancelDeleteStep = () => {
    setShowDeleteConfirm(null);
  };

  const moveStep = (dragIndex, hoverIndex) => {
    onStepMove(dragIndex, hoverIndex);
  };

  return (
    <div className="step-list">
      <ul>
        {steps.map((step, index) => (
          <StepListItem
            key={index}
            index={index}
            step={step}
            isActive={index === currentStep}
            isEditing={editingStep === index}
            editingTitle={editingTitle}
            onEditClick={handleEditClick}
            onTitleChange={handleTitleChange}
            onTitleSave={handleTitleSave}
            onDeleteClick={handleDeleteClick}
            showDeleteConfirm={showDeleteConfirm === index}
            confirmDeleteStep={confirmDeleteStep}
            cancelDeleteStep={cancelDeleteStep}
            moveStep={moveStep}
            onStepSelect={onStepSelect}
          />
        ))}
      </ul>
    </div>
  );
}

function StepListItem({
  step, index, isActive, isEditing, editingTitle, onEditClick, onTitleChange, onTitleSave, onDeleteClick, showDeleteConfirm, confirmDeleteStep, cancelDeleteStep, moveStep, onStepSelect
}) {
  const [, drag] = useDrag({
    type: ItemTypes.STEP,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.STEP,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveStep(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => drag(drop(node))}
      className={isActive ? 'active' : ''}
      onClick={() => onStepSelect(index)}
      onDoubleClick={() => onEditClick(index, step.title)} // Enable double-click to edit
    >
      <span className="step-number">{index + 1}.</span> {/* Step number indicating order */}
      {isEditing ? (
        <input
          type="text"
          value={editingTitle}
          onChange={onTitleChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onTitleSave(index);
            }
          }}
          onClick={(event) => event.stopPropagation()} // Prevent list item click when editing
          autoFocus
        />
      ) : (
        <>
          {step.title}
          <FaTrashAlt
            className="delete-icon"
            onClick={(event) => {
              event.stopPropagation();
              onDeleteClick(index);
            }}
          />
        </>
      )}
      {showDeleteConfirm && (
        <div className="confirm-delete">
          <span>Delete step?</span>
          <button onClick={() => confirmDeleteStep(index)}>Yes</button>
          <button onClick={cancelDeleteStep}>No</button>
        </div>
      )}
    </li>
  );
}

export default StepList;
