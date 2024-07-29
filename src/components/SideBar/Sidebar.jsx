import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item) => {
    console.log("inside handle navigate", item.title === "Profile");
    if (item.title === "Profile") {
      console.log("auth.user?.id", auth.user?.id);
      navigate(`/profile/${auth.user?.id}`);
    }
    if (item.title === "Message") {
      console.log("auth.user?.id", auth.user?.id);
      navigate(`/message`);
    }
    if (item.title === "Home") {
      navigate(`/home`);
    }
    if (item.title === "Reels") {
      navigate(`/reels`);
    }
    if (item.title === "Create Reels") {
 
      navigate(`/create-reels`);
    }
    if (item.title === "Notifications") {
  
      navigate(`/notifications`);
    }
    if (item.title === "Lists") {
     
      navigate(`/lists`);
    }
    if (item.title === "Communities") {
     
      navigate(`/communities`);
    }
    
  };
  return (
    <Card className="  card h-screen flex flex-col justify-between py-5 ">
      <div className="space-y-8 pl-5">
        <div className=" ">
          <span className="logo font-bold text-xl">Deep Social</span>
        </div>

        <div className=" space-y-8">
          {navigationMenu.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavigate(item)}
              className="flex space-x-3 items-center cursor-pointer"
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
        <Divider />

        <div className="pl-5 flex items-center justify-between pt5">
          <div className="flex items-center space-x-3">
            <Avatar src="https://cdn.pixabay.com/photo/2023/10/31/05/24/shiva-8354335_640.png" />

            <div>
              <p className="font-bold">
                {auth.user?.firstName + " " + auth.user?.lastName}
              </p>
              <p>
                @
                {auth.user?.firstName.toLowerCase() +
                  "_" +
                  auth.user?.lastName.toLowerCase()}
              </p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};
