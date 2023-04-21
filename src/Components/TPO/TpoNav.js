// react hooks
import { useState, useEffect } from "react";

// react router
import { Link, useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Stack, Avatar, Typography, Chip } from "@mui/material";
import { IconButton, Divider } from "@mui/material";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/ListAlt";
import PlacementsIcon from "@mui/icons-material/DataSaverOff";

// create viewable google drive link
const generateViewURL = (url) => {
  const prefix = "https://drive.google.com/file/d/";
  const documentId = url.replace(prefix, "").split("/")[0];
  return "https://drive.google.com/uc?export=view&id=" + documentId;
};

const ProfileAvatar = ({ photoURL, Name, team, Loaded }) => {
  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt={Name}
        src={Loaded ? generateViewURL(photoURL) : photoURL}
      />
      <Typography sx={{ fontFamily: "nunito" }} variant="body">
        {Name}
      </Typography>
      <Chip label={team.designation} variant="outlined" color="secondary" size="small" />
      <Chip label={team.session} size="small" />
    </Stack>
  );
};

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

const TpoNav = () => {
  // calling hooks
  const params = useParams();
  const [profile, setProfile] = useState({ photo: "", name: "" });
  useEffect(() => {
    setProfile({
      // photo: userProfile.photo,
      photo: "https://drive.google.com/file/d/1X2MToKQCt0cwiw-DeFCQkgAe4ypVq2ab/view?usp=sharing",
      name: "Dr. Vishal Krishna Singh",
    });
  }, []);

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
      {profile?.photo?.length ? (
        <ProfileAvatar
          Name={profile.name}
          photoURL={profile.photo}
          Loaded={true}
          team={{ designation: "Training and Placement Officer", session: "2023-24" }}
        />
      ) : (
        <ProfileAvatar
          Name={profile.name}
          photoURL="/images/userImg.png"
          Loaded={false}
          team={{ designation: "Training and Placement Officer", session: "2023-24" }}
        />
      )}

      <Divider flexItem />
      <Item
        url="/tpo/view"
        Icon={<ListIcon size="small" color="primary" />}
        text="View Team"
        active={params.panel === "view"}
      />
      <Item
        url="/tpo/edit"
        Icon={<EditIcon size="small" color="primary" />}
        text="Edit Team"
        active={params.panel === "edit"}
      />
      <Item
        url="/tpo/analytics"
        Icon={<PlacementsIcon size="small" color="primary" />}
        text="Analytics"
        active={params.panel === "analytics"}
      />
    </Stack>
  );
};

export default TpoNav;
