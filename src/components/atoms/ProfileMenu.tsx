import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { ArrowDropDown, Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import AuthServices from "../../services/AuthService";
import { useAppSelector } from "../../redux/store";

interface IProfileMenu {
  textDark?: boolean;
}

export const ProfileMenu = (props: IProfileMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const authService = new AuthServices();
  const open = Boolean(anchorEl);

  const { User } = useAppSelector((state) => state);

  function onLogout() {
    authService.Logout().then();
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu = (
    <>
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
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar src={User.getMeData?.data?.image} /> Profile
        </MenuItem>
        <Divider />

        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <>
      <div
        className={`flex items-center  z-[100] ${
          !props.textDark && "text-white"
        }`}
      >
        <Tooltip
          title="Account settings"
          className={"flex items-center gap-3 "}
        >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ paddingX: 3, paddingY: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <div className={"w-fit h-fit bg-white rounded-full p-1 border"}>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={User.getMeData?.data?.image}
              />
            </div>
            <div className={`text-xs ${props.textDark && "text-white"}`}>
              {User.getMeData?.data?.name}
            </div>
            <ArrowDropDown
              className={`text-xs ${props.textDark && "text-white"}`}
            />
          </IconButton>
        </Tooltip>
        {menu}
      </div>
    </>
  );
};
