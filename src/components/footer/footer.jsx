import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function SimplePaper() {
  return (
    <Box
  sx={{
    marginTop: '40px',
    position: 'relative',
    float: 'bottom',
    height: 100,
    backgroundColor: 'primary.dark',
  }}
>
  <Typography variant="h6" id="modal-modal-title" sx={{color: 'white'}}>
  ©2022 Made by Kuchenko Dmitriy
  </Typography>
</Box>
  );
}

