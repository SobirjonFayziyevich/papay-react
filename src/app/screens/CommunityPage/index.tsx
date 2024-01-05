import React, { useEffect, useState } from "react";
import { Box, Container, PaginationItem, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import "../../../css/community.css";
import { TargetArticles } from "./targetArticles";
import { CommunityChats } from "./communityChats";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabPanel } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";



/** REDUX */
import { createSelector, Dispatch} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setTargetBoArticles } from "./slice";
import { retrieveTargetBoArticles } from "./selector";


/** REDUX SLICE */ 
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
  setTargetBoArticles: (data: BoArticle[]) =>
   dispach(setTargetBoArticles(data)) // bu setTargetRestaurant slice.tsdan kelayotgan restaurantdir.
  });

   /** REDUX SELECTOR */
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
    })
  );

const targetBoArticles = [1, 2, 3, 4]

export function CommunityPage() {
  /** INITIALIZATION **/
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);

  const [value, setValue] = useState("1");
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>({
    bo_id: "all",
    page: 1, 
    limit: 5,
});

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService.getTargetArticles(searchArticlesObj)
    .then((data) => setTargetBoArticles(data))
    .catch((err) => console.log(err));
  }, [searchArticlesObj]);

  /** HANDLERS *****/
  const handleChange = (event: any, newValue: string) => {
    searchArticlesObj.page = 1;
    switch(newValue) {
      case '1':
      searchArticlesObj.bo_id = 'all';
      break;
      case '2':
      searchArticlesObj.bo_id = 'celebrity';
      break;
      case '3':
      searchArticlesObj.bo_id = 'evaluation';
      break;
      case '4':
      searchArticlesObj.bo_id = 'story';
      break;
    }
    setSearchArticlesObj({...searchArticlesObj});
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticlesObj({...searchArticlesObj});
  };

  return (
    <div className="community_page">
      <div className="community_frame">
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <CommunityChats />
            <Stack
              className="community_all_frame"
              inputMode={"text"}
              style={{ border: "1px solid #fff" }}
            >
              <TabContext value={value}>
                <Box className="article_tabs">
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      style={{ borderColor: "blue" }}
                    >
                      <Tab label="Barcha Maqolalar" value="1"></Tab>
                      <Tab label="Mashhurlar" value="2"></Tab>
                      <Tab label="Oshxonaga Baho" value="3"></Tab>
                      <Tab label="Hikoyalar" value="4"></Tab>
                    </TabList>
                  </Box>
                </Box>

                <Box className="article_main" overflow={"hidden"}>
                  <TabPanel value="1">
                    <TargetArticles targetBoArticles={targetBoArticles}
                    test={"Maqolalar"} 
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles targetBoArticles={targetBoArticles} 
                    test={"Mashxurlar"} 
                    />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles targetBoArticles={targetBoArticles} />
                  </TabPanel>
                </Box>

                <Box className="article_bott">
                  <Pagination
                    count={4}
                    page={1}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                        color="secondary"
                      />
                    )}
                    onChange={handlePaginationChange}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}