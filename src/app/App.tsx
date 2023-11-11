import React, {useState} from 'react';
import '../css/App.css';
import '../css/navbar.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
function App() {                                                       // useStateni REACT dan import qilib olamz.
     const [path, setPath] = useState();  // bizning path imiz uzgarganda viewimizni qayta qurub beradi.
    const main_path = window.location.pathname;
    // console.log("main_path:", main_path);

  return (
      <Router>
              {main_path == "/" ? (
                  <NavbarHome setPath={setPath}/>
              ) : main_path.includes("/restaurant") ? (
                  <NavbarRestaurant setPath={setPath}/>
                  ) : (
                      <NavbarOthers setPath={setPath}/>
                  )}

                  {/*/!*buyerdagilar barchasi nav link hisoblanadi.*!/*/}
                  {/*<nav>*/}
                  {/*    <ul>*/}
                  {/*        <li>*/}
                  {/*            <Link to="restaurant">RestaurantPage</Link>*/}
                  {/*        </li>*/}
                  {/*        <li>*/}
                  {/*            <Link to="/community">CommunityPage</Link>*/}
                  {/*        </li>*/}
                  {/*        <li>*/}
                  {/*            <Link to="/orders">OrdersPage</Link>*/}
                  {/*        </li>*/}
                  {/*        <li>*/}
                  {/*            <Link to="/member-page">MemberPage</Link>*/}
                  {/*        </li>*/}

                  {/*        <li>*/}
                  {/*        <Link to="/help">HelpPage</Link>*/}
                  {/*        </li>*/}

                  {/*        <li>*/}
                  {/*        <Link to="/login">LoginPage</Link>*/}
                  {/*        </li>*/}

                  {/*        <li>*/}
                  {/*        <Link to="/">HomePage</Link>*/}
                  {/*        </li>*/}

                  {/*    </ul>*/}
                  {/*</nav>*/}

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
      </Router>


  );
}
export default App;

function Home() {
    return <h2>Home</h2>;
}