import {createSelector} from "reselect";
import {AppRootState} from "../../../types/screen";

// select ni ichidan community.page ni olib ber deb shart beryabman
const selectCommunityPage = (state: AppRootState) => state.communityPage;
export const retrieveTargetBoArticles = createSelector(
    selectCommunityPage,
    // retrieve qilyotganda CommunityPage ni ichidan targetBoArticles ni qabul qilib olyabmiz
    (CommunityPage) => CommunityPage.targetBoArticles
);