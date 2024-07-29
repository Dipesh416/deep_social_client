import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { StoryCircle } from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import { PostCard } from "../Post/PostCard";
import { CreatePostModal } from "../CreatePost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";

const story = [1, 3, 4, , 6, 6];
const posts = [1, 1, 1, 1, 1];

export const MiddlePart = () => {
  const  dispatch= useDispatch();
  const {post} = useSelector(store=>store)
  console.log(" post STORE",post)
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModal(true);
    console.log("hamdle open post model....");
  };

  useEffect(()=>{
    dispatch(getAllPostAction())
  },[post.newComment])
  return (
    <div className="px-2">
      <section className="flex  items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{ width: "5rem", height: "5rem" }}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9E1dmAizvQwhSwUVjkFOT7hOmqe6qghtjPw&s"
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item) => (
          <StoryCircle />
        ))}
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar></Avatar>
          <input
            onClick={handleOpenCreatePostModel}
            readOnly
            className="outline-none w-[90%] rounded-full px-5  bg-transparent border-[#3b4054] border"
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ArticleIcon />
            </IconButton>
            <span> Write Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.posts.map((item) => (
          <PostCard item={item}/>
        ))}
      </div>
      <div>
        <CreatePostModal
          handleClose={handleCloseCreatePostModal}
          open={openCreatePostModal}
        />
      </div>
    </div>
  );
};
