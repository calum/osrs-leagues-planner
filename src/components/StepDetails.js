import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css'; // Toast UI Editor CSS

function StepDetails({ step, onSave, isEditing, setEditingStep, currentStep, stepsLength, setCurrentStep }) {
  const [isEditingDescription, setIsEditingDescription] = useState(isEditing);
  const [description, setDescription] = useState(step.description);
  const editorRef = useRef(null);

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
    if (!isEditingDescription) {
      setEditingStep(currentStep);
    } else {
      setEditingStep(null);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      onSave(markdown);
      setDescription(markdown); // Update the description state to force re-render
    }
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
      </div>
      {isEditingDescription ? (
        <div>
          <ToastEditor
            ref={editorRef}
            initialValue={description}
            previewStyle="vertical"
            height="300px"
            initialEditType="markdown"
            useCommandShortcut={true}
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              blockquote: ({ children }) => (
                <blockquote style={{ color: '#6a737d', borderLeft: '4px solid #dfe2e5', paddingLeft: '16px' }}>
                  {children}
                </blockquote>
              ),
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={darcula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              table: ({ children }) => (
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  {children}
                </table>
              ),
              th: ({ children }) => (
                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f8f8f8', textAlign: 'left' }}>
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {children}
                </td>
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default StepDetails;
