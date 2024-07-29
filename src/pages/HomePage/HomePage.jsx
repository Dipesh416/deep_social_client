import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Route, Routes, useLocation } from "react-router-dom";
import { MiddlePart } from "../../components/MiddlePart/MiddlePart";
import { Reels } from "../../components/Reels/Reels";
import { CreateReelsForm } from "../../components/Reels/CreateReelsForm";
import { Profile } from "../Profile/Profile";
import { HomeRight } from "../../components/HomeRight/HomeRight";
import { Sidebar } from "../../components/SideBar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";
import { Notifications } from "../../components/Notification/Notifications";
import { Lists } from "../../components/Lists/Lists";
import { Communities } from "../../components/Communities/Communities";

export const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  console.log("auth", auth);

  // useEffect(() => {
  //   dispatch(getProfileAction(jwt));
  // }, []);

  return (
    <div className="">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="pl-5 sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid
          lg={location.pathname === "/" ? 6 : 9}
          item
          className="px-5 flex justify-center"
          xs={12}
        >
          <Routes>
            <Route path="/" element={<MiddlePart />}>
              <Route path="home" element={<HomeRight />} />
            </Route>
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/communities" element={<Communities />} />
          </Routes>
        </Grid>
        {location.pathname === "/" && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
