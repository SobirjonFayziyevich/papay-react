import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState {  // app dagi barcha interfacelarni integratsiya iqlayopman.
    homePage: HomePageState;  // homepage => homepage typedan iborat;
}

// Homepage ichida kerakli data => typelar tashkillshtirib oldim.
export interface  HomePageState { //  homepageimning interfaceni hosil qilib oldim.
   topRestaurants: Restaurant[];  // type restaurant bulgan arraylardan iborat.
   bestRestaurants: Restaurant[];
   trendProducts: Product[];
   bestBoArticles: BoArticle[];
   trendBoArticles: BoArticle[];
   newsBoArticles: BoArticle[];
}

