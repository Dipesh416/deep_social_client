import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import ImageIcon from "@mui/icons-material/Image";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { uploadToCloudinary } from "../../utils/uploadToCloudniry";
import { useDispatch } from "react-redux";
import { createCommentAction, createPostAction } from "../../Redux/Post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

export const CreatePostModal = ({ handleClose, open }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const hadleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  };
  const hadleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
    setSelectedImage(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };
  const formik = useFormik({
    initialValues: {
      caption: "",
      video: "",
      image: "",
    },
    onSubmit: (values) => {
      console.log("formik values", values);
      dispatch(createPostAction(values))
    },
  });

  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex space-x-4 items-center">
              <Avatar />
              <div>
                <p className="font-bold text-lg">Code With Zosh</p>
                <p className="text-sm">@codewithdeep</p>
              </div>
            </div>
            <textarea
              className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4050] rounded-sm"
              placeholder="write caption"
              name="caption"
              id=""
              onChange={formik.handleChange}
              value={formik.values.caption}
              rows="4"
            ></textarea>

            <div className="space-x-5 flex items-center mt-5">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={hadleSelectImage}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>

              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={hadleSelectVideo}
                  style={{ display: "none" }}
                  id="video-input"
                />
                <label htmlFor="video-input" component="span">
                  <IconButton color="primary">
                    <VideoCallIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>
            {selectedImage && (
              <div>
                <img className="h-[10rem]" src={selectedImage} alt="" />
              </div>
            )}
            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "1.5rem" }}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};
