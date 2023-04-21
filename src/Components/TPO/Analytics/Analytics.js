// Hooks
import { useState, useEffect } from "react";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Box, Tabs, Tab } from "@mui/material";

// MUI Icons
import ListIcon from "@mui/icons-material/List";
import DetailsIcon from "@mui/icons-material/ManageAccounts";
import StudentIcon from "@mui/icons-material/PeopleAlt";
import StudentPlacedIcon from '@mui/icons-material/Person';
import StudentUnplacedIcon from '@mui/icons-material/PermIdentity';
import StatsIcon from '@mui/icons-material/BarChart';
// import UpdateIcon from "@mui/icons-material/Upgrade";

// Profile Components
import StudentPlaced from "./StudentPlaced";
import StudentUnplaced from "./StudentUnplaced";
import PlacementStats from "./Stats";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const getValue = (subPanel) => {
  switch (subPanel) {
    case "placed":
      return 0;
    case "unplaced":
      return 1;
    case "stats":
      return 2;
    default:
      return 0;
  }
};

const getsubPanel = (value) => {
  switch (value) {
    case 0:
      return "placed";
    case 1:
      return "unplaced";
    case 2:
      return "stats";
    default:
      return 0;
  }
};

const Analytics = () => {
  // subprofile panel
  const params = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(getValue(params.subpanel));

  const handleChange = (event, newValue) => {
    navigate(`/tpo/${params.panel}/${getsubPanel(newValue)}`);
    setValue(newValue);
  };

  useEffect(() => {
    // console.log(params.value);
    if (params.value)
      navigate(`/tpo/${params.panel}/${getsubPanel(getValue(params.subpanel))}/${params.value}`);
    else navigate(`/tpo/${params.panel}/${getsubPanel(getValue(params.subpanel))}`);
    navigate(`/tpo/${params.panel}/${getsubPanel(getValue(params.subpanel))}`);
    setValue(getValue(params.subpanel));
  }, [params.subpanel]);

  const TabPanel = ({ value, index, element }) => {
    return value === index ? element : null;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<StudentPlacedIcon />} iconPosition="start" label="Student Placed" sx={style} />
          <Tab icon={<StudentUnplacedIcon />} iconPosition="start" label="Student Unplaced" sx={style} />
          <Tab icon={<StatsIcon />} iconPosition="start" label="Placement Stats" sx={style} />
          {/* <Tab icon={<UpdateIcon />} iconPosition="start" label="Update Recruiter" sx={style} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} element={<StudentPlaced/>} />
      <TabPanel value={value} index={1} element={<StudentUnplaced />} />
      <TabPanel value={value} index={2} element={<PlacementStats />} />
      {/* <TabPanel value={value} index={2} element={<UpdateRecruiter />} /> */}
    </Box>
  );
};

export default Analytics;
