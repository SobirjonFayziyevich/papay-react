import React from "react";
import {Avatar, Box, Container, Stack} from "@mui/material";
import { url } from "inspector";
import { Directions } from "@mui/icons-material";



export function Recommendations() {
    return(
        <div className="top_article_frame">
            <Container
                maxWidth="lg"
                sx={{ mb: "50px", mt: "60px" }}
                style={{ position: "relative" }}
                >
                    <Stack
                    flexDirection={"column"}
                    alignItems={"center"}
                    sx={{ mt: "45px"}}
                    >
                    <Box className={"category_title"}>Tafsiya qilingan maqolalar</Box>
                    <Stack className={"article_main"} flexDirection={"row"}>
                        <Stack className={"article_container"}>
                            <Box className={"article_category"}>Ko'p ko'rilgan</Box>


                            <Stack className={"article_box"}>
                                <Box
                                 className={"article_img"}
                                 sx={{
                                     backgroundImage: `url(https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg)`,
                                 }}
                                ></Box>
                              <Box className={"article_info"}>
                              <Box className={"article_main_info"}>
                                  <div className={"article_author"}>
                                      <Avatar
                                         alt="Author_photo"
                                         src={"/auth/default_img.png"}
                                         sx={{ width: "35px", height: "35px" }}
                                         />
                                         <span className={"author_username"}>Saidamir</span>
                                  </div>
                                  <span className={"article_title"}>
                                      Eng qiziqarli va shirin taomlar
                                  </span>
                                  <p className={"article_desc"}></p>
                                  </Box> 
                              </Box>
                            </Stack>


                            <Stack className={"article_box"}>
                                <Box 
                                className={"article_img"}
                                sx={{
                                    backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBtE1J5xVIO-adq-q1gHFVEfljYbyg9JU-XQ&usqp=CAU)`,
                                }}
                                ></Box>
                                 <Box className={"article_info"}>
                              <Box className={"article_main_info"}>
                                  <div className={"article_author"}>
                                      <Avatar
                                         alt="Author_photo"
                                         src={"/auth/default_img.png"}
                                         sx={{ width: "35px", height: "35px" }}
                                         />
                                         <span className={"author_username"}>Saidamir</span>
                                  </div>
                                  <span className={"article_title"}>
                                      Eng qiziqarli va shirin taomlar
                                  </span>
                                  <p className={"article_desc"}></p>
                                  </Box> 
                              </Box>
                            </Stack>

                            <Box className={"article_category"} sx={{ marginTop: "10px" }}>
                                Ko'p yoqtirilgan
                            </Box>


                            <Stack className={"article_box"}>
                                <Box
                                 className={"article_img"}
                                 sx={{
                                     backgroundImage: `url(https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg)`,
                                 }}
                                ></Box>
                              <Box className={"article_info"}>
                              <Box className={"article_main_info"}>
                                  <div className={"article_author"}>
                                      <Avatar
                                         alt="Author_photo"
                                         src={"/auth/default_img.png"}
                                         sx={{ width: "35px", height: "35px" }}
                                         />
                                         <span className={"author_username"}>Muhammadali</span>
                                  </div>
                                  <span className={"article_title"}>
                                      Samarqand Oshi ajoyib
                                  </span>
                                  <p className={"article_desc"}></p>
                                  </Box> 
                              </Box>
                            </Stack>


                            <Stack className={"article_box"}>
                                <Box
                                 className={"article_img"}
                                 sx={{
                                     backgroundImage: `url(https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg)`,
                                 }}
                                ></Box>
                              <Box className={"article_info"}>
                              <Box className={"article_main_info"}>
                                  <div className={"article_author"}>
                                      <Avatar
                                         alt="Author_photo"
                                         src={"/auth/default_img.png"}
                                         sx={{ width: "35px", height: "35px" }}
                                         />
                                         <span className={"author_username"}>Muhammadali</span>
                                  </div>
                                  <span className={"article_title"}>
                                  Samarqand Oshi ajoyib
                                  </span>
                                  <p className={"article_desc"}></p>
                                  </Box> 
                              </Box>
                            </Stack>
                        </Stack>

                        <Stack className={"article_container"}>
                            <Box className={"article_category"}>Mashhurlar</Box>
                            <Box className={"article_news"}>
                                <h1 style={{ color: "orange"}}>Mashhurlar etirofi</h1>
                        
                            </Box> 
                            <Box className={"article_news"}>
                                <h1 style={{ color: "orange"}}>Mashhurlar etirofi</h1>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
         </div>
    );
}