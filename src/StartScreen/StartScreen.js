import React from "react";
import "./StartScreen.css";
import Actions from "./Actions/Actions";

class StartScreen extends React.Component {
  render() {
    return (
      <div className="start_root">
        <div className="title">SNAKE</div>
        <Actions />
      </div>
    );
  }
}

export default StartScreen;
