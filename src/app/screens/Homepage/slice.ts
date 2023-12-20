import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
    topRestaurants: [],  // type restaurant bulgan arraylardan iborat.
    bestRestaurants: [],
    trendProducts: [],
    bestBoArticles: [],
    trendBoArticles: [],
    newsBoArticles: [],

};

const HomePageSlice = createSlice({
    name: 'homePage',
    initialState, // initialState yuqoridagidek bulishi kerak 
    reducers: { //  malumotni borib Redux Store ga yozadigan actionlar buladi.
        setTopRestaurants: (state, action) => { //setTopRestaurant faqat topRestaurantni qiymatini uzgartiradi.
           state.topRestaurants = action.payload  //InitialStateni olib beradi. actiondan kelayotgan datani payload orqali olaman.
        },
        bestRestaurants: (state, action) => { 
           state.bestRestaurants = action.payload  
        }, 
        trendProducts: (state, action) => { 
           state.trendProducts = action.payload  
        },
        bestBoArticles: (state, action) => { 
           state.bestBoArticles = action.payload  
        },
        trendBoArticles: (state, action) => { 
           state.trendBoArticles = action.payload  
        },
        newsBoArticles: (state, action) => { 
            state.newsBoArticles = action.payload  
       },
    },
});

export const {
    setTopRestaurants,
    bestRestaurants,
    trendProducts, 
    bestBoArticles,
    trendBoArticles,
    newsBoArticles 
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;