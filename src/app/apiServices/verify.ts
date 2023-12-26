import Cookie from "universal-cookie";

const cookie = new Cookie();
let member_data: any = null;

if(cookie.get("access_token")) { // cookieni ichida access_token mavjud bulsagina  
    const memberDataJson: any = localStorage.getItem("member_data") 
    ? localStorage.getItem("member_data") 
    : null;
    member_data = memberDataJson ? JSON.parse(memberDataJson) : null; //member_datani qiymatini yangilab olib,

} else {
    localStorage.removeItem(member_data); //boshqa holatda localStorag ichida emoveItem mavjud uni ichidan member_datani delete qilamn.
}
console.log('== verify ==');
console.log(member_data);

export const verifyMemberData = member_data ? member_data : null; //yangilab olingan member_datani verifyMemberDataga tenglashtirib olayopman.
