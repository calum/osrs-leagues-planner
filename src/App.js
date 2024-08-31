import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Grid from '@mui/material/Grid';
import StepList from './components/StepList';
import StepDetails from './components/StepDetails';
import Inventory from './components/Inventory';
import MapView from './components/MapView';
import './App.css';
import useSteps from './hooks/useSteps';
import { handleFileUpload, handleDownloadCSV } from './utils/csvUtils';

function App() {
  const [
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
  ] = useSteps();

  const handleSafeStepSelect = (index) => {
    if (index >= 0 && index < steps.length) {
      handleStepSelect(index);
    }
  };

  // Adjust current step if out of bounds after step changes
  if (currentStep >= steps.length) {
    setCurrentStep(steps.length - 1);
  }

  console.log(steps[currentStep]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="navbar">
          <label className="custom-file-upload">
            <input type="file" accept=".csv" onChange={(event) => handleFileUpload(event, setSteps)} />
            Upload Plan
          </label>
          <button onClick={() => handleDownloadCSV(steps)}>Download Plan</button>
          <button onClick={handleAddStep}>Add Step</button>
        </div>
        <div className="container">
          <div className="left-panel">
            <StepList 
              steps={steps} 
              currentStep={currentStep} 
              onStepSelect={handleSafeStepSelect} 
              onTitleUpdate={handleTitleUpdate} 
              editingStep={editingStep} 
              setEditingStep={setEditingStep} 
              onDeleteStep={handleDeleteStep}
              onStepMove={handleStepMove}
            />
          </div>
          <div className="right-panel">
            {steps[currentStep] && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <StepDetails 
                      step={steps[currentStep]} 
                      onSave={handleStepUpdate} 
                      isEditing={editingStep === currentStep} 
                      setEditingStep={setEditingStep} 
                      currentStep={currentStep}
                      stepsLength={steps.length}
                      setCurrentStep={setCurrentStep}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Inventory 
                      items={steps[currentStep].items} 
                      onItemMove={handleItemMove} 
                      onAddItem={handleAddItem} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MapView location={steps[currentStep].location} />
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
