import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";
import "../../../css/my_page.css";

function useQuery() {
  const { search } = useLocation(); // searchni useLOcationdan qabul qlib olayopman.
  return React.useMemo(() => new URLSearchParams(search), [search]); // buyerda tuliq Query syntax bulayopti...
}

export function MemberPage(props: any) {
  
  let member = useRouteMatch();
  console.log(member);

  const query = useQuery();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;

  console.log("QUERY mb_id:::", query.get("mb_id"));
  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${member.path}/other`}>
          <VisitOtherPage
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>{" "}
        {/*member objectni ichidan path ni olib VisitMyPage parametriga initilaze qilish usuli. */}
        <Route path={`${member.path}`}>
          <VisitMyPage />
        </Route>
      </Switch>
    </div>
  );
}
