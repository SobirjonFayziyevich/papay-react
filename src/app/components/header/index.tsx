import React from 'react';
import { Box, Button, Container, IconButton, ListItemIcon, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useState , useEffect } from "react";
import { set } from 'immer/dist/internal';
import { Menu, MenuItem } from '@mui/material';
import { Logout } from '@mui/icons-material';






export function NavbarHome(props: any) {
    
    /** INITIALIZATIONS **/
   const [count, setCount] =  useState(0);
   const [value, setValue] =  useState(true);
   //setCount countni qiymatini uzgartiraoladigan method.

   useEffect(() => {
     setCount(count + 1);

   }, [value]); // useStatening array dependenceni pustoy bulganida faqat 1tagina qiymatni oladi.
   // agarda arrayning ichiga qiymat kiritilsa, va shu valuening soni ortib borishi bn arrayning ham qiymati oshib boradi.

   
return (
      <div className="format home_navbar">
      <Container>
          <Stack
              flexDirection={"row"}
              className="navbar_config"
              justifyContent={"space-between"}
          >
          <Box>
              <img src='/icons/Papay..svg'/>
          </Box>
              <Stack
                  flexDirection={"row"}
                  justifyContent="space-evenly"
                  alignItems={"center"}
                  className="navbar_links"
              >
                  <Box className="hover-line" onClick={props.setPath}>
                     <NavLink to="/" activeClassName="underline">
                         Bosh Sahifa
                     </NavLink>
                  </Box>

                  <Box className="hover-line" onClick={props.setPath}>
                      <NavLink to="/restaurant" activeClassName="underline">
                          Oshxona
                      </NavLink>
                  </Box>

                  <Box className="hover-line" onClick={props.setPath}>
                      <NavLink to="/orders" activeClassName="underline">
                          Buyurtma
                      </NavLink>
                  </Box>

                  <Box className="hover-line" onClick={props.setPath}>
                      <NavLink to="/community" activeClassName="underline">
                          Jamiyat
                      </NavLink>
                  </Box>

                  {props.verifiedMemberData ? (
                   <Box className="hover-line" onClick={props.setPath}>
                   <NavLink to="/member-page" activeClassName="underline">
                       Sahifam
                   </NavLink>
               </Box>
                  ) : null }

                  <Box className="hover-line" onClick={props.setPath}>
                      <NavLink to="/help" activeClassName="underline">
                          Yordam
                      </NavLink>
                  </Box>

                  <Box className="hover-line">
                      <IconButton
                          aria-label="cart"
                          id="basic-button"
                          aria-controls={undefined}
                          aria-haspopup="true"
                          aria-expanded={undefined}
                      >
                          <Badge badgeContent={3} color="secondary">
                              <img src={'/icons/shopping-cart.png'}/>
                          </Badge>
                      </IconButton>
                  </Box>

                    {!props.verifiedMemberData ? (
                   <Box>
                      <Button
                          variant="contained"
                          style={{color: "#FFFFFF",background: "#1976d2"}}
                          onClick={props.handleLoginOpen}
                      >
                          KIRISH
                      </Button>
                  </Box>
                ) : (
                  <img style={{width: '48px', height: '48px', borderRadius: '24px'}} 
                  src={props.verifiedMemberData.mb_image}
                  onClick={props.handleLogOutClick}
                  />
                )}

               <Menu
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={props.handleCloseLogOut}
                onClick={props.handleCloseLogOut}
                slotProps={{
                  // Use slotProps instead of PaperProps
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                      }
                    }
                  }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem onClick={props.handleLogOutRequest}> 
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "blue" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
                
              </Stack>
          </Stack>

          <Stack className="head_information" justifyContent={"row"}>

              <Stack
                  justifyContent={'column'}
                  style={{ marginTop: "86px", marginLeft: "24px" }}>
                  <Box>
                      <img src="/icons/welscome.svg" />
                  </Box>

                  <Box className="define_restaurant">
                      The Authentic Restaurant & Cafe
                  </Box>

                  <Box className="timeline_service">
                      {/* {count} soat xizmatinggizdamiz. */}
                      24 soat xizmatinggizdamiz.
                  </Box>
                  <Box sx={{mt: "90px"}}>
                      {!props.verifiedMemberData ? (
                       <Button
                       variant="contained"
                       style={{width: "210px",
                           height: "60px",
                           background: "#1976d2",
                           color: "#FFFFF",
                         }}
                          onClick={props.handleSignUpOpen}
                        >
                       RO'YXATDAN O'TISH
                       </Button>
                      ) : null}
                      
                  </Box>
                  </Stack>
              <Stack flexDirection={'column'}>
                  <Box className="big_img"></Box>

              </Stack>

          </Stack>
      </Container>
  </div>
    );
}

function initialState(initialState: any): [any, any] {
    throw new Error('Function not implemented.');
}

