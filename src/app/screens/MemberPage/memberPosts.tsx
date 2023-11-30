import  Favorite from "@mui/icons-material/Favorite";
import Checkbox  from "@mui/material/Checkbox";
import { Box, height, Stack } from "@mui/system";
import  FavoriteBorder  from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon  from "@mui/icons-material/RemoveRedEye";
import moment from "moment";


export function MemberPosts(props: any) {
    return (
        <Stack className={"containd_page"}
        style={{width: "821px", height: "600px"}}>
        <Box className={"post_content"}>
            {["1", "2", "3"].map((article) => {
                return (
                    <Stack className={"all_article_box"} sx={{ cursor: "pointer"}}>
                        <Box 
                        className={"all_article_img"}
                        sx={{ backgroundImage: `url('/auth/john.jpeg')`,
                        }}
                        ></Box>
                        <Box className={"all_article_container"}>
                            <Box alignItems={"center"} display={"flex"}>
                                <img
                                  src={"/auth/default_img.png"}
                                  width={"35px"}
                                  style={{ borderRadius: "50%", backgroundSize: "cover" }} />
                                <span className={"all_article_author_user"}>
                                    John
                                </span>
                            </Box>
                            <Box 
                            display={"flex"}
                            flexDirection={"column"}
                            sx={{ mt: "15px" }}
                            >
                                <span className={"all_article_title"}>
                                    Restaurantlarga baho
                                </span>
                                <p className={"all_article_desc"}>Burak ajoyib restaurant</p>
                                </Box>
                                <Box>
                                    <Box className={"article_share"}
                                    style={{ width: "100%", height: "auto" }}
                                    sx={{ mb: "10px" }}
                                    >
                                        <Box 
                                        className={"article_share_main"}
                                        style={{
                                            color: "#fff",
                                            marginLeft: "150px",
                                            display: "flex",
                                            alignItems: "center",
                                            }}
                                            >
                                                <span>{moment().format("YY-MM-DD HH:mm")}</span>
                                                <Checkbox
                                                sx={{ ml: "40px" }}
                                                icon={<FavoriteBorder />}
                                                checkedIcon={<Favorite style={{ color: "red"}}/>}
                                                checked={false}
                                                />
                                                <span style={{ marginRight: "18px" }}>100</span>

                                                <RemoveRedEyeIcon />
                                                <span style={{ marginLeft: "18px" }}>1000</span>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            );
                        })}
                  </Box>
              </Stack>
   );
}




