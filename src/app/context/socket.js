import React, {createContext} from "react";
import io from "socket.io-client";  // men hohlagan joyda ishga tushishini istayman shuni un shu holatda yozib oldim.
// import socketio from "socket.io-client"; // bu holatda yozsam harbir pagega borsam avtomatik socket.io ishga tushishi un. 
import { serverApi } from "../../lib/config";

// export const socket = socketio.connect(serverApi); // bu holatda yozsam harbir pageda socket.io ishga tushishi lozim
export const socket = io(serverApi);
export const SocketContext = createContext();
