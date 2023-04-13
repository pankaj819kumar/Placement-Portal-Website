// react hooks
import { useState, useEffect } from "react";

// react router
import { Link, useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Stack } from "@mui/material";
import {Typography } from "@mui/material";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/ListAlt";
import PlacementsIcon from '@mui/icons-material/DataSaverOff';

const TpoNav = () => {
  // hooks initalization
  const params = useParams();

  const Item = ({ url, Icon, text, active }) => {
    return (
      <Link to={url} className={active ? "profile-navLink active" : "profile-navLink"}>
        <Stack direction="row" spacing={2} alignItems="center">
          {Icon}
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Nunito" }}>
            {text}
          </Typography>
        </Stack>
      </Link>
    );
  };
  return (
    <Stack
      sx={{
        width: 300,
        height: "100%",
        padding: "15px 10px",
      }}
      spacing={2}
      alignItems="center"
    >
      <Item
        url="/tpo/edit"
        Icon={<EditIcon size="small" color="primary" />}
        text="Edit Team"
        active={params.panel === "edit"}
      />
      <Item
        url="/tpo/view"
        Icon={<ListIcon size="small" color="primary" />}
        text="View Team"
        active={params.panel === "view"}
      />
      <Item
        url="/team/student/stats"
        Icon={<PlacementsIcon size="small" color="primary" />}
        text="Placements"
        active={params.panel === "placements"}
      />
    </Stack>
  );
};

export default TpoNav;
