import  Button  from "@mui/material/Button";
import  CloudDownloadIcon  from "@mui/icons-material/CloudDownload";
import { Box, Stack } from "@mui/system";
import "../../../css/my_page.css";
import { useState } from "react";

import { verifiedMemberData } from "../../apiServices/verify";
import { MemberUpdateData } from "../../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

export function MySettings() {
    /** INITIALIZATIONS **/
  const [file, setFile] = useState(verifiedMemberData?.mb_image); // usestate hook orqali verifiedMemberData?   file ochib olib bu fileni 
  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_address: "",
    mb_description: "",
    mb_image: "",
  });

//** HANDLERS**//
const changeMemberNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  
  const changeMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  
  const changeMemberAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  
  const changeMemberDescriptionHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  
  const handleImagePreviewer = (e: any) => {
    try {
      const file = e.target.files[0];
  
      const file_type = file["type"],
        valid_types = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
      assert.ok(valid_types.includes(file_type) && file, Definer.input_err2);
  
      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err: any) {
      console.log(`ERROR::: handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };
    
  const handleSubmitButton = async () => {
    try {
      const memberService = new MemberApiService();
      console.log("memberUpdate:", memberUpdate);
      const result = await memberService.updateMemberData(memberUpdate);
  
      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR::: handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  }; 
  return(
        <Stack className={"my_settings_page"}>
            <Box className={"member_media_frame"}>
                <img
                    src={file} alt=""
                    className={"mb_image"}
                    style={{ borderRadius: "50%",  }}
                    width={"100px"}
                    height={"100px"}
                />
                <div className={"media_change_box"}>
                    <span>Rasm Yuklash</span>
                    <p>JPG, JPEG, PNG rasmlarini yuklay olasiz!</p>
                    <Box className={"up_del_box"}>
                        <Button component="label" style={{ minWidth: "0", height: "25px" }}
                        onChange={handleImagePreviewer}>
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
                        placeholder={verifiedMemberData?.mb_nick}
                        name="mb_nick"
                        onChange={changeMemberNickHandler}
                    />
                </div>
            </Box>
            <Box className={"input_frame"}>
                <div className={"short_input"}>
                    <label className={"spec_label"}>Telefon Raqam</label>
                    <input
                        className={"spec_input_mb_phone"}
                        type={"text"}
                        placeholder={verifiedMemberData?.mb_phone}
                        name="mb_phone"
                        onChange={changeMemberPhoneHandler}
                    />
                </div>
                <div className={"short_input"}>
                    <label className={"spec_label"}>Manzil</label>
                    <input
                        className={"spec_input_mb_address"}
                        type={"text"}
                        placeholder={ verifiedMemberData?.mb_address ?? "manzil kiritilmagan"}
                        name="mb_address"
                        onChange={changeMemberAddressHandler}
                    />
                </div>
            </Box>
            <Box className={"input_frame"}>
                <div className={"long_input"}>
                    <label className={"spec_label"}>Ma'lumot</label>
                    <textarea
                        className={"spec_textarea_mb_description"}
                        placeholder={verifiedMemberData.mb_description ?? "mavjud emas"}
                        name="mb_description"
                        onChange={changeMemberDescriptionHandler}
                    />
                </div>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
                <Button variant="contained" onClick={handleSubmitButton}>
                    Saqlash
                </Button>
            </Box>
        </Stack>
    );
}