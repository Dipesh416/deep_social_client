import React from "react";
import { useSelector } from "react-redux";

export const ChatMessageCard = ({ item }) => {
  const {  auth } = useSelector((store) => store);

  const isreqUserMessage = auth.user?.id === item.user?.id;
  return (
    <div
      className={`flex ${
        !isreqUserMessage ? "justify-start" : "justify-end"
      } text-white`}
    >
      <div
        className={`p-1 ${
          item.image ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {item.image && (
          <img
            className="w-[12rem] h-[17rem] rounded-md"
            src={item.image}
            alt=""
          />
        )}

        <p className={`${true ? "py-2" : "py-1"} `}>{item.content}</p>
      </div>
    </div>
  );
};
