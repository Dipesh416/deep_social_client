import { Avatar } from "@mui/material";
import React from "react";


export const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9E1dmAizvQwhSwUVjkFOT7hOmqe6qghtjPw&s"
        >
          
        </Avatar>
        <p>codewith...</p>
      </div>
    </div>
  );
};
