import  Button  from "@mui/material/Button";
import  CloudDownloadIcon  from "@mui/icons-material/CloudDownload";
import { Box, Stack } from "@mui/system";
import "../../../css/my_page.css";





export function MySettings(props: any) {
    return(
        <Stack className={"my_settings_page"}>
            <Box className={"member_media_frame"}>
                <img
                    src={"/icons/uzgartirish.svg"}
                    className={"mb_image"}
                    style={{ borderRadius: "50%",  }}
                    width={"100px"}
                    height={"100px"}
                />
                <div className={"media_change_box"}>
                    <span>Rasm Yuklash</span>
                    <p>JPG, JPEG, PNG rasmlarini yuklay olasiz!</p>
                    <Box className={"up_del_box"}>
                        <Button component="label" style={{ minWidth: "0", height: "25px" }}>
                            <CloudDownloadIcon />
                            <input type="file" hidden />
                        </Button>
                    </Box>
                </div>
            </Box>
            <Box className={"input_frame"}>
                <div className={"long_input"}>
                    <label className={"spec_label"}>Ism</label>
                    <input
                        className={"spec_input_mb_nick"}
                        type={"text"}
                        placeholder="john"
                        name="mb_nick"
                    />
                </div>
            </Box>
            <Box className={"input_frame"}>
                <div className={"short_input"}>
                    <label className={"spec_label"}>Telefon Raqam</label>
                    <input
                        className={"spec_input_mb_phone"}
                        type={"text"}
                        placeholder={"99894 400 00 04"}
                        name="mb_phone"
                    />
                </div>
                <div className={"short_input"}>
                    <label className={"spec_label"}>Manzil</label>
                    <input
                        className={"spec_input_mb_address"}
                        type={"text"}
                        placeholder={"Tashkent, Yunus Abad 11-1"}
                        name="mb_address"
                    />
                </div>
            </Box>
            <Box className={"input_frame"}>
                <div className={"long_input"}>
                    <label className={"spec_label"}>Ma'lumot</label>
                    <textarea
                        className={"spec_textarea_mb_description"}
                        placeholder={"ba'tafsil ma'lumot kiriting"}
                        name="mb_description"
                    />
                </div>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
                <Button variant={"contained"}>Saqlash</Button>
            </Box>
        </Stack>
    );
}