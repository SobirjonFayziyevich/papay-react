import React, { useEffect, useRef, useState } from "react";
import {Box, Button, Stack,} from "@mui/material";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Link} from "@mui/joy";
import {Favorite, Visibility} from "@mui/icons-material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PaginationItem } from "@mui/material/";
import Pagination from "@mui/material/Pagination";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Container } from "@mui/system";
import { Restaurant } from "../../../types/user";

// REDUX tegishli bulgan importlar.
import { setTargetRestaurants } from "../../screens/RestaurantPage/slice";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { retrieveTargetRestaurants } from "../../screens/RestaurantPage/selector";
import { useDispatch, useSelector } from "react-redux";
import RestaurantApiService from "../../apiServices/restaurantApiServices";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";

SwiperCore.use([Autoplay, Navigation, ]);

const order_list = Array.from(Array(8).keys());    // 8ta restaurantni kelishi
// console.log(order_list);

/** REDUX SLICE */ 
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setTargetRestaurants: (data: Restaurant[]) =>
     dispach(setTargetRestaurants(data)), // bu setTargetRestaurant slice.tsdan kelayotgan restaurantdir.
    });
  /** REDUX SELECTOR */
const targetRestaurantsRetriever = createSelector(
    retrieveTargetRestaurants,
    (targetRestaurants) => ({
        targetRestaurants,
      })
    );
export function AllRestaurants() {
    /** INITIALIZATION */
    const {setTargetRestaurants} = actionDispatch(useDispatch());
    const { targetRestaurants } = useSelector(targetRestaurantsRetriever);
    const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
        page: 1,
        limit: 4,
        order: "mb_point",
      });
      const refs: any = useRef([]);
      // const history = useHistory();
    
      useEffect(() => {
        const restaurantService = new RestaurantApiService();
        restaurantService
          .getRestaurants(targetSearchObject)
          .then((data) => setTargetRestaurants(data))
          .catch((err) => console.log(err));
      }, [targetSearchObject]);
    
      /** HANDLERS */
      const searchHandler = (category: string) => {
        targetSearchObject.page = 1;
        targetSearchObject.order = category;
        setTargetSearchObject({ ...targetSearchObject });
      };
    
      const handlePaginationChange = (event: any, value: number) => {
        targetSearchObject.page = value;
        setTargetSearchObject({ ...targetSearchObject }); //
      };
      /** LIKE BOSISH nazariyasi */
      const targetLikeHandler = async (e: any, id: string) => {
        try {
          assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
    
          const memberService = new MemberApiService(),
            like_result: any = await memberService.memberLikeTarget({
              like_ref_id: id,
              group_type: "member",
            });
          assert.ok(like_result, Definer.general_err1);
    
          if (like_result.like_status > 0) {
            e.target.style.fill = "red";
            refs.current[like_result.like_ref_id].innerHTML++;
          } else {
            e.target.style.fill = "white";
            refs.current[like_result.like_ref_id].innerHTML--;
          }
    
          await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
          console.log("targetLikeTop, ERROR:", err);
          sweetErrorHandling(err).then();
        }
      };
      return (
        < div className="all_restaurant">
            <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className={"fil_search_box"}>
                    <Box className={"fil_box"} style={{ cursor: "pointer" }}>
                      <a onClick={() => searchHandler("mb_point")}>Zo'r</a>
                      <a onClick={() => searchHandler("mb_views")}>Mashhur</a>
                      <a onClick={() => searchHandler("mb_likes")}>Trendagi</a>
                      <a onClick={() => searchHandler("createdAt")}>Yangi</a>
                    </Box>
                    <Box className={"search_big_box"}>
                        <form
                            className={"search_form"}
                            action={""}
                            method={""}
                        >
                            <input
                                type={"search"}
                                className={"searchInput"}
                                name={"resSearch"}
                                placeholder={"qidiruv"}
                            />
                            <Button
                                className={"button_search"}
                                variant="contained"
                                endIcon={<SearchIcon/>}
                            >
                                Izlash
                            </Button>
                        </form>
                    </Box>
                </Box>
                <Stack className={"all_res_box"}>
                    <CssVarsProvider>

                        {targetRestaurants.map((ele: Restaurant)=> {  // shuyerdan brestarantlarni ssoniga qarab qushamiz.
                        const image_path = `${serverApi}/${ele.mb_image}`;
                            return (
                                <Card
                                variant="outlined"
                                sx={{
                                    minHeight: 410,
                                    minWidth: 290,
                                    mx: "17px",
                                    my: "20px",
                                }}
                                >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={image_path} alt="" />
                                    </AspectRatio>
                                    <IconButton
                                        aria-label="Like minimal photography"
                                        size="md"
                                        variant="solid"
                                        color="neutral"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        sx={{
                                            position: "absolute",
                                            zIndex: 2,
                                            borderRadius: "50%",
                                            right: "1rem",
                                            bottom: 0,
                                            transform: "translateY(50%)",
                                            color: "rgba(0,0,0, .04)",
                                        }}
                                        >
                                        <Favorite
                                        onClick={(e) => targetLikeHandler(e, ele._id)}
                                        style={{
                                            fill:
                                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                ? "red"
                                                : "white",
                                        }}
                                            />
                                    </IconButton>
    
                                    </CardOverflow>
                                <Typography level="h2" sx={{ fontSize: "lg", mt: 0.1}}>
                                    {ele.mb_nick}
                                </Typography>
                                <Typography level="body-sm" sx={{ mt: 0.1, mb: 0.5}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon />}
                                        textColor="black"
                                        >
                                    </Link>
                                    {ele.mb_address}
                                </Typography>
    
                                <Typography level="body-sm" sx={{ mt: 0.5, mb: 0.5 }}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon />}
                                        textColor="black"
                                        >
                                        {ele.mb_phone}
                                    </Link>
                                </Typography>
                                <CardOverflow
                                    variant="soft"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                        bgcolor: "background.level1",
                                    }}
                                    >
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: "md",
                                            color: "text.secondary",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                        >
                                        {ele.mb_views}
                                        <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                    </Typography>
                                    <Box sx={{ width: 2, bgcolor: "divider"}} />
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: "md",
                                            color: "text.secondary",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                        >
                                        <div
                                        ref={(element) => (refs.current[ele._id] = element)}
                                        >
                                        {ele.mb_likes}
                                        </div>
                                        <FavoriteIcon sx={{ fontSize: 20, marginLeft: "5px" }}  />
                                    </Typography>
                                </CardOverflow>
                            </Card>
                            );
                        })}

                    </CssVarsProvider>
                </Stack>

                <Stack className={"bottom_box"}>
                    <img className={"line_img_one"} src={"/icons/turtburchak.png"} />
                    <Pagination
                    count={
                        targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
                      }
                      page={targetSearchObject.page}
                       renderItem={(item) => (
                         <PaginationItem 
                         components={{
                              previous: ArrowBackIcon,
                             next: ArrowForwardIcon,
                           }} sx={{ color:"blue"}} {...item}

                          />
                      )}
                      onChange={handlePaginationChange}
                      /> 
                    <img className={"line_img_two"} src={"/icons/turtburchak.png"} />
                </Stack>
            </Stack>
            </Container>
        </div>
    );
}