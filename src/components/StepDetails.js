import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function StepDetails({ step, onSave, isEditing, setEditingStep, currentStep, stepsLength, setCurrentStep }) {
  const [isEditingDescription, setIsEditingDescription] = useState(isEditing);
  const [description, setDescription] = useState(step.description);

  // Update the description state when the step prop changes
  useEffect(() => {
    setDescription(step.description);
  }, [step]);

  useEffect(() => {
    if (isEditing) {
      setIsEditingDescription(true);
    }
  }, [isEditing]);

  const handleEditToggle = () => {
    setIsEditingDescription(!isEditingDescription);
    setEditingStep(null);
  };

  const handleSave = () => {
    onSave(description);
    setIsEditingDescription(false);
    setEditingStep(null);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < stepsLength - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div
      className="step-details"
      style={{
        minHeight: '200px',
        minWidth: '300px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="step-controls" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{
              padding: '5px 10px',
              fontSize: '0.8rem',
              marginRight: '5px',
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === stepsLength - 1}
            style={{
              padding: '5px 10px',
              fontSize: '0.8rem',
            }}
          >
            Next
          </button>
        </div>
        <button
          onClick={handleEditToggle}
          style={{
            padding: '5px 10px',
            fontSize: '0.8rem',
          }}
        >
          {isEditingDescription ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {isEditingDescription ? (
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="10"
            style={{ width: '100%', fontFamily: 'monospace', fontSize: '1rem' }}
          />
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <button onClick={handleSave} style={{ padding: '5px 10px', fontSize: '0.8rem', marginRight: '5px' }}>
              Save
            </button>
            <button onClick={handleEditToggle} style={{ padding: '5px 10px', fontSize: '0.8rem' }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default StepDetails;
