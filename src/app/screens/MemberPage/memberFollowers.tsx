import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowers, } from "../../screens/MemberPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers, } from "../../screens/MemberPage/slice";
import { Follower } from "../../../types/follow";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) =>
    dispatch(setMemberFollowers(data)),
});

// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

const followers = [
    {mb_nick: "usman", following: true},
    {mb_nick: "alen", following: false},
    {mb_nick: "alex", following: true},
];

export function MemberFollowers(props: any) {
     /** INITIALIZATIONS **/
     const { setMemberFollowers,  } = actionDispatch(useDispatch());
     const { memberFollowers } = useSelector(memberFollowersRetriever);

     // setMemberFollowers

     /** HANDLERS */

     // subscribeHandler




    return (
        <div className={"my_followers_page"}>
            <Stack>
                {followers.map((follower) => {
                    const image_url = "/auth/odamcha.png";
                    return (
                        <Box className={"follow_box"}>
                            <Stack
                                flexDirection="row"
                            >
                                <Avatar alt={""} src={image_url} sx={{width: 89, height: 89,}}/>
                                <div
                                    style={{
                                        width: "400px",
                                        display: "flex",
                                        flexDirection: "column",
                                        marginLeft: "25px",
                                        height: "85%",
                                        color: "#ffffff",
                                    }}
                                >
                                    <span className={"username_text"}>@John_Dev</span>
                                    <span className={"name_text"}>Sobirjon</span>
                                </div>

                                <Stack
                                    className={"button_follow"}
                                >
                                    {props.actions_enabled &&
                                        (follower.following ? (
                                            <Button
                                                style={{
                                                    background: "#68C5CB",
                                                    color: "#ffffff",
                                                    borderRadius: "50px",
                                                    marginTop: "18px",
                                                    width: "160px",
                                                }}
                                                className={"following_already"}
                                            >
                                                <span>Following</span>
                                            </Button>
                                        ) : (
                                            <Button
                                                className={"follow_back"}
                                                style={{
                                                    background: "#30945E",
                                                    borderRadius: "50px",
                                                    marginTop: "18px",
                                                    color: "#ffffff",
                                                }}
                                                startIcon={
                                                    <img
                                                        src={"/icons/follow .svg"}
                                                    />
                                                }
                                            >
                                                <p> Bekor qilish</p>
                                            </Button>
                                        ))}
                                </Stack>
                            </Stack>

                        </Box>
                    );
                })}
            </Stack>
        </div>
    );
}