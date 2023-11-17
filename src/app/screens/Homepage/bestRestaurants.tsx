import React from "react";
import {Box, Button, Container, Stack} from "@mui/material";
import {CssVarsProvider} from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import {AspectRatio, CardOverflow, IconButton, Link} from "@mui/joy";
import CardCover from "@mui/joy/CardCover";
import {Favorite, Visibility} from "@mui/icons-material";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";


export function BestRestaurants() {
    // @ts-ignore
    return (
        <div className="best_restaurant_frame">
            <img src={"icons/kvadrat.svg"}
                 style={{
                     position: "absolute",
                     left: "6%",
                     transform: "rotate(0deg)"
                 }}/>
            <Container sx={{paddingTop: "153px"}}>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Box className="category_title">Zo'r Restaurantlar</Box>

                    <Stack sx={{mt: "43px"}} flexDirection={"row"} alignItems={"center"}
                    >
                        <CssVarsProvider>
                            <Card
                                variant="outlined"
                                sx={{
                                    minHeight: 483,
                                    minWidth: 320,
                                    mr: "35px",
                                }}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/uzbegim.png"} alt=""/>
                                    </AspectRatio>

                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 1,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite
                                            /*@ts-ignore*/
                                            style={{
                                                color: "white",
                                            }}
                                        />
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Uzbegim Halol Food
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="neutral.700"
                                    >
                                        Tashkent, Yakka Saroy 12-5
                                    </Link>
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="neutral.700"
                                    >
                                        +99894 4805313
                                    </Link>
                                </Typography>

                                <CardOverflow
                                    variant="soft"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                        borderColor: "neutral.outlinedBorder",
                                        bgcolor: "background.level1",
                                    }}
                                >
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        100{" "}
                                        <Visibility sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>500</div>
                                        <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                </CardOverflow>
                            </Card>
                            <Card
                                variant="outlined"
                                sx={{
                                    minHeight: 483,
                                    minWidth: 320,
                                    mr: "35px",
                                }}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/uzbegim.png"} alt=""/>
                                    </AspectRatio>

                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 2,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite
                                            /*@ts-ignore*/
                                            style={{
                                                color: "white",
                                            }}
                                        />
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Uzbegim Halol Food
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="neutral.700"
                                    >
                                        Tashkent, Yakka Saroy 12-5
                                    </Link>
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="neutral.700"
                                    >
                                        +99894 4805313
                                    </Link>
                                </Typography>

                                <CardOverflow
                                    variant="soft"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                        borderColor: "neutral.outlinedBorder",
                                        bgcolor: "background.level1",
                                    }}
                                >
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        100{" "}
                                        <Visibility sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>500</div>
                                        <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                </CardOverflow>
                            </Card>
                            <Card
                                variant="outlined"
                                sx={{
                                    minHeight: 483,
                                    minWidth: 320,
                                    mr: "35px",
                                }}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/uzbegim.png"} alt=""/>
                                    </AspectRatio>

                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 2,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite
                                            /*@ts-ignore*/
                                            style={{
                                                color: "white",
                                            }}
                                        />
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Uzbegim Halol Food
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="neutral.700"
                                    >
                                        Tashkent, Yakka Saroy 12-5
                                    </Link>
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="neutral.700"
                                    >
                                        +99894 4805313
                                    </Link>
                                </Typography>

                                <CardOverflow
                                    variant="soft"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                        borderColor: "neutral.outlinedBorder",
                                        bgcolor: "background.level1",
                                    }}
                                >
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        100{" "}
                                        <Visibility sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>500</div>
                                        <Favorite sx={{fontSize: 20, marginLeft: "5px"}}/>
                                    </Typography>
                                </CardOverflow>
                            </Card>
                            <Card
                                variant="outlined"
                                sx={{
                                    minHeight: 483,
                                    minWidth: 320,
                                    mr: "35px",
                                }}
                            >
                                <CardOverflow>
                                    <AspectRatio ratio="1">
                                        <img src={"restaurant/uzbegim.png"} alt=""/>
                                    </AspectRatio>

                                    <IconButton aria-label="Like minimal Photography"
                                                size="md"
                                                variant="solid"
                                                color="neutral"
                                                sx={{
                                                    position: "absolute",
                                                    zIndex: 2,
                                                    borderRadius: "50%",
                                                    right: "1rem",
                                                    bottom: 2,
                                                    transform: "translateY(50%)",
                                                    color: "rgba(0,0,0,.4)",
                                                }}
                                    >
                                        <Favorite
                                            /*@ts-ignore*/
                                            style={{
                                                color: "white",
                                            }}
                                        />
                                    </IconButton>
                                </CardOverflow>
                                <Typography level="h2" sx={{fontSize: "md", mt: 2}}>
                                    Uzbegim Halol Food
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<LocationOnRoundedIcon/>}
                                        textColor="neutral.700"
                                    >
                                        Tashkent, Yakka Saroy 12-5
                                    </Link>
                                </Typography>
                                <Typography level="body-sm" sx={{mt: 0.5, mb: 2}}>
                                    <Link
                                        href=""
                                        startDecorator={<CallIcon/>}
                                        textColor="neutral.700"
                                    >
                                        +99894 4805313
                                    </Link>
                                </Typography>

                                <CardOverflow
                                    variant="soft"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1.5,
                                        py: 1.5,
                                        px: "var(--Card-padding)",
                                        borderTop: "1px solid",
                                        borderColor: "neutral.outlinedBorder",
                                        bgcolor: "background.level1",
                                    }}
                                >
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontSize: "16px",
                                            lineHeight: "1.5",
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        100{" "}
                                        <Visibility sx={{fontSize: 24, marginLeft: "5px"}}/>
                                    </Typography>
                                    <Box sx={{width: 2, bgcolor: "divider"}}/>
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontWeight: "md",
                                            color: "black",
                                            alignItems: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <div>500</div>
                                        <Favorite sx={{fontSize: 24, marginLeft: "5px"}}/>
                                    </Typography>
                                </CardOverflow>
                            </Card>
                        </CssVarsProvider>
                    </Stack>

                    <Stack
                        flexDirection={"row"}
                        justifyContent={"flex-end"}
                        style={{
                            width: "100%",
                            marginTop: "16px"
                        }}>
                        <Button style={{background: "#1976d2", color: "#ffffff"}}
                        >Barchasini ko'rish</Button>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}