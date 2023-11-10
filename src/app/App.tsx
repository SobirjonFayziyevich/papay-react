import React from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {RestaurantPage} from "./screens/RestaurantPage";
import {CommunityPage} from "./screens/CommunityPage";
import {OrdersPage} from "./screens/OrdersPage";
import {MemberPage} from "./screens/MemberPage";
import {HelpPage} from "./screens/HelpPage";
import {LoginPage} from "./screens/LoginPage";
import {Homepage} from "./screens/Homepage";
function App() {
  return (
      <div>
          <Router>
              <div>
                  {/*buyerdagilar barchasi nav link hisoblanadi.*/}
                  <nav>
                      <ul>
                          <li>
                              <Link to="restaurant">RestaurantPage</Link>
                          </li>
                          <li>
                              <Link to="/community">CommunityPage</Link>
                          </li>
                          <li>
                              <Link to="/orders">OrdersPage</Link>
                          </li>
                          <li>
                              <Link to="/member-page">MemberPage</Link>
                          </li>

                          <li>
                          <Link to="/help">HelpPage</Link>
                          </li>

                          <li>
                          <Link to="/login">LoginPage</Link>
                          </li>

                          <li>
                          <Link to="/">HomePage</Link>
                          </li>

                      </ul>
                  </nav>

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

              </div>
          </Router>
      </div>

  );
}
export default App;

function Home() {
    return <h2>Home</h2>;
}