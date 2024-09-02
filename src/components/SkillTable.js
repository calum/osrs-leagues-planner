import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton, Box, Grid
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import TaskTracker from './TaskTracker';

const skills = [
  'Attack', 'Defense', 'Strength', 'Hitpoints', 'Ranged', 'Prayer',
  'Magic', 'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking',
  'Crafting', 'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving',
  'Slayer', 'Farming', 'Runecrafting', 'Hunter', 'Construction'
];

const xpTable = [
    { level: 1, xp: 0 },
    { level: 2, xp: 83 },
    { level: 3, xp: 174 },
    { level: 4, xp: 276 },
    { level: 5, xp: 388 },
    { level: 6, xp: 512 },
    { level: 7, xp: 650 },
    { level: 8, xp: 801 },
    { level: 9, xp: 969 },
    { level: 10, xp: 1154 },
    { level: 11, xp: 1358 },
    { level: 12, xp: 1584 },
    { level: 13, xp: 1833 },
    { level: 14, xp: 2107 },
    { level: 15, xp: 2411 },
    { level: 16, xp: 2746 },
    { level: 17, xp: 3115 },
    { level: 18, xp: 3523 },
    { level: 19, xp: 3973 },
    { level: 20, xp: 4470 },
    { level: 21, xp: 5018 },
    { level: 22, xp: 5624 },
    { level: 23, xp: 6291 },
    { level: 24, xp: 7028 },
    { level: 25, xp: 7842 },
    { level: 26, xp: 8740 },
    { level: 27, xp: 9730 },
    { level: 28, xp: 10824 },
    { level: 29, xp: 12031 },
    { level: 30, xp: 13363 },
    { level: 31, xp: 14833 },
    { level: 32, xp: 16456 },
    { level: 33, xp: 18247 },
    { level: 34, xp: 20224 },
    { level: 35, xp: 22406 },
    { level: 36, xp: 24815 },
    { level: 37, xp: 27473 },
    { level: 38, xp: 30408 },
    { level: 39, xp: 33648 },
    { level: 40, xp: 37224 },
    { level: 41, xp: 41171 },
    { level: 42, xp: 45529 },
    { level: 43, xp: 50339 },
    { level: 44, xp: 55649 },
    { level: 45, xp: 61512 },
    { level: 46, xp: 67983 },
    { level: 47, xp: 75127 },
    { level: 48, xp: 83014 },
    { level: 49, xp: 91721 },
    { level: 50, xp: 101333 },
    { level: 51, xp: 111945 },
    { level: 52, xp: 123660 },
    { level: 53, xp: 136594 },
    { level: 54, xp: 150872 },
    { level: 55, xp: 166636 },
    { level: 56, xp: 184040 },
    { level: 57, xp: 203254 },
    { level: 58, xp: 224466 },
    { level: 59, xp: 247886 },
    { level: 60, xp: 273742 },
    { level: 61, xp: 302288 },
    { level: 62, xp: 333804 },
    { level: 63, xp: 368599 },
    { level: 64, xp: 407015 },
    { level: 65, xp: 449428 },
    { level: 66, xp: 496254 },
    { level: 67, xp: 547953 },
    { level: 68, xp: 605032 },
    { level: 69, xp: 668051 },
    { level: 70, xp: 737627 },
    { level: 71, xp: 814445 },
    { level: 72, xp: 899257 },
    { level: 73, xp: 992895 },
    { level: 74, xp: 1096278 },
    { level: 75, xp: 1210421 },
    { level: 76, xp: 1336443 },
    { level: 77, xp: 1475581 },
    { level: 78, xp: 1629200 },
    { level: 79, xp: 1798808 },
    { level: 80, xp: 1986068 },
    { level: 81, xp: 2192818 },
    { level: 82, xp: 2421087 },
    { level: 83, xp: 2673114 },
    { level: 84, xp: 2951373 },
    { level: 85, xp: 3258594 },
    { level: 86, xp: 3597792 },
    { level: 87, xp: 3972294 },
    { level: 88, xp: 4385776 },
    { level: 89, xp: 4842295 },
    { level: 90, xp: 5346332 },
    { level: 91, xp: 5902831 },
    { level: 92, xp: 6517253 },
    { level: 93, xp: 7195629 },
    { level: 94, xp: 7944614 },
    { level: 95, xp: 8771558 },
    { level: 96, xp: 9684577 },
    { level: 97, xp: 10692629 },
    { level: 98, xp: 11805606 },
    { level: 99, xp: 13034431 }
];

// Function to find the level based on XP
const getLevelFromXP = (xp) => {
for (let i = xpTable.length - 1; i >= 0; i--) {
    if (xp >= xpTable[i].xp) {
    return xpTable[i].level;
    }
}
return 1; // Default to level 1 if no match
};  

const SkillTable = ({ steps, currentStep }) => {
  const [open, setOpen] = useState(false);
  const [skillXP, setSkillXP] = useState({});

  useEffect(() => {
    const skillXPMap = {};

    // Calculate XP gains from all previous tasks
    for (let i = 0; i < steps.length; i++) {
      steps[i].description.split('\n').forEach(line => {
        skills.forEach(skill => {
          const regex = new RegExp(`${skill}\\s*\\+([0-9,]+)\\s*XP`, 'i');
          const match = line.match(regex);
          if (match) {
            const xpValue = parseInt(match[1].replace(/,/g, ''), 10);
            if (!skillXPMap[skill]) {
              skillXPMap[skill] = { total: 0, includingCurrent: 0 };
            }
            if (i < currentStep) {
              skillXPMap[skill].total += xpValue;
            }
            if (i <= currentStep) {
              skillXPMap[skill].includingCurrent += xpValue;
            }
          }
        });
      });
    }

    setSkillXP(skillXPMap);
  }, [steps, currentStep]);

  // Filter skills with XP
  const skillsWithXP = Object.keys(skillXP).filter(skill => skillXP[skill].total > 0 || skillXP[skill].includingCurrent > 0);

  return (
    <Box mb={2}>
      <Grid container spacing={1}>
        <Grid item>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <ExpandLess /> : <ExpandMore />}
            <span style={{ marginLeft: '8px' }}>Skill XP Tracker</span>
          </IconButton>
          <Collapse in={open}>
            <TableContainer component={Paper} sx={{ maxWidth: 350 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ padding: '4px', fontSize: '0.8rem' }}>Skill</TableCell>
                    <TableCell style={{ padding: '4px', fontSize: '0.8rem' }}>Total XP</TableCell>
                    <TableCell style={{ padding: '4px', fontSize: '0.8rem' }}>Including Current</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skillsWithXP.map(skill => (
                    <TableRow key={skill}>
                      <TableCell style={{ padding: '4px', fontSize: '0.8rem' }}>{skill}</TableCell>
                      <TableCell style={{ padding: '4px', fontSize: '0.8rem' }}>
                        {skillXP[skill]?.total.toLocaleString()} ({getLevelFromXP(skillXP[skill]?.total)})
                      </TableCell>
                      <TableCell style={{ padding: '4px', fontSize: '0.8rem' }}>
                        {skillXP[skill]?.includingCurrent.toLocaleString()} ({getLevelFromXP(skillXP[skill]?.includingCurrent)})
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Grid>
        <Grid item>
          <TaskTracker steps={steps} currentStep={currentStep} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkillTable;
