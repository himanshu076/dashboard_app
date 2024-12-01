// src/components/common/Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ padding: 3, textAlign: 'center', backgroundColor: '#f1f1f1' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 My Dashboard. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
