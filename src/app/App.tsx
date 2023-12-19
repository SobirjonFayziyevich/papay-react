import React, {useState, useEffect } from 'react';
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import {RestaurantPage} from "./screens/RestaurantPage";
import {CommunityPage} from "./screens/CommunityPage";
import {OrdersPage} from "./screens/OrdersPage";
import {MemberPage} from "./screens/MemberPage";
import {HelpPage} from "./screens/HelpPage";
import {LoginPage} from "./screens/LoginPage";
import {Homepage} from "./screens/Homepage";
import {NavbarHome} from "./components/header";
import {NavbarRestaurant} from "./components/header/restaurant";
import {NavbarOthers} from "./components/header/others";
import {Footer} from "./components/footer";
import Car from './screens/testCar';


// useStateni REACT dan import qilib olamz.
// bizning path imiz uzgarganda viewimizni qayta qurub beradi.
function App () {
    const [path, setPath] = useState();
    const main_path = window.location.pathname;

    // @ts-ignore
    // @ts-ignore
    return (
        <Router>
            {main_path == "/" ? (
                <NavbarHome setPath={setPath} />
            ) : main_path.includes("/restaurant") ? (
                <NavbarRestaurant setPath={setPath} />
            ) : (
                <NavbarOthers setPath={setPath} />
            )}

            {/*buyerdan swich routerlar boshlandi*/}
                  <Switch>
                      <Route path="/restaurant">
                          < RestaurantPage/>
                      </Route>
                      <Route path="/community">
                          < CommunityPage/>
                      </Route>
                      <Route path="/orders">
                          < OrdersPage/>
                      </Route>
                      <Route path="/member-page">
                          < MemberPage />
                      </Route>
                      <Route path="/help">
                          < HelpPage />
                      </Route>
                      <Route path="/login">
                          < LoginPage />
                      </Route>
                      <Route path="/">
                          < Homepage />
                      </Route>
                  </Switch>

            {/*FOOTER SECTION*/}
            <Footer />

        </Router>
    );
}
export default App;

function Home() {
    return <h2>Home</h2>;
}