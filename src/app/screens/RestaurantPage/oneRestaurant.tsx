
import { Box ,Button, Checkbox} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import Badge from "@mui/material/Badge";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";


const restaurant_list = Array.from(Array(7).keys());
const product_list = Array.from(Array(5).keys());


export function OneRestaurant () {
    return(
     <div className="single_restaurant">
        <Container>
            <Stack flexDirection={"column"} alignItems={"center"}>
                <Stack className={"avatar_big_box"}>
                    <Box className={"top_text"}>
                        <p>Texas De Brazil Restaurant</p>
                        <Box className={"Single_search_big_box"}>
                            <form className={"Single_search_form"} action={""} method={""}>
                                <input 
                                type={"search"}
                                className={"Single_searchInput"}
                                name={"Single_resSearch"}
                                placeholder={"Qidiruv"}
                                />
                                <Button
                                className={"Single_button_search"}
                                variant="contained"
                                endIcon={<SearchIcon />}
                                >
                                    Izlash
                                    </Button>
                            </form>
                        </Box>
                    </Box>
                </Stack>

                <Stack
                style={{ width: "100%", display: "flex" }}
                flexDirection={"row"}
                sx={{ mt: "35px" }}
                >
                   <Box className={"prev_btn_retaurant-prev"}>
                     <ArrowBackIosNewIcon
                     sx={{ fontSize: 40 }}
                     style={{ color:  "white"}} 
                     />
                      </Box> 
                      <Swiper
                      className={"restaurant_avatars_wrapper"}
                      slidesPerView={7}
                      centeredSlides={false}
                      spaceBetween={30}
                      navigation={{
                          nextEl: ".restaurant-next",
                          prevEl: ".restaurant-prev",
                      }}
                      >
                       {restaurant_list.map((ele, index) => {
                           return (
                               <SwiperSlide
                               style={{ cursor: "pointer" }}
                               key={index}
                               className={"restaurant_avatars"}
                               >
                                   <img src={"/restaurant/mado.png"} />
                                   <span>Mado</span>
                               </SwiperSlide>
                           );
                       })}
                      </Swiper>
                      <Box
                      className={"next_btn restaurant-next"}
                      style={{ color: "white" }}
                      >
                          <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
                      </Box>
                </Stack>

                <Stack 
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
                width={"90%"}
                sx={{ mt: "65px"}}
                >
                    <Box className={"dishs_filter_box"}>
                        <Button variant={"contained"} color="secondary">
                            new
                        </Button> 
                        <Button variant={"contained"} color="secondary">
                            price
                        </Button>
                        <Button variant={"contained"} color="secondary">
                            likes
                        </Button>
                        <Button variant={"contained"} color="secondary">
                            views
                        </Button>
                    </Box>
                </Stack>

                <Stack
                style={{ width: "100%", display: "flex", minHeight: "600px"}}
                flexDirection={"row"}
                >
                    <Stack className={"dish_category_box"}>
                        <div className={"dish_category_main"}>
                            <Button variant={"contained"} color="secondary">
                                boshqa
                            </Button>
                            <Button variant={"contained"} color="secondary">
                                desert
                            </Button>
                            <Button variant={"contained"} color="secondary">
                                ichimlik
                            </Button>
                            <Button variant={"contained"} color="secondary">
                                salad
                            </Button>
                            <Button variant={"contained"} color="secondary">
                                ovqatlar
                            </Button>
                        </div>
                    </Stack>

                    <Stack className={"dish_wrapper"}>
                        {product_list.map((ele, index) => {
                          const size_volume = "normal size";

                          return (
                             <Box className={"dish_box"} key={`${index}`}>
                               <Box className={"dish_img"}
                               sx={{
                                   backgroundImage: `url("/others/shashlik.jpeg")`,
                               }}
                               >
                                   <div className={"dish_sale"}>{size_volume}</div>
                                   <Button
                                   className={"like_view_btn"}
                                   style={{ left: "36px" }}
                                   >
                                       <Badge badgeContent={8} color="primary">
                                           <Checkbox
                                             icon={<FavoriteBorder style={{ color: "white" }} />}
                                             id={`${index}`}
                                            checkedIcon={<Favorite style={{ color: "red" }} />} 
                                             /*@ts-ignore*/
                                            checked={true}
                                            />
                                       </Badge>
                                   </Button>
                                   <Button className={"view_btn"}>
                                       <img 
                                       src={"/icons/shopping-cart.png"}
                                       style={{ display: "flex"}}
                                       />
                                   </Button>
                                   <Button
                                   className={"like_view_btn"}
                                   style={{ right: "36px"}}
                                   >
                                       <Badge badgeContent={1000} color="primary">
                                           <Checkbox
                                           icon={
                                               <RemoveRedEyeIcon style={{ color: "white" }} />
                                           }
                                           />
                                       </Badge>
                                   </Button>
                             </Box>  
                             <Box className={"dish_desc"}>
                                 <span className={"dish_title_text"}>Ajoyib shashlik</span>
                                 <div className={"dish_desc_text"}>
                                     <MonetizationOnIcon />8
                                 </div>
                                 </Box>
                             </Box>
                          );
                        })}
                    </Stack>
                </Stack>
             </Stack>
        </Container>

        <div className={"review_for_restaurant"}>
            <Container
            sx={{ mt: "100px"}}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
                <Box className={"category_title"}>Oshxona haqida fikrlar</Box>
                <Stack
                flexDirection={"row"}
                display={"flex"}
                justifyContent={"space-between"}
                width={"100"}
                >
                    {Array.from(Array(1).keys()).map((ele, index) => {
                        return (
                            <Box className={"review_box"} key={index}>
                                <Box display={"flex"} justifyContent={"center"}>
                                    <img
                                    src={"/community/ranaldo.jpg"}
                                    className={"review_img"}
                                    />
                                </Box>

                                <span className={"review_name"}>Cristiano Ronaldo</span>
                                <span className={"review_name"}>Foydalanuvchi</span>
                                <p className={"review_desc"}>
                                    Menga bu restarant taomlari yoqadi. 
                                    Barchanggizga tavsiya qilaman!!!
                                </p>
                                <div className={"review_stars"}>
                                    <StarIcon style={{ color: "#F2BD57" }} />
                                    <StarIcon style={{ color: "#F2BD57" }} />
                                    <StarIcon style={{ color: "#F2BD57" }} />
                                    <StarIcon style={{ color: "whitesmoke" }} />
                                    <StarIcon style={{ color: "whitesmoke" }} />
                                </div>

                            </Box>
                        );
                    })}
                </Stack>

            </Container>
        </div>

        <Container className="member_reviews">
            <Box className={"category_title"}>Oshxona haqida</Box>
            <Stack 
            display={"flex"}
            flexDirection={"row"}
            width={"90%"}
            sx={{ mt: "70px" }}
            >
                <Box
                className={"about_left"}
                sx={{
                    backgroundImage: `url('/restaurant/texasde.jpg')`
                }}
                >
                    <div className={"about_left_desc"}>
                        <span>eng mazzali oshxona</span>
                    </div>
                </Box>
                <Box className={"about_right"}>
                    {Array.from(Array(3).keys()).map((ele, index) => {
                        return (
                  <Box display={'flex'} flexDirection={"row"} key={index}>
                    <div className={"about_right_img"}></div>
                    <div className={"about_right_desc"}>
                        <span>Bizning mohir oshpazlarimiz</span>
                        <p>Bizning oshpazlarimiz dunto taniydigan 
                            oliygohlarda talim olishgan
                        </p>
                    </div>
                    </Box>
                    );
                  })}
                </Box>
            </Stack>


            <Stack 
            sx={{ mt: "60px" }}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
                <Box className={"category_title"}>Oshxona Manzili</Box>
                <iframe
                style={{ marginTop: "60px" }}
                // src="https://maps.apple.com/?address=%EC%96%91%EC%82%B0%EC%8B%9C,%20%EA%B2%BD%EC%83%81%EB%82%A8%EB%8F%84,%2050612%20%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD&auid=15286827124622977503&ll=35.326940,129.004750&lsp=7618&q=My%20Location"
                width="1320"
                height="500"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

            </Stack>
        </Container>
    </div>
    );
}