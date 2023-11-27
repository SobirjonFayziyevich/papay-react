import React from "react";
import {Container} from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { VisitOtherPage } from "./VisitOtherPage";
import { VisitMyPage } from "./VisitMyPage";
import "../../../css/my_page.css";




export function MemberPage() {

    let member = useRouteMatch();
     console.log(member);
    return (
      <div className="restaurant_page">
          <Switch>
              <Route path={`${member.path}/other`}>
                  <VisitOtherPage />        {/*member.pageni 2xil rotingga buldik.VisitOtherPage va VisitMyPage */}

              </Route>                      {/*member objectni ichidan path ni olib VisitMyPage parametriga initilaze qilish usuli. */}
              <Route path={`${member.path}`}>
                  <VisitMyPage />
                  </Route>
             
          </Switch>
      </div>
    );

}