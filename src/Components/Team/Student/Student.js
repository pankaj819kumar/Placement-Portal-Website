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
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import StudentPlaced from "./StudentPlaced";
import StudentUnplaced from "./StudentUnplaced";
import PlacementStats from "./Stats";
// import AddRecruiter from "./AddRecruiter";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const getValue = (subPanel) => {
  switch (subPanel) {
    case "list":
      return 0;
    case "details":
      return 1;
    case "placed":
      return 2;
    case "unplaced":
      return 3;
    case "stats":
      return 4;
    default:
      return 0;
  }
};

const getsubPanel = (value) => {
  switch (value) {
    case 0:
      return "list";
    case 1:
      return "details";
    case 2:
      return "placed";
    case 3:
      return "unplaced";
    case 4:
      return "stats";
    default:
      return 0;
  }
};

const Student = () => {
  // subprofile panel
  const params = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(getValue(params.subpanel));

  const handleChange = (event, newValue) => {
    navigate(`/team/${params.panel}/${getsubPanel(newValue)}`);
    setValue(newValue);
  };

  useEffect(() => {
    if (params.value)
      navigate(`/team/${params.panel}/${getsubPanel(getValue(params.subpanel))}/${params.value}`);
    else navigate(`/team/${params.panel}/${getsubPanel(getValue(params.subpanel))}`);
    setValue(getValue(params.subpanel));
  }, [params.subpanel]);

  const TabPanel = ({ value, index, element }) => {
    return value === index ? element : null;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<ListIcon />} iconPosition="start" label="Student List" sx={style} />
          <Tab icon={<DetailsIcon />} iconPosition="start" label="Student Details" sx={style} />
          <Tab icon={<StudentPlacedIcon />} iconPosition="start" label="Student Placed" sx={style} />
          <Tab icon={<StudentUnplacedIcon />} iconPosition="start" label="Student Unplaced" sx={style} />
          <Tab icon={<StatsIcon />} iconPosition="start" label="Placement Stats" sx={style} />
          {/* <Tab icon={<UpdateIcon />} iconPosition="start" label="Update Recruiter" sx={style} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} element={<StudentList />} />
      <TabPanel value={value} index={1} element={<StudentDetails />} />
      <TabPanel value={value} index={2} element={<StudentPlaced/>} />
      <TabPanel value={value} index={3} element={<StudentUnplaced />} />
      <TabPanel value={value} index={4} element={<PlacementStats />} />
      {/* <TabPanel value={value} index={2} element={<UpdateRecruiter />} /> */}
    </Box>
  );
};

export default Student;
