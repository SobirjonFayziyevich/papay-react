import React, { useEffect } from "react";
import {Container} from "@mui/material";
import {Statistics} from "./statistics";
import {TopRestaurants} from "./topRestaurants";
import {BestRestaurants} from "./bestRestaurants";
import {BestDishes} from "./bestDishes";
import {Advertisements} from "./advertisements";
import {Events} from "./events";
import {Recommendations} from "./recommendations";
import '../../../css/home.css';

// REDUX tegishli bulgan importlar.
import { useDispatch, useSelector } from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {setTopRestaurants, bestRestaurants} from "../../screens/Homepage/slice";
import {retrieveTopRestaurants} from "../../screens/Homepage/selector";
import { Restaurant } from "../../../types/user";

/** REDUX SLICE */ 
const actionDispatch = (dispach: Dispatch) => ({ // buning mantiqi HomepageSlicedan setTopRestaurantni chaqirib olish edi.
  setTopRestaurants: (data: Restaurant[]) => dispach(setTopRestaurants(data)),
});
/** REDUX SELECTOR */
const topRestaurantRetriever = createSelector(
    retrieveTopRestaurants,
    (topRestaurants) => ({
        topRestaurants,
      })
    );

export function Homepage() {

    /** INITIALIZATION */

    const {setTopRestaurants} = actionDispatch(useDispatch()); //HomePageSlicedan setTopRestaurantni chaqirib oldim.
    const {topRestaurants} = useSelector(topRestaurantRetriever); //useSelectorga topRestaurantRetrieverni kiritib undan topRestaurantni qabul qilib olayopman. 
     

     // Selector(malumot uquvchi) bizga Storedan datani olib beradi.

    useEffect(() => {
        // backend data request => data ni olganimizda malumotni Redux Store ga borib yozib olamiz.
        // bu holatda bizga 2ta mantiq kerak buladi: SLICE va SELECTOR => biri borib storega mantiq yozadi,
        // biri yozilgan mantiqni olib uqiydi.
        // backenddan olgan datani Redux Storega borib yozadi, buning un SLICE(malumot yozuvchi degani) yordam beradi.
 
        console.log("topRestaurants:::", topRestaurants);
          //slice: data => store
        setTopRestaurants([]);
    }, []);
    
    return  <div className="homepage">
        <Statistics />
        <TopRestaurants />
        <BestRestaurants />
        <BestDishes />
        <Advertisements />
        <Events />
        <Recommendations />

        </div>;
}