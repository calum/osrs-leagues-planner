import { useState } from 'react';
import examplePlan from '../utils/examplePlan.json'; 


function useSteps() {
  // Check for stored steps in localStorage and parse them, or fall back to the default steps
  const [steps, setSteps] = useState(() => {
    const savedSteps = localStorage.getItem('osrsPlan');
    return savedSteps ? JSON.parse(savedSteps) : examplePlan;
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [editingStep, setEditingStep] = useState(null);

  const handleStepSelect = (index) => {
    setCurrentStep(index);
    setEditingStep(null);
  };

  const handleStepUpdate = (updatedDescription) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStep].description = updatedDescription;
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    const newStep = {
      title: `Step ${steps.length + 1}`,
      description: "New step description",
      items: [...steps[currentStep].items],
      location: ""
    };

    const updatedSteps = [
      ...steps.slice(0, currentStep + 1),
      newStep,
      ...steps.slice(currentStep + 1)
    ];

    setSteps(updatedSteps);
    setCurrentStep(currentStep + 1);
    setEditingStep(currentStep + 1);
  };

  const handleStepMove = (fromIndex, toIndex) => {
    const updatedSteps = [...steps];
    const [movedStep] = updatedSteps.splice(fromIndex, 1);
    updatedSteps.splice(toIndex, 0, movedStep);
    setSteps(updatedSteps);
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleTitleUpdate = (index, newTitle) => {
    const updatedSteps = [...steps];
    updatedSteps[index].title = newTitle;
    setSteps(updatedSteps);
  };

  const handleItemMove = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
  
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      const currentItems = [...newSteps[currentStep].items];
      const draggedItem = currentItems.find(item => item.slot === fromIndex);
  
      // Find the item in the destination slot (if any)
      const targetItem = currentItems.find(item => item.slot === toIndex);
  
      // Swap or move the items
      if (targetItem) {
        targetItem.slot = fromIndex;
      }
  
      draggedItem.slot = toIndex;
  
      // Update the current step's items
      newSteps[currentStep].items = currentItems.map(item => {
        if (item.itemId === draggedItem.itemId) return draggedItem;
        if (targetItem && item.itemId === targetItem.itemId) return targetItem;
        return item;
      });
  
      return newSteps;
    });
  };

  const handleAddItem = (newItem, slot) => {
    const updatedSteps = [...steps];
    if (newItem) {
      const updatedItems = [...steps[currentStep].items.filter(item => item.slot !== slot), newItem];
      updatedSteps[currentStep].items = updatedItems;
    } else {
      const updatedItems = steps[currentStep].items.filter(item => item.slot !== slot);
      updatedSteps[currentStep].items = updatedItems;
    }
    setSteps(updatedSteps);
  };

  // Function to get all unique items used across all steps
  const getAllUniqueItems = () => {
    const allItems = steps.flatMap(step => step.items);
    const uniqueItems = Array.from(new Set(allItems.map(item => item.itemId))).map(itemId =>
      allItems.find(item => item.itemId === itemId)
    );
    return uniqueItems;
  };

  return [
    steps,
    currentStep,
    editingStep,
    setEditingStep,
    handleStepSelect,
    handleStepUpdate,
    handleAddStep,
    handleStepMove,
    handleDeleteStep,
    handleTitleUpdate,
    handleItemMove,
    handleAddItem,
    setSteps,           
    setCurrentStep,
    getAllUniqueItems   
  ];
}

export default useSteps;
