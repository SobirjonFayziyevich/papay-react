import  React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import {Box, Container, Stack} from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { CssVarsProvider } from "@mui/joy/styles";
import {CardOverflow} from "@mui/joy";
import { IconButton } from '@mui/joy';
import {Favorite} from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/joy/Typography';
import { serverApi } from '../../../lib/config';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import  assert  from 'assert';
import { Definer } from '../../../lib/Definer';
import MemberApiService from '../../apiServices/memberApiService';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

// REDUX tegishli bulgan importlar.
import { useDispatch, useSelector } from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {setTopRestaurants, setBestRestaurants} from "../../screens/Homepage/slice";
import { Restaurant } from "../../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiServices";
import {createSelector} from "reselect";
import { setTargetRestaurants } from '../RestaurantPage/slice';
import { retrieveTopRestaurants } from './selector';
import { verifiedMemberData } from '../../apiServices/verify';

/** REDUX SLICE */ 
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setTargetRestaurants: (data: Restaurant[]) => dispach(setTargetRestaurants(data)),
    setBestRestaurants: (data: Restaurant[]) => dispach(setBestRestaurants(data)),
  });
  

/** REDUX SELECTOR */
const topRestaurantRetriever = createSelector(
    retrieveTopRestaurants,
    (topRestaurants) => ({
        topRestaurants,
      })
    );


export function TopRestaurants() {
     /** INITIALIZATION */
     const history = useHistory(); //react router-domdan qabul qilib oldim.
    const {topRestaurants} = useSelector(topRestaurantRetriever); //useSelectorga topRestaurantRetrieverni kiritib undan topRestaurantni qabul qilib olayopman.
    console.log("topRestaurants:::", topRestaurants);
    const refs: any = useRef([]); 

    /** HANDLERS */

    const chosenRestaurantHandler = (id: string) => {
        history.push(`/restaurant/${id}`);  // historyni push qilayopman pushga locationni kiritib olgan holatda.
    }
    const targetLikeTop = async (e: any, id: string) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);

            const memberService = new MemberApiService();
            const like_result: any = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: "member",
            });
            assert.ok(like_result, Definer.general_err1);

            if (like_result.like_status >= 0) {   //like - qarab ketmaydi
                e.target.style.fill = "red";
                refs.current[like_result.like_ref_id].innerHTML++;
            } else {
                e.target.style.fill = "white"
                refs.current[like_result.like_ref_id].innerHTML--;
            }
            await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
            console.log("targetLikeTop, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    };


    return(
        <div className="top_restaurant_frame">
            <Container>
                <Stack
                    flexDirection={'column'}
                    alignItems={'center'}
                    sx={{ mt: "45px" }}
                >
                    <Box className={'category_title'}>TOP Restaurantlar</Box>
                    <Stack sx={{mt: "43px"}} flexDirection={'row'} m={"16px"}>
                        
                        {topRestaurants.map((ele: Restaurant) => {
                            const image_path = `${serverApi}/${ele.mb_image}`;
                                return (
                                <CssVarsProvider key={ele._id}>
                                    <Card 
                                    onClick={() => chosenRestaurantHandler(ele._id)}
                                sx={{
                                    minHeight: 430,
                                    minWidth: 325,
                                    mr: "35px",
                                    cursor: "pointer",
                                }}
                            >
                            <CardCover>
                                <img
                                    src={image_path}
                                    loading="lazy"
                                    alt=""
                                />
                            </CardCover>
                            <CardCover
                                sx={{
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                                }}
                            />
                            <CardContent sx={{ justifyContent: 'flex-end' }}>
                                <Typography 
                                level="h2"
                                fontSize="lg"
                                textColor="#fff"
                                mb={1}
                                >
                                    {ele.mb_nick}
                                </Typography>
                                <Typography
                                    startDecorator={<LocationOnRoundedIcon />}
                                    textColor="neutral.300"
                                >
                                    {ele.mb_address}
                                    
                                </Typography>
                            </CardContent>
                                <CardOverflow
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 1.5,
                                    py: 1.5,
                                    px: "var(--Card-padding)",
                                    borderTop: "1px solid",
                                }}
                                >
                                    <IconButton 
                                      aria-label="Like minimal Photography"
                                      size="md"
                                      variant="solid"
                                      color="neutral"
                                      sx={{
                                        position: "absolute",
                                        zIndex: 2,
                                        borderRadius: "50%",
                                        right: "1rem",
                                        bottom: 45,
                                        transform: "translateY(50%)",
                                        color: "rgba(0,0,0,.4)",
                                      }}        
                                      onClick={(e) => {e.stopPropagation()}}
                                    >
                                      <Favorite
                                            onClick={(e) => targetLikeTop(e, ele._id)}
                                             style={{
                                              fill:
                                                ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                                    ? "red"
                                                    : "white",
                                                    }}
                                                />
                                    </IconButton>

                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "neutral.300",
                                             alignItems: "center",
                                             display: "flex",
                                    }}
                                    >
                                        {ele.mb_views}
                                        <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                                    </Typography>
                                    <Box sx={{ width: 2, bgcolor: "divider" }} />
                                    <Typography
                                        sx={{
                                            fontWeight: "md",
                                            color: "neutral.300",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div 
                                          ref={(element) => (refs.current[ele._id] = element)}  // like bosilgan payt success bulishimi taminlaydi
                                        >
                                        {ele.mb_likes}
                                        </div>

                                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                                    </Typography>
                                </CardOverflow>
                        </Card>
                   
                        </CssVarsProvider>
                                )
                            })};
                        </Stack>
                </Stack>
            </Container>
        </div>
    );
}