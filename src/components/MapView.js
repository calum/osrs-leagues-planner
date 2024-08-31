import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function MapView({ location }) {
  const defaultLocation = "https://explv.github.io/";

  // Validate the location URL
  const isValidLocation = location && location.includes("explv.github.io");
  const mapUrl = isValidLocation ? location : defaultLocation;

  // Default size for the resizable box
  const [size, setSize] = useState({ width: 600, height: 600 });

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      minConstraints={[200, 200]}
      maxConstraints={[600, 600]}
      lockAspectRatio // Ensures the component stays square
      onResizeStop={(e, data) => setSize({ width: data.size.width, height: data.size.height })}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <iframe
          src={mapUrl}
          title="Map View"
          style={{ border: 'none', width: '100%', height: '100%' }}
          allowFullScreen
        />
      </Box>
    </ResizableBox>
  );
}

export default MapView;
