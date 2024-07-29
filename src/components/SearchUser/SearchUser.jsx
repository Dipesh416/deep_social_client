import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";

export const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    dispatch(searchUser(username));
    console.log("serch user auth.......", auth.searchUser);
  };

  const handleClick = (id) => {
    dispatch(createChat({userId:id}))
  };
  return (
    <div className="px-2">
      <div className="py-5 relative">
        <input
          className="bg-transparent border bprder-[#3b4050] outline-none w-full px-5 py-3 rounded-full"
          placeholder="serch user..."
          onChange={handleSearchUser}
          type="text"
        />
        {username &&
          auth.searchUser.map((item) => (
            <Card
              key={item.id}
              className="absolute w-full z-10 top-[4.5rem] cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={
                  <Avatar src="https://images.pexels.com/photos/13078612/pexels-photo-13078612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                }
                title={item.firstName + " " + item.lastName}
                subheader={
                  item.firstName.toLowerCase() +
                  " " +
                  item.lastName.toLowerCase()
                }
              />
            </Card>
          ))}
      </div>
    </div>
  );
};
