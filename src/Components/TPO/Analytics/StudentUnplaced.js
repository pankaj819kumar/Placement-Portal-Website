import { Box } from "@mui/material";

// import UpdateIcon from "@mui/icons-material/Upgrade";
import { useParams, useNavigate } from "react-router-dom";
// Profile Components
import UnplacedList from "./UnplacedList";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const StudentUnplaced = () => {
  const params = useParams();
  return (
    <Box sx={{ width: "100%" }}>
      <UnplacedList />
      {/* <TabPanel value={value} index={2} element={<UpdateRecruiter />} /> */}
    </Box>
  );
};

export default StudentUnplaced;
