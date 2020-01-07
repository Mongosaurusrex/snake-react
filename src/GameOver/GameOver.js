import React from 'react';
import './GameOver.css';
import NameInput from './NameInput/NameInput';
class GameOver extends React.Component {
  render() {
    const {score, sendScore, sendScoreStatus} = this.props;
    return (
      <div className="gameover-wrapper">
        <div className="gameover-heading">Too bad!</div>
        <div className="gameover-score">
          Your final score was:
          <span className="score">{score}</span>
        </div>
        <div className="gameover-input">
          Save your score?
          <div className="input-fields">
            <NameInput sendScore={sendScore} status={sendScoreStatus} />
          </div>
        </div>
      </div>
    );
  }
}

export default GameOver;
