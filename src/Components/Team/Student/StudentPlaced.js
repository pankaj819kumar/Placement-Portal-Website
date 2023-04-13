import { Box } from "@mui/material";

// import UpdateIcon from "@mui/icons-material/Upgrade";
import { useParams, useNavigate } from "react-router-dom";
// Profile Components
import PlacedList from "./PlacedList";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const StudentPlaced=()=>{
    const params = useParams();
    return (
        <Box sx={{ width: "100%" }}>
<PlacedList/>
          {/* <TabPanel value={value} index={2} element={<UpdateRecruiter />} /> */}
        </Box>
      );
}

export default StudentPlaced;