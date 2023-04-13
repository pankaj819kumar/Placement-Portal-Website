// react hooks
import { useState, useEffect } from "react";

// react router
import { useParams, useNavigate } from "react-router-dom";

// MUI Components
import { Stack } from "@mui/material";
import { List, ListItem, ListItemButton } from "@mui/material";
import { ListItemIcon, ListItemText, Divider } from "@mui/material";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/ListAlt";

const TpoNav = () => {
  // hooks initalization
  const navigate = useNavigate();
  const params = useParams();
  const [panel, setPanel] = useState(params.panel || "editTeam");

  useEffect(() => {
    if(params.value===null)
    navigate(`/tpo/${panel}`);
else
navigate(`/tpo/${panel}/${params.value}`);
  }, [panel]);

  const handleClick = (newPanel) => {
    setPanel(newPanel);
  };
  return (
    <Stack sx={{ padding: "15px 24px", minWidth: 300 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            name="editTeam"
            onClick={() => handleClick("editTeam")}
            selected={panel === "editTeam"}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Edit Team"
              sx={{ "& .MuiListItemText-primary": { fontFamily: "Nunito" } }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            name="viewTeam"
            onClick={() => handleClick("viewTeam")}
            selected={panel === "viewTeam"}
          >
            <ListItemIcon>
              <ListIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="View Team" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
};

export default TpoNav;
