import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Game/GameContainer";
import GameOver from "./GameOver/GameOverContainer";
import StartScreen from "./StartScreen/StartScreen";
import HighScore from "./HighScore/HighScoreContainer";

class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <div className="snake-container">
          <div className="grid">
            <Router> 
              <Switch>
                <Route path="/start" component={Game} />
                <Route path="/gameover" component={GameOver} />
                <Route path="/highscore" component={HighScore} />
                <Route path="/" component={StartScreen} />
              </Switch>
            </Router>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
