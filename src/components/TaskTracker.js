import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TaskTracker = ({ steps, currentStep }) => {
  const [tasksIncluding, setTasksIncluding] = useState(0);
  const [pointsIncluding, setPointsIncluding] = useState(0);

  useEffect(() => {
    let includingTasks = 0;
    let includingPoints = 0;

    const processTaskMatches = (taskMatches) => {
      taskMatches.forEach(match => {
        const points = parseInt(match.replace(/[<>]/g, ''), 10);
        includingTasks += 1;
        includingPoints += points;
      });
    };

    for (let i = 0; i <= currentStep; i++) {
      const taskMatches = steps[i].description.match(/<(\d+)>/g);
      if (taskMatches) {
        processTaskMatches(taskMatches);
      }
    }

    setTasksIncluding(includingTasks);
    setPointsIncluding(includingPoints);
  }, [steps, currentStep]);

  return (
    <Box sx={{ padding: '8px', border: '1px solid #ccc', borderRadius: '8px', width: '220px' }}>
      <Typography variant="subtitle2">
        <strong>{tasksIncluding}</strong> tasks incl. current ({pointsIncluding.toLocaleString()} pts)
      </Typography>
    </Box>
  );
};

export default TaskTracker;
