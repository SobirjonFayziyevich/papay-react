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
import AuthenticationModel from "./components/auth";


// useStateni REACT dan import qilib olamz.
// bizning path imiz uzgarganda viewimizni qayta qurub beradi.
function App () {
    /** INITIALIZATIONS */
    const [path, setPath] = useState();
    const main_path = window.location.pathname;
    const [signUpOpen, setSignUpOpen] = useState(false); // signUpOpen ni qiymati false bulgani un shu qiymatni pass qildim.
    const [loginOpen, setLoginOpen] = useState(false);

    /** HANDLERS */
    const handleSignUpOpen = () => setSignUpOpen(true); //setSignUpOpen true bulganda faqat signup ishga tushishi kerak.
    
    const handleSignUpClose = () => setSignUpOpen(false);
    
    const handleLoginOpen = () => setLoginOpen(true);
       
    const handleLoginClose = () => setLoginOpen(false);
    


    // @ts-ignore
    // @ts-ignore
    return (
        <Router>
            {main_path == "/" ? (
                <NavbarHome setPath={setPath} 
                handleLoginOpen={handleLoginOpen} // buyerdagi vazifalari login va signupni bosganda sahifani ochib beradi.
                handleSignUpOpen={ handleSignUpOpen}
                />
            ) : main_path.includes("/restaurant") ? (
                <NavbarRestaurant setPath={setPath} 
                handleLoginOpen={handleLoginOpen}
                handleSignUpOpen={ handleSignUpOpen}
                />
            ) : (
                <NavbarOthers setPath={setPath} 
                handleLoginOpen={handleLoginOpen}
                handleSignUpOpen={ handleSignUpOpen}
                />
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
            <AuthenticationModel 
              loginOpen={loginOpen}
              handleLoginOpen={handleLoginOpen}
              handleLoginClose={handleLoginClose}
              signUpOpen={signUpOpen}
              handleSignUpOpen={handleSignUpOpen}
              handleSignUpClose={handleSignUpClose}
            />

        </Router>
    );
}
export default App;

// function Home() {
//     return <h2>Home</h2>;
// }