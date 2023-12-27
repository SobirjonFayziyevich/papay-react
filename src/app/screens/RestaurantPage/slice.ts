/** SILICE ==> malumotlarni Reduce Store ga yozish uchun xizmat qiladi. */
import { createSlice } from "@reduxjs/toolkit";
import { RestaurantPageState } from "../../../types/screen";


const initialState: RestaurantPageState = {
    targetRestaurants: [], //restaurant interfacedan iborat array.
    randomRestaurants: [],
    chosenRestaurant:   null,
    targetProducts: [],
    chosenProduct:  null,

};

const restaurantPageSlice = createSlice({
    name: 'restaurantPage',
    initialState,  // initialState yuqoridagidek bulishi kerak 
    reducers: {   //  malumotni borib Redux Store ga yozadigan actionlar buladi.
        setTargetRestaurants: (state, action) => { //setTopRestaurant faqat topRestaurantni qiymatini uzgartiradi.
           state.targetRestaurants = action.payload  //InitialStateni olib beradi. actiondan kelayotgan datani payload orqali olaman.
        }, // payloadlar orqali backenddan malumotlarni olamiz.
        setRandomRestaurants: (state, action) => { 
           state.randomRestaurants = action.payload  
        }, 
        setChosenRestaurant: (state, action) => { 
           state.chosenRestaurant = action.payload  
        },
        setTargetProducts: (state, action) => { 
           state.targetProducts = action.payload  
        },
        setChosenProduct: (state, action) => { 
           state.chosenProduct = action.payload  
        },
    },
});

export const {
    setTargetRestaurants,
    setRandomRestaurants,
    setChosenRestaurant, 
    setTargetProducts,
    setChosenProduct,
} = restaurantPageSlice.actions;

const RestayrantPageReducer = restaurantPageSlice.reducer;
export default RestayrantPageReducer;