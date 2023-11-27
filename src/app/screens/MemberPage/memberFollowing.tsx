import Button from "@mui/material/Button";
import { Avatar, Box } from "@mui/material";
import { Stack } from "@mui/system";



const followings = [
    { mb_nick: "abbos" },
    { mb_nick: "latif"  },
    { mb_nick: "saidamir" },
];

export function MemberFollowing(props: any) {
    return (
       <Stack>
           {followings.map((following) => {
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
                         <span className={"name_text"}>following.mb_nick</span>
                     </div>
                    {props.action_enabled && (
                         <Button
                         variant={"contained"}
                         startIcon={
                               <img 
                               src={"/icons/odamcha.png"}
                               style={{ width: "40px", margin: "16px" }}
                               />
                            }
                            className={"follow_cancel_btn"}
                         >
                            Bekor Qilish
                         </Button>
                         )}
                    </Box>
                );
             })}
       </Stack>
        
    );
}