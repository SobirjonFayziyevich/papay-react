import  TabPanel  from "@mui/lab/TabPanel";
import  TabContext  from "@mui/lab/TabContext";
import { Box, Container, Pagination, PaginationItem, Stack } from "@mui/material";
import  React, { useState } from "react";
import  { MemberPosts }  from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import  SettingsIcon  from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import  MySettings  from "@mui/icons-material/Settings";

//OTHERS

import  ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import  TabList  from "@mui/lab/TabList";
import { Button, Tab } from "@mui/material";

export function VisitOtherPage(props: any) {
    /**INITIALIZATIONS */
    const [value, setValue] = useState("1");

    /** HANDLERS */

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
       setValue(newValue);
    };


    return ( 
        <div className={"my_page"}>
            <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
            <Stack className={"my_page_frame"}>
               <TabContext value={value}>
                   <Stack className={"my_page_left"}>
                     <Box display={"flex"} flexDirection={"column"}>
                         <TabPanel value={"1"}>
                             <Box className={"menu_name"}>My Contents</Box>
                             <Box className={"menu_content"}>
                                 <MemberPosts />
                                     </Box>
                                 <TabPanel value={"2"}>
                                   <Box className={"menu_name"}>Followers</Box>
                                   <Box className={"menu_content"}>
                                 <MemberFollowers actions_enabled={false} />
                                  </Box>
                               </TabPanel>

                               <TabPanel value={"3"}>
                                  <Box className={"menu_name"}>Following</Box>
                                   <Box className={"menu_content"}>
                                 <MemberFollowing actions_enabled={false} />
                                   </Box>
                              </TabPanel>

                              <TabPanel value={"4"}>
                                 <Box className={"menu_name"}>Write an Content</Box>
                                 <Box className={"write_content"}></Box>
                              </TabPanel>

                              <TabPanel value={"5"}>
                                <Box className={"menu_name"}>Chosen an Content</Box>
                                <Box className={"menu_content"}></Box>
                              </TabPanel>
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
                                    src={"auth/default_img.png"} 
                                    className={"order_user_avatar"}
                                    />
                                    <div className={"order_user_icon_box"}>
                                    <img src={"auth/odamcha.png"} />
                                    </div>
                                    </div>
                                    <span className={"order_user_name"}>Alen</span>
                                    <span className={"order_user_prof"}>USER</span>
                            </Box>
                            <Box className={"user_media_box"}>
                                <FacebookIcon />
                                <InstagramIcon />
                                <TelegramIcon />
                                <YouTubeIcon />
                            </Box>
                            <Box className={"user_media_box"}>
                                <p className={"follows"}>Followers: 3</p>
                                <p className={"follows"}>Following: 2</p>
                            </Box>
                            <p className={"user_desc"}>"qushimcha ma'lumotlar mavjud emas</p>

                         <Box 
                            display={"flex"}
                            justifyContent={"flex-end"}
                            sx={{ mt: "10px" }}
                            >
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                >
                                    {true ? ( 
                                        <Tab
                                        style={{ flexDirection: "column"}}
                                        value={"4"}
                                        LinkComponent={(e) => (
                                            <Button
                                            variant={"contained"}
                                            style={{ backgroundColor: "#f70909b8" }}
                                            
                                            >
                                                BEKOR QILISH
                                            </Button>
                                            )}
                                        />
                                     ) : (
                                        <Tab
                                        style={{ flexDirection: "column" }}
                                        value={"4"}
                                        component={(e) => (
                                          <Button
                                          variant={"contained"}
                                          onClick={() => setValue("4")}
                                          //@ts-ignore
                                          >
                                            FOLLOW QILISH
                                          </Button>
                                        )}
                                      />
                                      )}
                            </TabList>
                           </Box>
                        </Box>

                        <Box className={"my_page_menu"}>
                        <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        >
                            <Tab
                            style={{ flexDirection: "column" }}
                            value={"1"}
                            component={() => (
                                <div
                                className={`menu_box ${value}` }
                                onClick={() => setValue("1")}
                                >
                                    <img src={"/icons/Pencil.svg"} />
                                    <span>My Contents</span>
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
                                  <img src={"/icons/followers.svg"} />
                                  <span>Follower</span>
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
                                  <img src={"/icons/following.svg"} />
                                  <span>Following</span>
                             </div>
                             )}
                          />
                       </TabList>
                     </Box>
                </Stack>
                </TabContext>
            </Stack>
         </Container>
        </div>
        );
}