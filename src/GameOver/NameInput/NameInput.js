import React, {useState} from 'react';
import './NameInput.css';
import {Link} from 'react-router-dom';

export default props => {
  const [name, setName] = useState('AL');
  const {status, sendScore} = props;

  const handleClick = () => sendScore({name});
  const handleChange = e => {
    const {value} = e.target;
    setName(value);
  };
  const getButton = () => {
    if (status === 'done') {
      return (
        <div className="done">
          &#128077;
          <Link className="try-again" to="/start">
            Try again?
          </Link>
          <Link to="/highscore">Highscore</Link>
        </div>
      );
    } else if (status === 'fail') {
      return (
        <div className="confirm" onClick={handleClick}>
          (try again)
        </div>
      );
    } else if (status === 'pending') {
      return <div className="loader"></div>;
    } else {
      return (
        <div className="confirm" onClick={handleClick}>
          --->
        </div>
      );
    }
  };

  return (
    <div className="input-text-wrapper">
      {status !== 'done' ? (
        <div className="inputText">
          <input maxlength="3" onChange={handleChange} />
        </div>
      ) : null}
      {getButton()}
    </div>
  );
};
