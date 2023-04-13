import { useState, useEffect } from "react";

// react router
import { useParams, useNavigate } from "react-router-dom";

// api
import axios from "../../axios";

// MUI Components
import { Box, Stack, Typography, Avatar, Button } from "@mui/material";
import { Pagination, IconButton, CircularProgress } from "@mui/material";
import { Select, MenuItem } from '@mui/material';
// MUI-X Components
import { DataGrid } from "@mui/x-data-grid";

// MUI Icons
import UpdateIcon from "@mui/icons-material/Replay";

// assets
import CopyableText from "../assets/MicroComponents/copyText";
import StudentSearch from "./StudentSearch";
const generateViewURL = (url) => {
    const prefix = "https://drive.google.com/file/d/";
    const documentId = url.replace(prefix, "").split("/")[0];
    return "https://drive.google.com/uc?export=view&id=" + documentId;
  };
// Components
const ColTxt = ({ txt }) => {
  return (
    <Typography
      sx={{ fontSize: "11px", fontFamily: "Nunito", lineHeight: "none" }}
      align="justify"
    >
      <strong>{txt}</strong>
    </Typography>
  );
};
const currentYear = () => {
   
    const date = new Date();
    return date.getFullYear();
  };
 
 



const TeamList=()=>{
  
    const params = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState(params.value===null?"":params.value)
    const [Loading, setLoading] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [recruiter, setRecruiter] = useState({});
    const [opencontact, setOpenContact] = useState(false);
    const [listChanged, setListChanged] = useState(false);
   
    const [filters, setFilters] = useState({
        courseId : "636165923f57d2adcc75938d",
        entriesPerPage : 50,
        page:1, 
        searchQuery : ""
        //   page: 1,
    //   entriesPerPage: 50,
    //   passingYear: currentYear() + 1,
    //   courseId: "",
    //   aggregateCGPASemester: 2,
    
    });
    const deleteEmptyParams = (filters) => {
     delete filters.departmentId;
    delete filters.minCGPA;
     delete filters.dreamLPA;
       delete filters.gender;
       delete filters.isParticipatingInPlacements;
       delete filters.aggregateCGPASemester;
       
        return filters;
      };
  
//getStudents

 

  useEffect(()=>{
  
    axios.get('/viewTeam')
    .then(response => {console.log(response.data)
      var trows = response.data.map((student) => {
        return {
          id: student._id,
          student: [
            {
              name: student.name,
              id: student._id,
              photo: student.photo,
            },
          ],
       
          enrollment: student.enrollmentNo,
          email: [{ collegeEmail: student.collegeEmail, personalEmail: student.personalEmail }],
          department: student.departmentName,
          contact: [{ phoneNo: student.phoneNo, altPhoneNo: student.altPhoneNo }],
          teamstatus:[{designation:student.designation,userId:student._id}]
        };
      });
      console.log(trows)
    setRows(trows)
    })

    .catch(error => console.log(error));
    console.log("yes")
  }
  
  ,[])

const [rows,setRows]=useState({});

  const columns = [
    {
      field: "student",
      headerName: "Student",
      width: 250,
      sortable: false,
      renderCell: (val) => {
        const res = val.value[0];
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={res.photo ? generateViewURL(res.photo) : "/images/userImg.png"}
              alt={res.name}
              sx={{ height: 60, width: 60 }}
            />
            <Stack>
              <ColTxt txt={res.name} />
              <CopyableText text={res.id} fontSize="10px" />
            </Stack>
          </Stack>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
      sortable: false,
      renderCell: (val) => {
        const res = val.value[0];
        return (
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Stack>
              <ColTxt txt="College Email" />
              <CopyableText text={res.collegeEmail} fontSize="10px" />
            </Stack>
            <Stack>
              <ColTxt txt="Personal Email" />
              <CopyableText text={res.personalEmail} fontSize="10px" />
            </Stack>
          </Stack>
        );
      },
    },

    
   
    {
      field: "contact",
      headerName: "Contact",
      width: 200,
      sortable: false,
      renderCell: (val) => {
        const res = val.value[0];
        return (
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Stack>
              <ColTxt txt="Primary Phone" />
              <CopyableText text={res.phoneNo} fontSize="10px" />
            </Stack>
            <Stack>
              <ColTxt txt="Alternate Phone" />
              <CopyableText text={res.altPhoneNo} fontSize="10px" />
            </Stack>
          </Stack>
        );
      },
    },


    {
      field: "teamstatus",
      headerName: "Team Role Assigned",
      width: 200,
      editable: true,
      renderCell: (params) => {
      return ( <ColTxt txt={params.value[0].designation} />)
    },
    },
    
  ];

 
  const handleChange = (e, newPage) => {
    setFilters({ ...filters, page: newPage });
  };
  
console.log(params)
  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ padding: "10px" }}>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          loading={Loading}
          rows={rows}
          columns={columns}
          autoHeight
          rowHeight={300}
          pageSize={filters.entriesPerPage}
          hideFooter
          disableColumnMenu
          disableSelectionOnClick
          rowBuffer={10}
          density="compact"
          headerHeight={48}
        />
      </Box>
     
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton size="small">
          {Loading ? (
            <CircularProgress size={15} color="inherit" />
          ) : (
            <UpdateIcon sx={{ height: "15px", width: "15px" }} />
          )}
        </IconButton>
        <Pagination
          page={filters.page}
          onChange={handleChange}
          count={totalPages}
          shape="rounded"
          color="primary"
          variant="outlined"
        />
      </Stack>
    </Stack>
  );
}
export default TeamList