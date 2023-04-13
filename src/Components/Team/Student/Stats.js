import React, { useState, useEffect } from 'react';

// api
import axios from "../../../axios";

//MUI
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";

// Graph
import Graph from './Graph';

//component
import StatsCard from './StatsCard';

const Stats = () => {
  const [placementData, setPlacementData] = useState({});

  // Fetch placement data from API
  useEffect(() => {
    axios
    .get("/getPlacementData")
      .then((res) => {
      console.log(res.data);
      setPlacementData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  const style = {
    fontFamily: "Nunito",
    color: "text.secondary"
  }

  return (
    <Container color="text.secondary">
      <Grid container spacing={2} >
        <Grid item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="h5" component="h2" sx={style}>
              Students Participating
              </Typography>
              <Typography variant="h4" component="h1">
                {placementData.participatingStudentsCount || 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="h5" component="h2">
                Students Placed
              </Typography>
              <Typography variant="h4" component="h1">
                {placementData.PlacedCount || 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="h5" component="h2">
                Highest Package
              </Typography>
              <Typography variant="h4" component="h1">
                {placementData.highestPackage || 'Loading..'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="h5" component="h2">
                Lowest Package
              </Typography>
              <Typography variant="h4" component="h1">
                {placementData.lowestPackage || 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="h5" component="h2">
                Average Package
              </Typography>
              <Typography variant="h4" component="h1">
                {placementData.averagePackage || 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12}>
          <Card variant='outlined'>
            <CardContent>
              <Typography variant="h5" component="h2">
                Students Placed by Salary Range
              </Typography>
              <Graph data={placementData.salaryRanges} />
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Stats;
