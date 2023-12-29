/** SELECTOR lar ==> Eng oxirgi qiymatlarni olib berish uchun xizmat qiladi.  */

import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectRestaurantPage = (state: AppRootState) => state.restaurantPage;// stateni homepagega tegishli malumotlarni olib bersin.
export const retrieveTargetRestaurants = createSelector(
    selectRestaurantPage, // menga RestaurantPageni olib bersin
    (RestaurantPage) => RestaurantPage.targetRestaurants
);

export const retrieveRandomRestaurants = createSelector(
    selectRestaurantPage, // menga RestaurantPageni olib bersin
    (RestaurantPage) => RestaurantPage.randomRestaurants
);

export const retrieveChosenRestaurant = createSelector(
    selectRestaurantPage, // menga RestaurantPageni olib bersin
    (RestaurantPage) => RestaurantPage.chosenRestaurant
);

export const retrieveTargetProducts = createSelector(
    selectRestaurantPage, // menga RestaurantPageni olib bersin
    (RestaurantPage) => RestaurantPage.targetProducts
);

export const retrieveChosenDish = createSelector(
    selectRestaurantPage, // menga RestaurantPageni olib bersin
    (RestaurantPage) => RestaurantPage.chosenProduct
);

