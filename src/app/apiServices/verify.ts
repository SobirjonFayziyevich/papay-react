import Cookies from "universal-cookie";
import { serverApi } from "../../lib/config";

const cookies = new Cookies();
let member_data: any = null;

if(cookies.get("access_token")) { // cookieni ichida access_token mavjud bulsagina  
    const memberDataJson: any = localStorage.getItem("member_data") 
    ? localStorage.getItem("member_data") 
    : null;
    member_data = memberDataJson ? JSON.parse(memberDataJson) : null; //member_datani qiymatini yangilab olib,

    if(member_data) {
        member_data.mb_image = member_data.mb_image  //memeber_datani ichidagi mb_imageni check qildim. agar image mavjud bulsa ,
        ? `${serverApi}/${member_data.mb_image}` // quydagicha linkni hosil qilib oldim
        : "/auth/papaychik.svg"; // agar mavjud bulmasa, quydagicha bulsin,
    } 

} else {
    
    localStorage.removeItem("member_data"); //boshqa holatda localStorag ichida emoveItem mavjud uni ichidan member_datani delete qilamn.
}
console.log('== verify ==');
console.log(member_data);

export const verifiedMemberData = member_data ? member_data : null; //yangilab olingan member_datani verifyMemberDataga tenglashtirib olayopman.
// buyerdan malumotn tugridan tugri olamiz.