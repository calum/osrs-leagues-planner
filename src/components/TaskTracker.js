import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TaskTracker = ({ steps, currentStep }) => {
  const [tasksBefore, setTasksBefore] = useState(0);
  const [tasksIncluding, setTasksIncluding] = useState(0);
  const [pointsBefore, setPointsBefore] = useState(0);
  const [pointsIncluding, setPointsIncluding] = useState(0);

  useEffect(() => {
    let beforeTasks = 0;
    let beforePoints = 0;
    let includingTasks = 0;
    let includingPoints = 0;

    for (let i = 0; i <= currentStep; i++) {
      const taskMatches = steps[i].description.match(/<(\d+)>/g);
      if (taskMatches) {
        taskMatches.forEach(match => {
          const points = parseInt(match.replace(/[<>]/g, ''), 10);
          includingTasks += 1;
          includingPoints += points;
          if (i < currentStep) {
            beforeTasks += 1;
            beforePoints += points;
          }
        });
      }
    }

    setTasksBefore(beforeTasks);
    setPointsBefore(beforePoints);
    setTasksIncluding(includingTasks);
    setPointsIncluding(includingPoints);
  }, [steps, currentStep]);

  return (
    <Box sx={{ padding: '8px', border: '1px solid #ccc', borderRadius: '8px', width: '220px' }}>
      <Typography variant="subtitle2">
        <strong> {tasksIncluding}</strong> tasks incl. current ({pointsIncluding} pts)
      </Typography>
    </Box>
  );
};

export default TaskTracker;
