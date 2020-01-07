import React, {useEffect} from 'react';
import './HighScore.css';

export default props => {
  const {
    status,
    getHighScore,
    highScore,
    history: {goBack},
  } = props;

  useEffect(() => {
    getHighScore();
  }, []);

  return (
    <div className="highscore-root">
      <h2>Highscore:</h2>
      {getBody({status, getHighScore, highScore})}
      <div className="highscore-return" onClick={goBack}>
        Return
      </div>
    </div>
  );
};

const getBody = ({status, getHighScore, highScore}) => {
  if (status === 'done') {
    if(!highScore.length) {
      return <div>No highscore entries :(</div>
    }
    return (
      <div className="highscore-wrapper">
        {highScore.map(entry => (
          <div className="highscore-entry">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </div>
        ))}
      </div>
    );
  } else if (status === 'fail') {
    return <div onClick={getHighScore}>Try again</div>;
  } else {
    return <div className="spinner"></div>;
  }
};
