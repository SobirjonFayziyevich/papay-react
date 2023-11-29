import React from "react";
import { Box, Link, Stack } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import moment from "moment"

export function TargetArticles(props: any) {
  return (
    <Stack>
      {props.targetBoArticles?.map((articles: any, index: string) => {
        const art_image_url = "/auth/john.jpeg";
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
                  John
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">evaluation</span>
                <p className="all_article_desc">
                  Texas De Brazil zo'r restarant
                </p>
              </Box>
              <Box>
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                >
                  <Box className="article_share_main">
                    <span style={{ marginRight: "35px" }}>23-11-25 23-50</span>
                    <FavoriteBorder />
                    <span style={{ margin: "0px 25px 0px 10px" }}>100</span>
                    <RemoveRedEye />
                    <span style={{ marginLeft: "10px" }}>1000</span>
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