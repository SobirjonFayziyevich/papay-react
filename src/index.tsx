import React from 'react';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './css/index.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/MaterialTheme';

import {SocketContext, socket} from './app/context/socket';

// biz kuplab pagelarda useEffectni 2martadan ishlatib keldik bu socket.io bn ishlashda noqulaylik tugdiradi.
//shuni un rootni urniga biz ReactDOM dan foydalansak ancha qulaylik olib keladi.
 ReactDOM.render(                
   <React.StrictMode>   
     <Provider store={store}>  {/*buni manosi APP ning ixtiyoriy qismidan Redux iishga tushadi. */}
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SocketContext.Provider value={socket}> {/* Socketni ixtiyoriy componenti hosil bulishi un */}
               <App />  {/*enid socket.io objectimiz Appning ixtiyoriy qismida buladi.*/}
            </SocketContext.Provider>       {/* Socketni ixtiyoriy componenti hosil bulishi un */}
        </ThemeProvider>
    </Provider>  {/*buni manosi APP ning ixtiyoriy qismidan Redux iishga tushadi. */}
  </React.StrictMode>,
  document.getElementById('root')
);

// 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
