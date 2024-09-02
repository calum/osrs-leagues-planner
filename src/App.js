import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import StepList from './components/StepList';
import StepDetails from './components/StepDetails';
import Inventory from './components/Inventory';
import MapView from './components/MapView';
import SkillTable from './components/SkillTable';
import HelpDialog from './components/HelpDialog';
import './App.css';
import useSteps from './hooks/useSteps';
import useGoogleDrive from './hooks/useGoogleDrive';
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
    setCurrentStep,
    getAllUniqueItems,
  ] = useSteps();

  const { isSignedIn, plans, handleSignIn, handleSignOut, savePlan, loadPlans, loadPlan } = useGoogleDrive();
  const [loading, setLoading] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [planName, setPlanName] = useState("osrs-leagues-plan");

  const isLargeScreen = useMediaQuery('(min-width:1200px)');

  useEffect(() => {
    localStorage.setItem('osrsPlan', JSON.stringify(steps));
  }, [steps]);

  const savePlanToGoogleDrive = async () => {
    setLoading(true);
    await savePlan(steps, planName);
    setLoading(false);
    setSaveDialogOpen(false);
  };

  const loadPlanFromGoogleDrive = async (fileId) => {
    setLoading(true);
    const loadedSteps = await loadPlan(fileId);
    setSteps(loadedSteps);
    setLoading(false);
    setLoadDialogOpen(false);
  };

  const openSaveDialog = () => {
    setSaveDialogOpen(true);
  };

  const openLoadDialog = async () => {
    setLoading(true);
    await loadPlans();
    setLoading(false);
    setLoadDialogOpen(true);
  };

  const handleSafeStepSelect = (index) => {
    if (index >= 0 && index < steps.length) {
      handleStepSelect(index);
    }
  };

  const handleSaveLocation = (newLocation) => {
    const updatedSteps = [...steps];
    updatedSteps[currentStep].location = newLocation;
    setSteps(updatedSteps);
  };

  if (currentStep >= steps.length) {
    setCurrentStep(steps.length - 1);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {!isLargeScreen && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ margin: 1 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  {currentStep + 1}. {steps[currentStep]?.title || 'No Step Selected'}
                </Typography>
              </Box>
            </Box>

            <Button
              className="help-button"
              variant="outlined"
              startIcon={<HelpOutlineIcon />}
              onClick={() => setIsHelpDialogOpen(true)}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              Help
            </Button>
          </>
        )}

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          variant={isLargeScreen ? 'permanent' : 'temporary'}
          sx={{
            display: isLargeScreen ? 'block' : undefined,
            width: isLargeScreen ? 300 : undefined,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isLargeScreen ? 300 : undefined,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ width: 250, padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Plan Actions
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={handleAddStep}
              sx={{ marginBottom: 1 }}
            >
              Add Step
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              onClick={() => handleDownloadCSV(steps)}
              sx={{ marginBottom: 1 }}
            >
              Download Plan
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={openLoadDialog}
              sx={{ marginBottom: 1 }}
              disabled={!isSignedIn || loading}
            >
              Load from Google Drive
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={openSaveDialog}
              sx={{ marginBottom: 1 }}
              disabled={!isSignedIn || loading}
            >
              Save to Google Drive
            </Button>
            <label htmlFor="upload-plan">
              <input
                id="upload-plan"
                type="file"
                accept=".csv"
                onChange={(event) => handleFileUpload(event, setSteps)}
                style={{ display: 'none' }}
              />
              <Button
                variant="contained"
                component="span"
                fullWidth
                sx={{ marginBottom: 2 }}
              >
                Upload Plan
              </Button>
            </label>
            {isLargeScreen && <Button
              className="help-button"
              variant="outlined"
              startIcon={<HelpOutlineIcon />}
              onClick={() => setIsHelpDialogOpen(true)}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              Help
            </Button>}
            <Button onClick={() => handleSignIn()} disabled={isSignedIn}>Sign In</Button>
            <Button onClick={() => handleSignOut()} disabled={!isSignedIn}>Sign Out</Button>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Steps
            </Typography>
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
          </Box>
        </Drawer>

        <div className="container">
          <div className="right-panel" style={{ marginLeft: isLargeScreen ? 250 : 0 }}>
            {steps[currentStep] && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <SkillTable steps={steps} currentStep={currentStep} />
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
                      uniqueItems={getAllUniqueItems()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MapView 
                      location={steps[currentStep].location} 
                      onSaveLocation={handleSaveLocation}
                      isEditing={editingStep === currentStep}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </div>
        {/* Save Plan Dialog */}
        <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
          <DialogTitle>Save Plan to Google Drive</DialogTitle>
          <DialogContent>
            <TextField
              select
              margin="dense"
              label="Select or Enter Plan Name"
              type="text"
              fullWidth
              variant="outlined"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="osrs-leagues-plan">osrs-leagues-plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.name.replace('.json', '')}>
                  {plan.name.replace('.json', '')}
                </option>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Or Enter New Plan Name"
              type="text"
              fullWidth
              variant="outlined"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSaveDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={savePlanToGoogleDrive} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Load Plan Dialog */}
        <Dialog open={loadDialogOpen} onClose={() => setLoadDialogOpen(false)}>
          <DialogTitle>Select a Plan to Load</DialogTitle>
          <DialogContent>
            {plans.map((plan) => (
              <Button
                key={plan.id}
                onClick={() => loadPlanFromGoogleDrive(plan.id)}
                fullWidth
                sx={{ marginBottom: 1 }}
              >
                {plan.name.replace('.json', '')}
              </Button>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLoadDialogOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <HelpDialog 
          open={isHelpDialogOpen}
          onClose={() => setIsHelpDialogOpen(false)}
        />
      </div>
    </DndProvider>
  );
}

export default App;
