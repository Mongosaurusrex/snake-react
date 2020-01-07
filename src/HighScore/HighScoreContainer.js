import React from 'react';
import {connect} from 'react-redux';
import {getHighScore} from '../store/Reducers/';
import HighScore from './HighScore';

const mapStateToProps = state => {
  return {
    highScore: state.highScore,
    status: state.getHighScore,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getHighScore: () => dispatch(getHighScore()),
  };
};

const HighScoreContainer = props => {
  return <HighScore {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(HighScoreContainer);
