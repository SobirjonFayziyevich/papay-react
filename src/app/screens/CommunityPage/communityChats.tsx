import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import "../../../css/community.css";
import { SocketContext } from "../../context/socket";

export function CommunityChats() {
  /** INITIALIZATIONS **/
   const [massagesList, setMassagesList] = useState([]);
   const socket = useContext(SocketContext);
   const [onlineUsers, setOnlineUsers] = useState<number>(0);


  useEffect(() => {
    socket.connect(); // buyrda socket bn connect qilib olamiz
    console.log("********** PRINTED");  
    
    socket?.on("connect", function () {});
    console.log("CLIENT>>> connected");

    socket?.on("newMsg", (new_message: any) => { // new msg qabul qilsin.
      console.log("CLIENT: new message");
      alert(new_message);
    });

    socket?.on("greetMsg", (new_message: any) => {
      console.log("CLIENT>>> greet message");
    });

    socket?.on('infoMsg', (msg: any) => { // sms nomi kiritib oldim.
      console.log("CLIENT: info messag");
      setOnlineUsers(msg.total);   // kirib kelgan xabarni olamiz u msg ichidagi totalda buladi
    });  

    return () => {
      socket.disconnect(); // harbir pagega utganimda page yopilishi kerak.
    };  
  }, [socket]); //va connnect bulgan socket bu yerga keladi.

  return (
    <Stack className="chat_frame">
      <Box className="chat_top">Jonli Muloqot {onlineUsers} </Box>
      <Box className="chat_content">
        <Stack className="chat_main">
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <div className="msg_left">Bu yerda jonli muloqot</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            sx={{ m: "10px 0px" }}
          >
            <div className="msg_right">Bu sizning habaringiz</div>
          </Box>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <Avatar alt="John" src="/auth/john.png"/>
            <div className="msg_left">Bu yerda boshqalarni habarlari</div>
          </Box>
        </Stack>
      </Box>
      <Box className="chat_bott"> 
        <input
          type="text"
          name="message"
          className="msg_input"
          placeholder="Xabar jo'natish"
        />
        <button className="send_msg_btn">{/*checke*/}
          <Send style={{ color: "red" }} />
        </button>
      </Box>
    </Stack>
  );
}