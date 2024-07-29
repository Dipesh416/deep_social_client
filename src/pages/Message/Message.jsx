import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { SearchUser } from "../../components/SearchUser/SearchUser";
import { UserChatCard } from "./UserChatCard";
import { ChatMessageCard } from "./ChatMessageCard";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudniry";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);

  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setselectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const chatContainerRef= useRef(null)

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleSelectImage = async (e) => {
    console.log("handle select image");
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setselectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    const newMessage = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    console.log("handle create message", newMessage);
    dispatch(createMessage({ newMessage, sendMessageToServer }));
  };

  // useEffect(() => {
  //   setMessages([...messages, message.message]);
  // }, [message.message]);

  useEffect(() => {
    const sock = new SockJS(
      "https://deepsocialserver-production.up.railway.app/ws"
    );
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr);
  }, []);

  const onConnect = () => {
    console.log("WebSocket connected...");
  };

  const onErr = (error) => {
    console.log("Error connecting to WebSocket", error);
  };

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      console.log("Subscribing to chat channel");
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        (message) => onMessageReceive(JSON.parse(message.body))
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, auth.user, currentChat]);

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const onMessageReceive = (payload) => {
    try {
      // const parsedMessage = JSON.parse(payload.body);
      console.log("Message received from WebSocket", payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    } catch (error) {
      console.error("Failed to parse message", payload, error);
    }
  };

  useEffect(()=>{
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop=chatContainerRef.current.scrollHeight
    }
  },[messages ])

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5 " item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full ">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full mt-5 space-y-4 overflow-y-scroll hideScrollbar">
                  {message.chats.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center skew-x-3">
                  <Avatar src="https://images.pexels.com/photos/12088462/pexels-photo-12088462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                  <p>
                    {auth.user?.id === currentChat.users[0]?.id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div ref={chatContainerRef} className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                {messages && messages.length > 0 ? (
                  messages.map((item) => (
                    <ChatMessageCard key={item.id} item={item} />
                  ))
                ) : (
                  <p>No messages to display</p>
                )}
              </div>
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt=""
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                        setselectedImage("");
                      }
                    }}
                    className="bg-transparent border border-[#3b4050] rounded-full w-[90%] py-3 px-5"
                    placeholder="write messaage..."
                    type="text"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold ">no Chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
