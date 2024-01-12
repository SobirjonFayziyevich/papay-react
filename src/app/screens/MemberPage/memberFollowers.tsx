import React, { useEffect, useState } from "react";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowers } from "../../screens/MemberPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "../../screens/MemberPage/slice";
import { Follower, FollowSearchObj } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});

// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);
export function MemberFollowers(props: any) {
  /** INITIALIZATIONS **/
  const history = useHistory(); 
  const { mb_id, followRebuild, setFollowRebuild } = props;
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>(
    { page: 1, limit: 5, mb_id: mb_id }
  );

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers(followersSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [followersSearchObj, followRebuild]);

  /** HANDLERS */
  /** subscribe logic */
  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.subscribe(id);

      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    followersSearchObj.page = value;
    setFollowersSearchObj({ ...followersSearchObj });
  };

  const visitMemberHandler = (mb_id: string) => {
      history.push(`/member-page/other?mb_id=${mb_id}`); //history push bulib uning ichidagi malumotlar apdate bulmagan holatda, document.location.reload ni  ishlatamiz.
      document.location.reload();
  };







  return (
    <div className={"my_followers_page"}>
      <Stack>
        {memberFollowers.map((follower: Follower) => {
          const image_url = follower?.subscriber_member_data?.mb_image
            ? `${serverApi}/${follower?.subscriber_member_data.mb_image}`
            : "/auth/odamcha.png";
          return (
            <Box className={"follow_box"}>
              <Stack flexDirection="row">
                <Avatar 
                alt={""} 
                style={{cursor: 'poointer'}}
                src={image_url} sx={{ width: 89, height: 89 }} 
                onClick={() => visitMemberHandler(follower?.subscriber_id)} />
                <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "25px",
                    height: "100%",
                    color: "#ffffff",
                  }}
                >
                  <span className={"username_text"} >
                    {follower?.subscriber_member_data?.mb_type}
                  </span>
                  <span className={"name_text"}
                   style={{cursor: 'poointer'}}
                   onClick={() => visitMemberHandler(follower?.subscriber_id)}>
                    {follower?.subscriber_member_data?.mb_nick}
                  </span>
                </div>

                <Stack className={"button_follow"}>
                  {props.actions_enabled &&
                    (follower?.me_followed &&
                    follower.me_followed[0]?.my_following ? (
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
                        startIcon={<img src={"/icons/follow .svg"} />}
                        onClick={(e) =>
                          subscribeHandler(e, follower?.subscriber_id)
                        }
                      >
                        Follow Back
                      </Button>
                    ))}
                </Stack>
              </Stack>
            </Box>
          );
        })}
        <Stack
          sx={{ my: "40px" }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Box className={"bottom_box"}>
            <Pagination
              count={
                followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3
              }
              page={followersSearchObj.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={handlePaginationChange} //paginationning nomer qiymatlarini uzgartirish
            />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
