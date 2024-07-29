import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { useSelector } from "react-redux";

export const UserChatCard = ({ chat }) => {
  const { auth } = useSelector((store) => store);
  
  if (!chat || !auth.user) {
    return null; // Return null if chat or auth.user is not defined
  }

  const otherUser =
    auth.user.id === chat.users[0].id ? chat.users[1] : chat.users[0];

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src="https://m.media-amazon.com/images/I/71R5-jgl6ZL._AC_UF1000,1000_QL80_.jpg"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          auth.user.id === chat.users[0].id
            ? chat.users[1].firstName + " " + chat.users[1].lastName
            : chat.users[0].firstName + " " + chat.users[0].lastName
        }
        subheader={"message"}
      ></CardHeader>
    </Card>
  );
};
