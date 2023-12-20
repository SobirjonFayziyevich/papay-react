// @ts-nocheck
import React, { useState, Component } from "react";


class Car extends Component {
    constructor(props) {
      super(props);
      this.state = {
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
      };
    }
    changeColor = () => {
      this.setState({color: "blue"});
    };
     // lifecycle hook methods on React:
     componentDidMount() {
         console.log("ran componentDidMount");
      // runs after first render = RETRIEVE DATA FROM BACKEND SERVER==Backend Serverdan datalarni chaqirib olish. 
     }

     componentWillUnmount() {
        console.log("ran componentWillUnMount");
       // runs after component unmount == component yashirina yotgan payt ishga tushadi.
     } 
       
    componentDidUpdate() {

     }; // manshu 3 xil lifecycle methodini vazifani bitta useaffect methodi amalga oshiradi. 


    render() {
      return (
        <div>
          <h1>My {this.state.brand}</h1>
          <p>
            It is a {this.state.color}
            {this.state.model}
            from {this.state.year}.
          </p>
          <button
            type="button"
            onClick={this.changeColor}
          >Change color</button>
        </div>
      );
    }
  }

  export default Car;