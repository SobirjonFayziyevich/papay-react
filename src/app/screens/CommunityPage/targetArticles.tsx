import React from "react";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import { FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import moment from "moment"
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import  assert  from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";

export function TargetArticles(props: any) {
  const { setArticlesRebuild} = props;

  /**HANDLERS */
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem('member_data'), Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result: any = await memberService.memberLikeTarget({
        like_ref_id: e.target.id, 
        group_type: 'community',
      });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert('success', 700, false);
      props.setArticlesRebuild(new Date());


    } catch(err: any) {
      console.log("targetLikeHandler, ERROR:", err);
      sweetErrorHandling(err).then();
   }
};

  return (
    <Stack>
      {props.targetBoArticles?.map((articles: BoArticle) => {
        const art_image_url = articles?.art_image ? `${serverApi}/${articles.art_image}` : "/auth/john.jpeg";
        return (
          <Link
            className="all_article_box"
            sx={{ textDecoration: "none" }}
            href={``}
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${art_image_url})` }}
            ></Box>
            <Box className="all_article_container">
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src="/auth/default_img.png"
                  alt=""
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span
                  className="all_article_auth_user"
                  style={{ marginLeft: "10px" }}
                >
                  {articles?.member_data.mb_nick}
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">{articles?.bo_id}</span>
                <p className="all_article_desc">
                    {articles?.art_subject}
                </p>
              </Box>
              <Box>
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                  sx={{ mb: '10px' }}
                >
                  <Box className="article_share_main"
                  style={{
                    color: "#fff",
                    marginLeft: '150px',
                    display: 'flex',
                    alignItems: "center",
                  }}  
                 >
                    <span>{moment().format("YY-MM-DD HH:mm")}</span>
                    <Checkbox
                    sx={{ ml: "40px" }}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id={articles?._id} 
                    onClick={targetLikeHandler}
                    checked={
                      articles?.me_liked && articles.me_liked[0]?.my_favorite 
                      ? true
                      : false
                    }
                   />                    
                    <span style={{ marginRight: "18px" }}>{articles?.art_likes}</span>
                    <RemoveRedEye />
                    <span style={{ marginLeft: "18px" }}>{articles?.art_views}</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}