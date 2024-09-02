import { useState, useEffect } from 'react';
import { initClient, signIn, signOut, savePlanToDrive, listPlansFromDrive, loadPlanFromDrive } from '../services/googleDriveService';

export const useGoogleDrive = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    initClient().then((gapi) => {
      const authInstance = gapi.auth2.getAuthInstance();
      setIsSignedIn(authInstance.isSignedIn.get());

      authInstance.isSignedIn.listen(setIsSignedIn);
    });
  }, []);

  const handleSignIn = async () => {
    try {
      await signIn();
      setIsSignedIn(true);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsSignedIn(false);
      setPlans([]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const savePlan = async (planData, planName) => {
    try {
      await savePlanToDrive(planData, planName);
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  const loadPlans = async () => {
    try {
      const plansList = await listPlansFromDrive();
      setPlans(plansList);
    } catch (error) {
      console.error('Error loading plans:', error);
    }
  };

  const loadPlan = async (planId) => {
    try {
      const planData = await loadPlanFromDrive(planId);
      return planData;
    } catch (error) {
      console.error('Error loading plan:', error);
    }
  };

  return {
    isSignedIn,
    plans,
    handleSignIn,
    handleSignOut,
    savePlan,
    loadPlans,
    loadPlan,
  };
};

export default useGoogleDrive;
