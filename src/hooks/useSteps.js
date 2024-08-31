import { useState } from 'react';

const defaultSteps = [
  {
    title: "Step 1",
    description: "Ask Duke Horacio in Lumbridge Castle for a quest",
    items: [
      { itemId: 123, slot: 0, name: "Spade", imageUrl: "https://oldschool.runescape.wiki/images/Spade.png" },
      { itemId: 234, slot: 1, name: "Wooden Shield", imageUrl: "https://oldschool.runescape.wiki/images/Wooden_shield.png" }
    ],
    location: "Lumbridge Castle"
  },
  {
    title: "Step 2",
    description: "Equip the anti-dragon shield",
    items: [
      { itemId: 234, slot: 1, name: "Wooden Shield", imageUrl: "https://oldschool.runescape.wiki/images/Wooden_shield.png" }
    ],
    location: "Lumbridge Castle"
  },
  {
    title: "Step 3",
    description: "Run upstairs and bank everything",
    items: [
      { itemId: 234, slot: 1, name: "Wooden Shield", imageUrl: "https://oldschool.runescape.wiki/images/Wooden_shield.png" }
    ],
    location: "Lumbridge Bank"
  }
  // More steps...
];

function useSteps() {
  // Check for stored steps in localStorage and parse them, or fall back to the default steps
  const [steps, setSteps] = useState(() => {
    const savedSteps = localStorage.getItem('osrsPlan');
    return savedSteps ? JSON.parse(savedSteps) : defaultSteps;
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
    const updatedItems = steps[currentStep].items.map(item =>
      item.slot === fromIndex ? { ...item, slot: toIndex } : item
    );
    const updatedSteps = [...steps];
    updatedSteps[currentStep].items = updatedItems;
    setSteps(updatedSteps);
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
    setCurrentStep      
  ];
}

export default useSteps;
