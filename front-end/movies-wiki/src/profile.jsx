import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

export default function AccountMenu({ position }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const { logout, authData } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("userInitial");
    logout();
    navigate("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let userInitial = localStorage.getItem("userInitial");

  if (!userInitial && authData && authData.name) {
    userInitial = authData.name.charAt(0).toUpperCase();
    localStorage.setItem("userInitial", userInitial);
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip placement="bottom">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              "&:hover": {
                backgroundColor: "rgba(221, 221, 221, 0.1)",
              },
              borderRadius: 1,
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 25,
                height: 25,
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                backgroundColor: "rgba(211, 211, 211, 0.4)",
                fontSize: "small",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              {userInitial}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            backgroundColor: "rgba(211, 211, 211, 0.8)",

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 2,
            },
            "& .MuiMenuItem-root": {
              fontSize: "15px",
              color: "rgba(0, 0, 0, 0.6)",
              fontWeight: "400",
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: "-4px",
              top: 0,
              left: 75,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              backgroundColor: "rgba(211, 211, 211, 0.1)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: "4px 8px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
