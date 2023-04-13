import React, { useState, useEffect } from 'react';


//MUI
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";

// Graph
import Graph from './Graph';

const StatsCard = (cardTitle, cardData) => {

  return (
    <Card variant='outlined'>
    <CardContent>
        <Typography variant="h5" component="h2">
        {cardTitle}
        </Typography>
        <Typography variant="h4" component="h1">
        {cardData || 'Loading...'}
        </Typography>
    </CardContent>
    </Card>
  );
};

export default StatsCard;
