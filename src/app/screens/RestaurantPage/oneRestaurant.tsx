
import { Box ,Button, Checkbox} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, {useState, useEffect} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import Badge from "@mui/material/Badge";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StarIcon from "@mui/icons-material/Star";
import { useHistory, useParams } from "react-router-dom";
/** REDUX */
import { 
    setChosenRestaurant, 
    setRandomRestaurants, 
    setTargetProducts 
} from "../../screens/RestaurantPage/slice";
import { Restaurant } from "../../../types/user";
import { Product } from "../../../types/product";
import { retrieveChosenRestaurant, retrieveRandomRestaurants, retrieveTargetProducts } from "../../screens/RestaurantPage/selector";
import { createSelector, Dispatch} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import RestaurantApiService from "../../apiServices/restaurantApiServices";

// const restaurant_list = Array.from(Array(10).keys());
// const product_list = Array.from(Array(8).keys());
// console.log("product_list:", product_list);

/** REDUX SLICE */ 
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setRandomRestaurants: (data: Restaurant[]) =>
     dispach(setRandomRestaurants(data)), // bu setTargetRestaurant slice.tsdan kelayotgan restaurantdir.
     
     setChosenRestaurant: (data: Restaurant) =>
     dispach(setChosenRestaurant(data)), // bu setTargetRestaurant slice.tsdan kelayotgan restaurantdir.
    
     setTargetProducts: (data: Product[]) =>
     dispach(setTargetProducts(data)), 
    });

     /** REDUX SELECTOR */
const randomRestaurantsRetriever = createSelector(
    retrieveRandomRestaurants,
    (randomRestaurants) => ({
        randomRestaurants,
      })
    );
    const chosenRestaurantsRetriever = createSelector(
        retrieveChosenRestaurant,
        (chosenRestaurant) => ({
            chosenRestaurant,
        })
      );
      const targetRestaurantsRetriever = createSelector(
        retrieveTargetProducts,
        (targetProducts) => ({
            targetProducts,
        })
      );
    
export function OneRestaurant () {
    /** INITIALIZATION */
    const history = useHistory();
    let {restaurant_id} = useParams<{restaurant_id: string}>();
    const {setRandomRestaurants, setChosenRestaurant, setTargetProducts } = actionDispatch(useDispatch());
    const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
    const { chosenRestaurant } = useSelector(chosenRestaurantsRetriever);
    const { targetProducts } = useSelector(targetRestaurantsRetriever);
    const [chosenRestaurantId, setChosenRestaurantId] = useState<string>(restaurant_id);
    const [ targetProductSearchObj, setTargetProductSearchObj] = useState<ProductSearchObj>({
        page: 1,
        limit: 4,
        order: "createdAt",
        restaurant_mb_id: restaurant_id,
        product_collection: 'dish',
    });
    useEffect(() => {
        const restaurantService = new RestaurantApiService();
        restaurantService
        .getRestaurants({page: 1, limit: 10, order: "random" })
        .then((data) => setRandomRestaurants(data))
        .catch((err) => console.log(err));
        const productService = new ProductApiService(); //ProductApiServicedan => productServiceni hosil qilib oldim
        productService // productServicedagi => getTargetProductsga => targetProductSearchObjni pass qildim.
          .getTargetProducts(targetProductSearchObj)
          .then((data) => setTargetProducts(data))  // malumotni qabul qilganda, setTargetProducts(action createrimiz) datani pass
          .catch((err) => console.log(err));
      }, [targetProductSearchObj]);
      /** HANDLER */
      const chosenRestaurantHandler = (id: string) => {
        setChosenRestaurantId(id);
        targetProductSearchObj.restaurant_mb_id = id;
        setTargetProductSearchObj({ ...targetProductSearchObj });
        history.push(`/restaurant/${id}`);
      };
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
                   <Box 
                   className={"prev_btn restaurant-prev"}>
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
                       {randomRestaurants.map((ele: Restaurant) => {
                           const image_path = `${serverApi}/${ele.mb_image}`
                           return (
                               <SwiperSlide  
                               onClick={() => chosenRestaurantHandler(ele._id)}
                               style={{ cursor: "pointer" }}
                               key={ele._id}
                               className={"restaurant_avatars"}
                               >
                                   <img src={image_path} />
                                   <span>{ele.mb_nick}</span>
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
                width={"75%"}
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

                    {targetProducts.map((product: Product) => {
                       const image_path = `${serverApi}/${product.product_images[0]}`;
                       const size_volume =
                       product.product_collection === "drink"
                        ? product.product_volume + "l"
                        : product.product_size + "size";
                          

                          return (
                             <Box className={"dish_box"} key={product._id}>
                               <Box className={"dish_img"}
                               sx={{
                                   backgroundImage: `url(${image_path})`,
                               }}
                               >
                                   <div className={"dish_sale"}>{size_volume}</div>
                                   <Button
                                   className={"like_view_btn"}
                                   style={{ left: "36px" }}
                                   >
                                       <Badge badgeContent={product.product_likes} color="primary">
                                           <Checkbox
                                             icon={<FavoriteBorder style={{ color: "white" }} />}
                                             id={product._id}
                                            checkedIcon={<Favorite style={{ color: "red" }} />} 
                                             /*@ts-ignore*/
                                            checked={
                                                product?.me_liked && 
                                                product?.me_liked[0]?.my_favorite 
                                                   ? true 
                                                   : false
                                                }
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
                                       <Badge badgeContent={product.product_views} color="primary">
                                           <Checkbox
                                           icon={
                                               <RemoveRedEyeIcon style={{ color: "white" }} />
                                           }
                                           />
                                       </Badge>
                                   </Button>
                             </Box>  
                             <Box className={"dish_desc"}>
                                 <span className={"dish_title_text"}>{product.product_name}</span>
                                 <div className={"dish_desc_text"}>
                                     <MonetizationOnIcon />{product.product_price}
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
                    {Array.from(Array(4).keys()).map((ele, index) => {
                        return (
                            <Box className={"review_box"} key={index}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <img
                                    src={"/community/ranaldo.jpg"}
                                    className={"review_img"}
                                    />
                                </Box>

                                <span className={"review_name"}>Cristiano Ronaldo</span>
                                <span className={"review_name_user"}>Foydalanuvchi</span>
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
                src="https://image.cnbcfm.com/api/v1/image/100416482-google-map-maker-north-korea-google-youtube.jpg?v=1359477081&w=1600&h=900"
                width="1320"
                height="500"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

            </Stack>
        </Container>
    </div>
    );
}

function chosenRestaurantHandler(_id: string): void {
    throw new Error("Function not implemented.");
}
