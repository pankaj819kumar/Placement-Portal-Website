// Hooks
import { React, useState, useEffect } from "react";

// API
import axios from "../../../axios";

// MUI Components
import { Stack, Typography, TextField, Button, IconButton } from "@mui/material";
import { Dialog, Avatar, CircularProgress, Chip, Snackbar } from "@mui/material";
import { InputAdornment, Tooltip, Alert } from "@mui/material";

// MUI Icons
import VerifiedIcon from "@mui/icons-material/Verified";
import NotVerifiedIcon from "@mui/icons-material/Dangerous";

const Loader = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
        Loading Recruiter Details...
      </Typography>
      <CircularProgress size={20} />
    </Stack>
  );
};

const RecruiterIntro = ({ name, photo, designation, companyId }) => {
  const [company, setCompany] = useState({});
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/getCompanyDetails", {
        params: {
          companyId: companyId,
        },
      })
      .then((res) => {
        setCompany(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        margin: "5px 9px",
        padding: "10px 15px",
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={photo} alt={name} sx={{ height: 60, width: 60 }} />
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {designation}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={company?.logo} alt={company?.name} sx={{ height: 60, width: 60 }} />
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {company.name}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "Nunito" }}>
          {company.natureOfBusiness}
        </Typography>
      </Stack>
    </Stack>
  );
};

const CustomTextField = ({
  name,
  defaultValue,
  isPrimary,
  isVerified,
  id,
  remarks,
  index,
  currIndex,
  setIndex,
  list,
  setList,
  getRecruiterPhoneNo,
  getRecruiterEmails,
}) => {
  // states
  const [updating, setUpdating] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [primary, setPrimary] = useState(isPrimary);
  const [verified, setVerified] = useState(isVerified);

  // handle value change
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // handle value update
  const handleUpdate = (url, params) => {
    setUpdating(true);
    // console.log(params);
    axios
      .post(url, params)
      .then((res) => {
        setIndex(-1);
        setUpdating(false);
      })
      .catch((err) => {
        setUpdating(false);
      });
  };

  const handleDeleteRecruiterPhoneNo = () => {
    axios
      .delete("/deleteRecruiterPhoneNo",{data: {phoneNoId: id}})
      .then((res) => {
        console.log(res);
        getRecruiterPhoneNo();
      })
      .catch((err) => {
        console.log("error in delete phone:", err.response.data);
      });
  }

  const handleDeleteRecruiterEmail = () => {
    axios
      .delete("/deleteRecruiterEmail",{data: {emailId: id}})
      .then((res) => {
        console.log(res);
        getRecruiterEmails();
      })
      .catch((err) => {
        console.log("error in delete email:", err.response.data);
      });
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ padding: "10px 10px", border: "1px solid rgba(0,0,0,0.3)", borderRadius: "5px" }}
    >
      <TextField
        fullWidth
        size="small"
        variant="standard"
        name={name}
        value={value}
        onChange={handleChange}
        disabled={index !== currIndex}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Chip
                label={primary ? "Primary" : "Not Primary"}
                size="small"
                color={primary ? "success" : "default"}
                sx={{
                  fontSize: "10px",
                  fontFamily: "Nunito",
                  height: "auto",
                  lineHeight: "normal",
                }}
                onClick={() => {
                  if (index === currIndex) {
                    if (name === "email") {
                      handleUpdate("updateRecruiterEmail", {
                        emailId: id,
                        isPrimary: !primary,
                      });
                      setPrimary((prev) => !prev);
                    } else {
                      if (name === "phoneNo") {
                        handleUpdate("updateRecruiterPhoneNo", {
                          phoneNoId: id,
                          isPrimary: !primary,
                        });
                        setPrimary((prev) => !prev);
                      }
                    }
                  }
                }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={verified ? "Email is Verified" : "Email Not Verified"} arrow>
                <IconButton
                  size="small"
                  color={verified ? "success" : "error"}
                  onClick={() => {
                    if (index === currIndex) {
                      if (name === "email") {
                        handleUpdate("updateRecruiterEmail", {
                          emailId: id,
                          isVerified: !verified,
                        });
                        setVerified((prev) => !prev);
                      } else {
                        if (name === "phoneNo") {
                          handleUpdate("updateRecruiterPhoneNo", {
                            phoneNoId: id,
                            isPrimary: !primary,
                          });
                          setVerified((prev) => !prev);
                        }
                      }
                    }
                  }}
                >
                  {verified ? (
                    <VerifiedIcon fontSize="small" />
                  ) : (
                    <NotVerifiedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        sx={{ "& input": { fontFamily: "Nunito", fontSize: "14px" } }}
      />
      <Button
        size="small"
        sx={{ textTransform: "none" }}
        onClick={() => {
          if (index === currIndex) {
            if (name === "email") {
              handleUpdate("updateRecruiterEmail", {
                emailId: id,
                email: value,
                isPrimary: isPrimary,
                isVerified: isVerified,
                remarks: remarks,
              });
            } else {
              if (name === "phoneNo") {
                handleUpdate("updateRecruiterPhoneNo", {
                  phoneNoId: id,
                  phoneNo: value,
                  isPrimary: isPrimary,
                  isVerified: isVerified,
                  remarks: remarks,
                });
              }
            }
          } else setIndex(index);
        }}
        startIcon={updating ? <CircularProgress size={12} color="inherit" /> : null}
        disabled={updating}
      >
        {index === currIndex ? "Update" : "Edit"}
      </Button>
      <Button
          size="small"
          sx={{ textTransform: "none" }}
        onClick={() => {
          if (name === "email") {
            handleDeleteRecruiterEmail();
          } else
            if (name === "phoneNo") {
            handleDeleteRecruiterPhoneNo();
            }
          }}
          // variant="outlined"
        >
          Delete
        </Button>
    </Stack>
  );
};

const RecruiterEmails = ({ mails, setMails, emailIndex, setEmailIndex, recruiterId, getRecruiterEmails, setOpenSnackbar, setError }) => {
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);

  const handleEmailChange = (e) => {
    setError("");
    setEmail(e.target.value);
  }

  const handleAddRecruiterEmail = () => {
    setAdding(true);
    axios
      .post("/addRecruiterEmail", { recruiterId, email, countryCode: 91, remarks: "remark"})
      .then((res) => {
        setOpenSnackbar(true);
        console.log(res);
        setEmail("");
        getRecruiterEmails();
        setAdding(false);
      })
      .catch((err) => {
        setAdding(false);
        setError(err.response.data.error || err.response.data.errors[0].error);
        setOpenSnackbar(true);
        console.log(err.response.data);
      });
  }
  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontFamily: "Nunito" }} color="text.secondary">
        <strong>Emails</strong>
      </Typography>
      <Stack spacing={1} direction="row" sx={{ width: "100%" }}>
        <TextField
          fullWidth
          size="small"
          label="Email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
        />
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          onClick={handleAddRecruiterEmail}
          variant="outlined"
          disbaled={adding}
        >
          Add
        </Button>
      </Stack>
      {mails &&
        mails.map((mail, idx) => (
          <div key={mail._id}>
            <CustomTextField
              name="email"
              defaultValue={mail.email}
              label="Email"
              isPrimary={mail.isPrimary}
              isVerified={mail.isVerified}
              id={mail._id}
              type="mail"
              remarks={mail.remarks}
              index={idx}
              currIndex={emailIndex}
              setIndex={setEmailIndex}
              list={mails}
              setList={setMails}
              getRecruiterEmails={getRecruiterEmails}
            />
          </div>
        ))}
    </Stack>
  );
};

const RecruiterPhoneNos = ({ phoneNos, setPhoneNos, phoneNoIndex, setPhoneNoIndex, recruiterId, getRecruiterPhoneNo, setOpenSnackbar, setError}) => {
  const [phoneNo, setPhoneNo] = useState("");
  const [adding, setAdding] = useState(false);

  const handleContactNoChange = (e) => {
    setError("");
    setPhoneNo(e.target.value);
  }

  const handleAddRecruiterPhoneNo = () => {
    setAdding(true);
    axios
      .post("/addRecruiterPhoneNo", { recruiterId, phoneNo, countryCode: 91, remarks: "remark"})
      .then((res) => {
        setOpenSnackbar(true);
        console.log(res);
        setPhoneNo("");
        getRecruiterPhoneNo();
        setAdding(false);
      })
      .catch((err) => {
        setAdding(false);
        setError(err.response.data.error || err.response.data.errors[0].error);
        setOpenSnackbar(true);
        console.log(err.response.data);
      });
  }

  return (
    <Stack spacing={1}>
      <Typography variant="body1" sx={{ fontFamily: "Nunito" }} color="text.secondary">
        <strong>Contact Number</strong>
      </Typography>
      <Stack spacing={1} direction="row" sx={{ width: "100%" }}>
        <TextField
          fullWidth
          size="small"
          label="Phone"
          placeholder="Enter Contact Number"
          value={phoneNo}
          onChange={handleContactNoChange}
        />
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          onClick={handleAddRecruiterPhoneNo}
          variant="outlined"
          disbaled={adding}
        >
          Add
        </Button>
      </Stack>
      {phoneNos &&
        phoneNos.map((phoneNo, idx) => (
          <div key={phoneNo._id}>
            <CustomTextField
              name="phoneNo"
              defaultValue={phoneNo.phoneNo}
              isPrimary={phoneNo.isPrimary}
              isVerified={phoneNo.isVerified}
              id={phoneNo._id}
              remarks={phoneNo.remarks}
              index={idx}
              currIndex={phoneNoIndex}
              setIndex={setPhoneNoIndex}
              list={phoneNos}
              setList={setPhoneNos}
              getRecruiterPhoneNo={getRecruiterPhoneNo}
            />
          </div>
        ))}
    </Stack>
  );
};

const RecruiterDetails = ({ recruiter, open, setOpen }) => {
  // states
  const [Loading, setLoading] = useState(false);
  const [mails, setMails] = useState([]);
  const [phoneNos, setPhoneNos] = useState([]);
  const [emailIndex, setEmailIndex] = useState(-1);
  const [phoneNoIndex, setPhoneNoIndex] = useState(-1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  // handle close
  const handleClose = () => {
    setOpen(false);
  };

  const getRecruiterEmails = () => {
    setLoading(true);
    axios
      .get("/getRecruiterEmails", {
        params: {
          recruiterId: recruiter._id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setMails(res.data);
        getRecruiterPhoneNo();
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  const getRecruiterPhoneNo = () => {
    axios
      .get("/getRecruiterPhoneNos", {
        params: {
          recruiterId: recruiter._id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setPhoneNos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleCloseSnackbar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (open) getRecruiterEmails();
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="contact-alert-verify"
      aria-describedby="contact-alert-verify-desctiption"
    >
      <RecruiterIntro
        name={recruiter.firstName + " " + recruiter.lastName}
        photo={recruiter.photo}
        designation={recruiter.designation}
        companyId={recruiter.companyId}
      />
      <Stack spacing={1} sx={{ padding: "15px 24px" }}>
        {Loading ? (
          <Loader />
        ) : (
          <Stack spacing={1}>
            <RecruiterEmails
              mails={mails}
              setMails={setMails}
              emailIndex={emailIndex}
              setEmailIndex={setEmailIndex}
              recruiterId={recruiter._id}
              getRecruiterEmails={getRecruiterEmails}
              setOpenSnackbar={setOpenSnackbar}
              setError={setError}
            />
            <RecruiterPhoneNos
              phoneNos={phoneNos}
              setPhoneNos={setPhoneNos}
              phoneNoIndex={phoneNoIndex}
              setPhoneNoIndex={setPhoneNoIndex}
              recruiterId={recruiter._id}
              getRecruiterPhoneNo={getRecruiterPhoneNo}
              setOpenSnackbar={setOpenSnackbar}
              setError={setError}
            />
          </Stack>
        )}
      </Stack>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error ? error : " Added Successfully!"}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default RecruiterDetails;
