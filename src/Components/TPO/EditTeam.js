import { Box } from "@mui/material";

// import UpdateIcon from "@mui/icons-material/Upgrade";
import { useParams, useNavigate } from "react-router-dom";
// Profile Components
import StudentList from "./StudentList";

const style = { minHeight: 0, fontFamily: "Nunito", textTransform: "none", fontSize: "12px" };

const EditTeam=()=>{
    const params = useParams();
    return (
        <Box sx={{ width: "100%" }}>
<StudentList/>
          {/* <TabPanel value={value} index={2} element={<UpdateRecruiter />} /> */}
        </Box>
      );
}

export default EditTeam;