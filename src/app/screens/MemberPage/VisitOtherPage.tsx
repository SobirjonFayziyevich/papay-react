import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";


//OTHERS
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import { Button, Tab } from "@mui/material";
import Marginer from "../../components/marginer";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
import TViewer from "../../components/tuiEditor/TViewer";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import { useHistory } from "react-router-dom";
import MemberApiService from "../../apiServices/memberApiService";
import CommunityApiService from "../../apiServices/communityApiService";
import {
  sweetErrorHandling,
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "../../screens/MemberPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "../../screens/MemberPage/slice";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import FollowApiService from "../../apiServices/followApiService";
import { serverApi } from "../../../lib/config";
import { verifiedMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setChosenMember: (data: Member) => dispach(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispach(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispach(setChosenSingleBoArticle(data)),
});

// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);
export function VisitOtherPage(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  const {chosen_mb_id, chosen_art_id } = props;
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = React.useState("1");

  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 3,
    });
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      //agar chosen_mb_id uzimiz bulib chiqsak verified member id
      history.push("/member-page"); // member-page bu mening sahifam.
    }

    const communityService = new CommunityApiService();
    if (chosen_art_id) {
      //agar chosen_art_id communityService da mavjud bulsa,
      communityService
        .getChosenArticle(chosen_art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    }

    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, chosen_mb_id, articlesRebuild]); // buyerdagi arra dependencening qiymatlari uzgarganda faqat shu useEffect ishga tushsin.
     // articlesRebuild sababli qayta ishga tushadi.

     
  useEffect(() => {
    const memberService = new MemberApiService();
    memberService
      .getChosenMember(chosen_mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [verifiedMemberData, chosen_mb_id, followRebuild]); //followRebuild qiymati uzgarganda followlar sonini qayta qurib berishi un  kiritdim.
// buyerdagi array dependencening qiymatlari uzgarganda faqat shu useEffect ishga tushsin.
  /** HANDLERS **/
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    setMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
 const subscribeHandler = async (e: any) => {  //FOLLOW qilishda ishlatamiz mantiqini.
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);


      const followService = new FollowApiService();
      await followService.subscribe(e.target.value);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const unsubscribeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(e.target.value);
      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"} sx={{ flexDirection: "row" }}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value={"1"}>
                  <Box className={"menu_name"}>Maqolalar</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={
                            memberArticleSearchObj.page >= 3
                              ? memberArticleSearchObj.page + 1
                              : 3
                          }
                          page={memberArticleSearchObj.page}
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
                  </Box>
                </TabPanel>

                <TabPanel value={"2"}>
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers
                      actions_enabled={false}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={chosen_mb_id}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value={"3"}>
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing
                      actions_enabled={false}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                      mb_id={chosen_mb_id}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value={"4"}>
                  <Box className={"menu_name"}>Tanlangan Maqola</Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className={"order_user_img"}>
                    <img
                      
                      src={chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember?.mb_image}`
                          : "/auth/john.jpeg"
                      }
                      className={"order_user_avatar"}
                    />
                    <div className="order_user_icon_box"
                    style={{ marginLeft: "100px" }}>
                      <img
                        src={
                          chosenMember?.mb_type === "RESTAURANT"
                            ? "/auth/odamcha.png"
                            : "/icons/odamcha.svg"
                        }
                      />
                    </div>
                  </div>
                  <span className={"order_user_name"}>
                    {verifiedMemberData?.mb_nick}
                  </span>
                  <span className={"order_user_prof"}>
                    {verifiedMemberData?.mb_type}
                  </span>
                </Box>
                <Box
                  className={"user_media_box"}
                  sx={{
                    color: "#a1a1a1",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
                <Box
                  className={"user_media_box_follow"}>
                  <p className={"follows"}>
                    Followers: {chosenMember?.mb_subscriber_cnt} Followings:{" "}
                    {chosenMember?.mb_follow_cnt}{" "}
                  </p>
                </Box>
                <Box className={"user_desc"}>
                  {chosenMember?.mb_description ?? "Salom, men yangi user man"}
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mb: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab AIP tabs example"
                  >
                    {chosenMember?.me_followed &&  //chosenMemberni ichida me-followed mavjud bulsa, chosenMemberning me_followed qismida my_following qiymati true bulsa,
                      // bekor qilishni kursat.
                    chosenMember?.me_followed[0]?.my_following ? (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={(e) => (
                          <Button
                            value={chosenMember?._id}
                            variant={"contained"}
                            style={{ backgroundColor: "#f70909B8", marginTop: "14px"}}
                            onClick={unsubscribeHandler}
                          >
                            BEKOR QILISH
                          </Button>
                        )}
                      />
                    ) : (
                      <Tab
                        style={{ flexDirection: "column"}}
                        value={"4"}
                        component={(e: any) => (
                          <Button
                            value={chosenMember?._id}
                            variant={"contained"}
                            style={{ backgroundColor: "#30945E", marginTop: "14px" }}
                            onClick={subscribeHandler} // subscribeHandler shuyerda ishlatamiz.
                          >
                            FOLLOW QILISH
                          </Button>
                        )}
                      />
                    )}
                  </TabList>
                </Box>
              </Box>

              <Box className={"my_page_menu"} >
                <TabList
                  onChange={handleChange}
                  aria-label="tabs API tabs example"
                >
                  <Stack  flexDirection={"column"}>
                  <Tab
                    value={"1"}
                    style={{ flexDirection: "column"}}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("1")}
                      >
                        <img src={"/icons/Pencil.svg"} alt="" />
                        <span> Maqolalari</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("2")}
                      >
                        <img src={"/icons/odamchalar.svg"} alt="" />
                        <span>Followers</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("3")}
                      >
                        <img src={"/icons/odamcha.svg"} alt="" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                  </Stack>
                </TabList>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
