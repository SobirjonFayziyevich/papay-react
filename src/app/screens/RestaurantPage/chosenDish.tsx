import React, { useEffect, useState }  from "react";
import {Box, Container, fontSize, Stack} from "@mui/system";
import {Swiper, SwiperSlide} from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {FreeMode, Navigation, Thumbs} from "swiper";
import {Favorite, FavoriteBorder, } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import { Product } from "../../../types/product";
import { Restaurant } from "../../../types/user";

/** REDUX */
import { 
    setChosenRestaurant, 
    setChosenProduct
} from "../../screens/RestaurantPage/slice";

import {
    
    retrieveChosenDish,
    retrieveChosenRestaurant,
    } from "../../screens/RestaurantPage/selector";
import { createSelector, Dispatch} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiServices";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE */ 
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
    setChosenProduct: (data: Product) => dispach(setChosenProduct(data)), 
    // bu setTargetRestaurant slice.tsdan kelayotgan restaurantdir.
    setChosenRestaurant: (data: Restaurant[]) => dispach(setChosenRestaurant(data)), 
});

     /** REDUX SELECTOR */
const chosenProductRetriever = createSelector(
    retrieveChosenDish,
    (chosenProduct) => ({
        chosenProduct,
      })
    );
    const chosenRestaurantRetriever = createSelector(
        retrieveChosenRestaurant,
        (chosenRestaurant) => ({
            chosenRestaurant,
          })
        );

// const chosen_list = Array.from(Array(3).keys());

export function ChosenDish (props: any) {
    /** INITIALIZATION */
    let { dish_id } = useParams<{ dish_id: string }>();
  const { setChosenProduct, setChosenRestaurant } = actionDispatch(
    useDispatch()
  );
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenDish(dish_id);
      setChosenProduct(product);

      const restaurantService = new RestaurantApiService(); //  RestaurantApiService modeldan, restaurantService objectini hosil qilib oldim
      const restaurant = await restaurantService.getChosenRestaurant(
        product.restaurant_mb_id
      );
      setChosenRestaurant(restaurant);
    } catch (err) {
      console.log(`dishRelatedProcess ERROR:`, err);
    }
  };

  /** HANDLERS */

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  useEffect(() => {
    dishRelatedProcess().then();
  }, [productRebuild]);


return ( 
    <div className="chosen_dish_page">
       <Container className="dish_container"
       sx={{ display: "flex" }}>
           
           <Stack className="chosen_dish_slider">
               <Swiper
               className="dish_swiper"
               loop={true}
               spaceBetween={4}
               navigation={true}
               modules={[FreeMode, Navigation, Thumbs]}
               >
                   {chosenProduct?.product_images.map((ele: string) => {
                       const image_path = `${serverApi}/${ele}`;
                       
                       return (
                           <SwiperSlide>
                               <img 
                               style={{ width: "100%", height: "100%" }}
                               src={image_path} alt=""
                               />
                           </SwiperSlide>
                       );
                   })}

               </Swiper>

               <Swiper
               className="dish_swiper_two"
               loop={true}
               spaceBetween={50}
               slidesPerView={3}
            //    slidesPerView={chosenProduct?.product_images.length}
               navigation={{
                nextEl: null,
            }}
            modules={[FreeMode,Navigation, Thumbs]}

               
               >
                      {chosenProduct?.product_images.map((ele: string) => {
                       const image_path = `${serverApi}/${ele}`;
                       
                       return (
                           <SwiperSlide>
                               <img style={{ width: "100%", height: "100%" }}
                               src={image_path}
                               />
                           </SwiperSlide>
                       );
                   })}

               </Swiper>
           </Stack>
           <Stack className={"chosen_dish_info_container"}>
               <Box className={"chosen_dish_info_box"}>
               <strong className={"dish_txt"}>{chosenProduct?.product_name}</strong>
               <span className={"resto_name"}>{chosenRestaurant?.mb_nick}</span>
               <Box className={"rating_box"}>
                   <Rating name="half_rating" defaultValue={3.5} precision={0.5} style={{fontSize: "30px"}} />
                   <div className={"evaluation_box"}>
                   <div
                      style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "20px",
                      }}
                      >
                       <Checkbox
                                        {...label}
                                        icon={<FavoriteBorder/>}
                                        checkedIcon={<Favorite style={{color: "red"}}/>}
                                        id={chosenProduct?._id}
                                        onClick={targetLikeProduct}
                                        checked={!!chosenProduct?.me_liked[0]?.my_favorite
                                        }
                                    />
                          <span>{chosenProduct?.product_likes}ta</span>
                    </div>  

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                        <span>{chosenProduct?.product_views}ta</span>
                    </div>
                  </div>
               </Box>
               <p className={"dish_desc_info"}>{chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "no describtion"}</p>
              
               <Marginer
               direction="horizontal"
               height="1"
               width="100%"
               bg="#000000"
               />
               <div className={"dish_price_box"}>
                            <span>Cost:</span>
                            <span>{chosenProduct?.product_price}$</span>
              </div>
               <div className={"button_box"}>
                   <Button variant="contained"onClick={() => {props.onAdd(chosenProduct)}}>Savatga qo'shish</Button>
               </div>
             </Box>
         </Stack>
       </Container>
    </div>
    );
}