import React, { useState, useEffect } from 'react';


//MUI
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";


const StatsCard = (cardTitle, cardData) => {

  return (
    <Grid item xs={12} sm={6} md={4}>
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
    </Grid>
  );
};

export default StatsCard;
