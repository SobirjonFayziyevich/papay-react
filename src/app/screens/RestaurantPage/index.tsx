import React from "react";
import {Container} from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { OneRestaurant } from "./oneRestaurant";
import { AllRestaurants } from "./allRestaurants";
import { ChosenDish } from "./chosenDish";
import "../../../css/restaurant.css";

export function RestaurantPage() {
    let restaurant = useRouteMatch();
    console.log(restaurant);
    return (
      <div className="restaurant_page">
          <Switch>
              <Route path={`${restaurant.path}/dish/:dish_id`}>
                  <ChosenDish />
              </Route>                 {/*restaurant objectni ichidan path ni olib dish_id parametrni initilaze qilish usuli. */}
              <Route path={`${restaurant.path}/:restaurant_id`}>
                  <OneRestaurant />
                  </Route>
              <Route path={`${restaurant.path}`}>   {/*pathni uzi bulsa all resta yuborsin*/}
                  <AllRestaurants />
                  </Route>   
          </Switch>
      </div>
    );
}

