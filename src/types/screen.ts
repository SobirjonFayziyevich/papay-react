import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";
import { Order } from "./order";

/** REACT APP STATE */
export interface AppRootState {  // app dagi barcha interfacelarni integratsiya iqlayopman.
    homePage: HomePageState;  // homepage => homepage typedan iborat;
    restaurantPage: RestaurantPageState;
    ordersPage: OrdersPageState;
    communityPage: CommunityPageState;
    
      
}


/** HOMEPAGE */
// Homepage ichida kerakli data => typelar tashkillshtirib oldim.
export interface  HomePageState { //  homepageimning interfaceni hosil qilib oldim.
   topRestaurants: Restaurant[];  
   bestRestaurants: Restaurant[];
   trendProducts: Product[];
   bestBoArticles: BoArticle[];
   trendBoArticles: BoArticle[];
   newsBoArticles: BoArticle[];
}

/** RESTAURANT PAGE */
export interface  RestaurantPageState {
    targetRestaurants: Restaurant[]; //restaurant interfacedan iborat array.
    randomRestaurants: Restaurant[];
    chosenRestaurant: Restaurant | null;
    targetProducts: Product[];
    chosenProduct: Product | null;

}


// ORDERS PAGE//
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}
/** COMMUNITY PAGE */
export interface CommunityPageState {
    targetBoArticles: BoArticle[];
}
