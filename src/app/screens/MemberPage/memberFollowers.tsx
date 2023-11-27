
import { Button } from "@mui/material";
import { Avatar, Box } from "@mui/material";
import { Stack } from "@mui/system";




const followers = [
    { mb_nick: "usman", following: true },
    { mb_nick: "alen", following: false },
    { mb_nick: "alex", following: true },
];

export function MemberFollowers(props: any) {
    return (
       <Stack>
           {followers.map((follower) => {
               const image_url = "/auth/odamcha.png";
               return (
                 <Box className={"follow_box"}>
                     <Avatar alt={""} src={image_url} sx={{ width: 89, height: 89 }} />
                     <div 
                     style={{
                         width: "400px",
                         display: "flex",
                         flexDirection: "column",
                         marginLeft: "25px",
                         height: "85%",
                     }}
                      >
                         <span className={"username_text"}>USER</span>
                         <span className={"name_text"}>follower.mb_nick</span>
                     </div>
                    {props.action_enabled &&     
                     (follower.following ? (
                         <Button
                           variant={"contained"}
                           className={"following_already"}
                           disabled
                         >
                             FOLLOWING
                         </Button>
                     ) : (
                         <Button
                           variant={"contained"}
                           startIcon={
                             <img
                             src={"icons/following.svg"}
                             style={{ width: "40px" }}
                             />
                         }
                         className={"follow_btn"}
                         >
                             Follow Back
                             </Button>
                            ))}
                        </Box>
                    );
             })}
       </Stack>
        
    );
}