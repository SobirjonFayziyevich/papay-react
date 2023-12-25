import React from 'react';
import {Box, Button, Container, IconButton, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Badge from "@mui/material/Badge";
export function NavbarOthers(props: any) {
    return (
        <div className="format_others home_navbar">
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
                            <NavLink to="/">Bosh Sahifa</NavLink>
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
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="underline">
                                Yordam
                            </NavLink>
                        </Box>

                        <Box className="hover-line" onClick={props.setPath}>
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

                        <Box>
                            <Button
                                variant="contained"
                                style={{color: "#FFFFFF",background: "#1976d2"}}
                                onClick={props.handleLoginOpen}
                            >
                                KIRISH
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}

