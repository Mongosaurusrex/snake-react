import React from 'react';
import './Actions.css';
import {Link} from 'react-router-dom';

class Actions extends React.Component {
  render() {
    return (
      <div className="actions-root">
        <Link to="/start">
          <div className="start_game">Press here to start</div>
        </Link>
        <Link to="/highscore">
          Highscore
        </Link>
      </div>
    );
  }
}

export default Actions;
