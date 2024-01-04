import {createSlice} from "@reduxjs/toolkit";
import {CommunityPageState} from "../../../types/screen";


const initialState: CommunityPageState = {  // initialState i CommunityPageState dan kelyabdi
    targetBoArticles: [], // va uning initialState faqatgina targetBoArticles boladi, va u bo'sh array da iborat boladi
};

//communityPageSlice ni hosil qilishda createSlice dan foydalanyabman
const communityPageSlice = createSlice({ // creatSlice ni ichiga object ni path qilyabman
    name: "communityPage", // object ni elemetlari sifadida name ini communityPage dab belgilayabman
    initialState,  //      initialStaten ni kirityabman
    reducers: {  // va reducer larni yaratib olyabman
        setTargetBoArticles: (state, action) => {
            state.targetBoArticles = action.payload; // targetBoArticles ning qiymatini action.payload ni qiymatiga tenglashtir deymn
        },
    },
});


// setTargetBoArticles ni communityPageSlice ni dagi actions dan qabul qilib olib olyabman va uni tashqarida ishlatish uchun export qilib olyabman
export const { setTargetBoArticles} = communityPageSlice.actions;


// CommunityPageReducer ni communityPageSlice ichidagi reducer dan qabul qilib olyabman
const CommunityPageReducer = communityPageSlice.reducer;
export default CommunityPageReducer;  // CommunityPageReducer ni export qilib olyabman