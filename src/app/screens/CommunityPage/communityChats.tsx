import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, Box, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import "../../../css/community.css";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMsg } from "../../../types/others";
import { verifiedMemberData } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { RippleBadge } from "../../MaterialTheme/styled";

//ARRAY function ochdim
const NewMessage = (data: any) => {
  if (data.new_message.mb_id == verifiedMemberData?._id) {
    //vue qurib oldim.
    //datani ichidan new_messageni qurib olaman va messageni ichida mb_id bulishi shart.
    return (
      // buyerdan MSg qismini qurib oldim.
      <Box 
         flexDirection={"row"}
         style={{ display: "flex"}}
         alignItems={"flex-end"}
         justifyContent={"flex-end"}
         sx={{ m: "10px 0px"}}>
        <div className={"msg_right"}>{data.new_message.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box className={"msg_left_box"}>
        <Avatar
          alt={data.new_message.mb_nick}
          src={data.new_message.mb_image}
        />
        <div className={"msg_left"}>{data.new_message.msg}</div>
      </Box>
    );
  }
};

export function CommunityChats() {
  /** INITIALIZATIONS **/
  const [messageList, setMessageList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);  // usereffni qiymatini null
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    console.log("CLIENT>>> connected");
    socket.connect(); // buyrda socket bn connect qilib olamiz
    console.log("********** PRINTED");

    socket?.on("connect", function () {});
    console.log("CLIENT>>> connected");

    socket?.on("newMsg", (new_message: ChatMsg) => {
      // new msg qabul qilsin.
      console.log("CLIENT: new message");
      // alert(new_message);
      messageList.push(
        //@ts-ignore
        <NewMessage new_message={new_message} key={messageList.length} />
      );
      setMessageList([...messageList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      // kirib kelayotgan xabar.
      // console.log("CLIENT>>> greet message");
      messageList.push(
        //@ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {/* msg ichidan textni olib, authentiket bulgan user yoki mehmon ni xabari */}
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessageList([...messageList]);
    });

    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      // sms nomi kiritib oldim.
      console.log("CLIENT: info messag");
      setOnlineUsers(msg.total); // kirib kelgan xabarni olamiz u msg ichidagi totalda buladi
    });

    return () => {
      socket.disconnect(); // harbir pagega utganimda page yopilishi kerak.
    };
  }, [socket]); //va connnect bulgan socket bu yerga keladi.

  /** HANDLERS */   // xabar yuborish 
  const getInputMsgHandler = useCallback((e: any) => { // bizga eventni olib beradi.
      const text = e.target.value; // textni qiymati tendg buladi trget valuega
      setMessage(text); //messageni saqlagan holda 
    },[message]);

  const getKeyHandler = (e: any) => { // e      
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err: any) {
      console.log("ERROR >>> getKeyHandler ", err);
      sweetErrorHandling(err).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberData) {  //verifiedMemberData mavjud bulmasa
        textInput.current.value = "";
        sweetFailureProvider("Please login first", true);
        return false;
      }

      textInput.current.value = "";
      assert.ok(message, Definer.input_err3); // messageni bush emaslgini tekshirdim.
       // mb_imageni qabul qilish
      const mb_image_url = verifiedMemberData?.mb_image ?? "/auth/default_user.svg";

      socket.emit("createMsg", { // emit useEffectda bulishi shart emas emit orqali xabar yubormoqdamiz.
        msg: message,
        mb_id: verifiedMemberData?._id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");

      // clean input => send msg to socket
    } catch (err: any) {
      console.log("ERROR >>> onClickHandler ", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="chat_frame">
      <Box className="chat_top">
        <div>Jonli Muloqot</div>
        <RippleBadge style={{margin: "-30px 0 0 20px"}} badgeContent={onlineUsers} />
        </Box>

      <Box className="chat_content">
        <Stack className="chat_main">
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <div className="msg_left">Bu yerda jonli muloqot</div>
          </Box>
          {messageList}
        </Stack>
      </Box>
      <Box className="chat_bott">
        <input
          ref={textInput}
          type="text"
          name="message"
          className="msg_input"
          placeholder="Xabar jo'natish"
          onChange={getInputMsgHandler}
          onKeyDown={getKeyHandler} 
        />
        <button className="send_msg_btn" 
        onClick={onClickHandler}>
          {/*checke*/}
          <Send style={{ color: "red" }} />
        </button>
      </Box>
    </Stack>
  );
}
