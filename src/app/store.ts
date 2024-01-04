import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import HomePageReducer from './screens/Homepage/slice';
import reduxLogger from "redux-logger";
import RestaurantPageReducer from './screens/RestaurantPage/slice';
import OrdersPageReducer from './screens/OrdersPage/slice';
import { CommunityPage } from './screens/CommunityPage';
import CommunityPageReducer from './screens/CommunityPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    restaurantPage: RestaurantPageReducer,
    ordersPage: OrdersPageReducer,
    communityPage: CommunityPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
