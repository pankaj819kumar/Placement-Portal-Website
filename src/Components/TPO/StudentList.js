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
  const options = [
    { value: 'STUDENT', label: 'STUDENT' },
    { value: 'MTECH CO-ORDINATOR', label: 'MTECH CO-ORDINATOR' },
    { value: 'BTECH CO-ORDINATOR', label:'BTECH CO-ORDINATOR'},
    { value: 'OVERALL CO-ORDINATOR', label:'OVERALL CO-ORDINATOR'},
  { value: ' PLACEMENT EXECUTIVE', label:'PLACEMENT EXECUTIVE'},
  
  ];
 
  const CustomCellRenderer = ({ value,userId, onEditCellChange }) => {
    const [selectedOption, setSelectedOption] = useState(value);
  
    const handleChange = (event) => {
      const newValue = event.target.value;
      console.log(value,userId);
      axios
      .post("/updateTeamMember", { "userId": userId,"designation":event.target.value  })
      .then((res) => {
      console.log("Updated")
      })
      .catch((err) => {
        console.log(err)
      });
      setSelectedOption(newValue);
      onEditCellChange({ value: newValue });
     
    };
  
    return (
      <Select value={selectedOption} onChange={handleChange}>
        {options.map((option) => (
          
          <MenuItem key={option.value} value={option.value} >
             <ColTxt  txt={option.label} />
          </MenuItem>
         
        ))}
      </Select>
    );
  };


const StudentList=()=>{
  
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
      page: 1,
      entriesPerPage: 50,
      passingYear: currentYear() + 1,
      courseId: "",
      aggregateCGPASemester: 2,
      dreamLPA: 9,
      courseId:"636165923f57d2adcc75938d"
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
const getStudentList = (filters) => {
  console.log(deleteEmptyParams(filters)); 
  setLoading(true);
    if (!(params.value=== null))
      filters = { ...filters, searchQuery: params.value };
  
    axios
      .get("/getstudentList", { params: deleteEmptyParams(filters) })
      .then((res) => {
        console.log(res.data);
        setStudentList(res.data.data);
        setTotalPages(res.data.pageCount);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
      console.log("yes",deleteEmptyParams(filters));
  };
  useEffect(() => {
    getStudentList(filters);
  }, [params.value, listChanged]);

 

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
      field: "gender",
      headerName: "Gender",
      width: 100,
      sortable: false,
      renderCell: (val) => {
        const res = val.value;
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <ColTxt txt={res} />
          </Stack>
        );
      },
    },
    {
      field: "enrollment",
      headerName: "Enrollment No.",
      width: 120,
      sortable: false,
      renderCell: (val) => {
        const res = val.value || "";
        return (
          <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
            <CopyableText text={res} fontSize="10px" />
          </Stack>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
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
      field: "course",
      headerName: "Course",
      sortable: false,
      width: 150,
      renderCell: (val) => {
        const res = val.value;
        return <ColTxt txt={res} />;
      },
    },
    {
      field: "department",
      headerName: "Department",
      sortable: false,
      width: 150,
      renderCell: (val) => {
        const res = val.value;
        return <ColTxt txt={res} />;
      },
    },
    {
      field: "cgpa",
      headerName: "CGPA (till now)",
      width: 200,
      sortable: false,
      renderCell: (val) => {
        const res = val.value[0];
        return (
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Stack>
              <ColTxt txt="Aggregate CGPA" />
              <CopyableText text={Math.round(res.aggregateCGPA * 100) / 100} fontSize="12px" />
            </Stack>
            <Stack>
              <ColTxt txt={"Aggregate CGPA Till Semester" + " - " + res.aggregateCGPASemester} />
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 150,
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
      headerName: "Manage Team Status",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <CustomCellRenderer
        userId={params.value[0].userId}
          value={params.value[0].designation}
          onEditCellChange={(newValue) =>
            params.api.commitCellChange({ ...params, ...newValue })
          }
        />
      ),
    },
    // {
    //   field: "resume",
    //   headerName: "Resume",
    //   sortable: false,
    //   width: 100,
    //   renderCell: (val) => {
    //     const res = val.value;
    //     return (
    //       <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
    //         <Button
    //           onClick={() => {
    //             window.open(res, "_blank").focus();
    //           }}
    //           size="small"
    //           sx={{ textTransform: "none" }}
    //           variant="outlined"
    //         >
    //           Resume
    //         </Button>
    //       </Stack>
    //     );
    //   },
    // },
    // {
    //   field: "update",
    //   headerName: "Update",
    //   sortable: false,
    //   width: 120,
    //   renderCell: (val) => {
    //     const res = val.value;
    //     return (
    //       <Stack sx={{ whiteSpace: "normal", width: "100%" }} spacing={1}>
    //         <Button
    //           onClick={() => navigate(`/team/student/details/${res}`)}
    //           size="small"
    //           sx={{ textTransform: "none" }}
    //           variant="outlined"
    //         >
    //           Update
    //         </Button>
    //       </Stack>
    //     );
    //   },
    // },
  ];

  const rows = studentList.map((student) => {
    return {
      id: student._id,
      student: [
        {
          name: student.name,
          id: student._id,
          photo: student.photo,
        },
      ],
      gender: student.gender,
      enrollment: student.enrollmentNo,
      email: [{ collegeEmail: student.collegeEmail, personalEmail: student.personalEmail }],
      course: student.courseName,
      department: student.departmentName,
      cgpa: [
        {
          aggregateCGPA: student.aggregateCGPA,
          aggregateCGPASemester: student.aggregateCGPASemester,
        },
      ],
      contact: [{ phoneNo: student.phoneNo, altPhoneNo: student.altPhoneNo }],
      teamstatus:[{designation:student.designation,userId:student._id}]
    };
  });

  const handleChange = (e, newPage) => {
    setFilters({ ...filters, page: newPage });
  };
  
console.log(params)
  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ padding: "10px" }}>
   
   <StudentSearch />
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
export default StudentList