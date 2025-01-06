import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import HomePageReducer from './screens/Homepage/slice';

import RestaurantPageReducer from './screens/RestaurantPage/slice';
import OrdersPageReducer from './screens/OrdersPage/slice';
import { CommunityPage } from './screens/CommunityPage';
import CommunityPageReducer from './screens/CommunityPage/slice';
import MemberPageRaducer from './screens/MemberPage/slice';
import reduxLogger from 'redux-logger';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  reducer: {
    homePage: HomePageReducer,
    restaurantPage: RestaurantPageReducer,
    ordersPage: OrdersPageReducer,
    communityPage: CommunityPageReducer,
    memberPage: MemberPageRaducer
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
