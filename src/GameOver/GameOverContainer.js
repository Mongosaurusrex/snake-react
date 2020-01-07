import GameOver from './GameOver';
import {connect} from 'react-redux';
import {sendScore} from '../store/Reducers/';

const mapStateToProps = state => {
  return {
    score: state.score,
    sendScoreStatus: state.sendScore,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendScore: ({name}) => dispatch(sendScore({name})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
