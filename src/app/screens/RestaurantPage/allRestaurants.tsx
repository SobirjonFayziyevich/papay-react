import React, { useEffect } from "react";
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
import { setTargetRestaurants } from "../RestaurantPage/slice";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { retrieveTargetRestaurants } from "../../screens/RestaurantPage/selector";
import { useDispatch, useSelector } from "react-redux";
SwiperCore.use([Autoplay, Navigation, ]);




const order_list = Array.from(Array(8).keys());    // 8ta restaurantni kelishi
// console.log(order_list);

/** REDUX SLICE */ 
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setTargetRestaurants: (data: Restaurant[]) =>
     dispach(setTargetRestaurants(data)),
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

    useEffect(() => {
        // TODO: Retrieve targetRestaurantsData
    }, [])

    return (
        < div className="all_restaurant">
            <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Box className={"fil_search_box"}>
                    <Box className={"fil_box"}>
                        <a>Zo'r</a>
                        <a>Mashhur</a>
                        <a>Trendagi</a>
                        <a>Yangi</a>
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

                        {order_list.map(ele => {  // shuyerdan brestarantlarni ssoniga qarab qushamiz.
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
                                        <img src={"/restaurant/nusret.png"} alt="" />
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
                                            style={{ color: "white"}}
                                            />
                                    </IconButton>
    
                                    </CardOverflow>
                                <Typography level="h2" sx={{ fontSize: "lg", mt: 0.1}}>
                                    Nusret
                                </Typography>
                                <Typography level="body-sm" sx={{ mt: 0.1, mb: 0.5}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon />}
                                        textColor="black"
                                        >
                                    </Link>
                                    Tashkent city
                                </Typography>
    
                                <Typography level="body-sm" sx={{ mt: 0.5, mb: 0.5 }}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon />}
                                        textColor="black"
                                        >
                                        8210 8058 0771
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
                                        1000{" "}
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
                                        <div>500</div>
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
                       count={4}
                       page={1}
                       renderItem={(item) => (
                         <PaginationItem 
                         components={{
                              previous: ArrowBackIcon,
                             next: ArrowForwardIcon,
                           }} sx={{ color:"blue"}} {...item}

                          />
                      )}
                      /> 
                    <img className={"line_img_two"} src={"/icons/turtburchak.png"} />
                </Stack>
            </Stack>
            </Container>
        </div>
    );
}