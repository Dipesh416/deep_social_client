import React from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import { PostCard } from "../../components/Post/PostCard";
import { UserReelCard } from "../../components/Reels/UserReelCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];
const posts = [1, 14, 11, 12, 17];
const reels = [1, 14, 11, 12];
const savePost = [1, 14, 11, 12];

export const Profile = () => {
  const {post} = useSelector(store=>store)
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const [value, setValue] = React.useState("Post");
  const { auth } = useSelector((store) => store);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src="https://img.lovepik.com/photo/48013/0603.jpg_wh860.jpg"
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem] ">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://i.pinimg.com/736x/55/c7/a5/55c7a52013d08c90aaae86c2490bc7ea.jpg"
          />
          {true ? (
            <Button onClick={handleOpenProfileModal} sx={{ borderRadius: "20px" }} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold  text-xl">
              {auth.user?.firstName + " " + auth.user?.lastName}
            </h1>
            <p>
              @
              {auth.user?.firstName.toLowerCase() +
                "_" +
                auth.user?.lastName.toLowerCase()}
            </p>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>31 Post</span>
            <span>32 Followers</span>
            <span>45 Followings</span>
          </div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab key={item.id}  value={item.name} label={item.value} wrapped />
              ))}
            </Tabs>
          </Box>

          <div className="flex justify-center">
            {value === "Post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.map((item) => (
                  <div className="border rounded-md border-slate-100">
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "Reels" ? (
              <div className=" my-10 flex  flex-wrap  justify-center gap-2 ">
                {reels.map((item) => (
                  <UserReelCard />
                ))}
              </div>
            ) : value === "Saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.posts.map((item) => (
                  <div className="border rounded-md border-slate-100">
                   <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose}/>
      </section>
    </Card>
  );
};
