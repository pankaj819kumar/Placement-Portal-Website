import React, { useState, useEffect } from "react";

// api
import axios from "../../../axios";

//MUI
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";

// Chart
import BarChart from "./BarChart";

const Stats = () => {
  const [placementStats, setPlacementStats] = useState({});
  const [chartData, setChartData] = useState({});

  // Fetch placement data from API
  useEffect(() => {
    axios
      .get("/getPlacementData")
      .then((res) => {
        console.log(res.data);
        setPlacementStats(res.data.placementStats);
        setChartData(res.data.chartData);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const style = {
    fontFamily: "Nunito",
    color: "text.secondary",
  };

  return (
    <Container sx={{m: 1}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" sx={style}>
                Students Participating
              </Typography>
              <Typography variant="h5" component="h1" sx={style}>
                {placementStats.participatingStudentsCount || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" sx={style}>
                Students Placed
              </Typography>
              <Typography variant="h5" component="h1" sx={style}>
                {placementStats.PlacedCount || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" sx={style}>
                Highest Package
              </Typography>
              <Typography variant="h5" component="h1" sx={style}>
                {placementStats.highestPackage || "Loading.."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" sx={style}>
                Lowest Package
              </Typography>
              <Typography variant="h5" component="h1" sx={style}>
                {placementStats.lowestPackage || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" sx={style}>
                Average Package
              </Typography>
              <Typography variant="h5" component="h1" sx={style}>
                {placementStats.averagePackage || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" sx={style}>
                Median Package
              </Typography>
              <Typography variant="h5" component="h1" sx={style}>
                {placementStats.medianPackage || "Loading..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={10}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="h2" sx={style}>
                Students Placed
              </Typography>
              {chartData?.salaryRanges && (
                <BarChart placementData={chartData.salaryRanges}/>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Stats;
