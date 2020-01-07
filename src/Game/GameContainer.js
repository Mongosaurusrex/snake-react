import {connect} from 'react-redux';
import Game from './Game';
import {setScore, resetGame} from '../store/Reducers/index';

const mapDispatchToProps = dispatch => {
  return {
    setScore: score => dispatch(setScore(score)),
    resetGame: () => dispatch(resetGame()),
  };
};

export default connect(null, mapDispatchToProps)(Game);
