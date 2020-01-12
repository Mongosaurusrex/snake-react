import React from 'react';
import classNames from 'classnames';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.rows = 10;
    this.cols = 10;
    this.scoreFactor = 10;

    const isMobile =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i);

    this.state = {
      rows: this.rows,
      cols: this.cols,
      isMobile,
    };
    props.resetGame();

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  gameLoop = () => {
    const {
      snake: {head},
      cols,
      rows,
    } = this.state;

    switch (head.direction) {
      case 'left':
        head.col--;
        if (head.col < 0) {
          head.col = cols - 1;
        }
        break;
      case 'up':
        head.row--;
        if (head.row < 0) {
          head.row = rows - 1;
        }
        break;
      case 'down':
        head.row++;
        if (head.row > rows - 1) {
          head.row = 0;
        }
        break;
      case 'right':
      default:
        head.col++;
        if (head.col > cols - 1) {
          head.col = 0;
        }
        break;
    }

    this.drawGrid();
  };

  get randomGrid() {
    return {
      row: Math.floor(Math.random() * this.state.rows),
      col: Math.floor(Math.random() * this.state.cols),
    };
  }

  componentWillUnmount() {
    clearInterval(this.tick);
    this.removeKeyHandler();
  }

  drawGrid() {
    let {
      snake: {tail = [this.randomGrid], head = this.randomGrid} = {},
      food = this.randomGrid,
      score = 0,
    } = this.state;

    tail.unshift({
      row: head.row,
      col: head.col,
    });

    if (head.col === food.col && head.row === food.row) {
      food = this.randomGrid;
      score += tail.length * this.scoreFactor;
      this.props.setScore(score);
    } else {
      tail.pop();
    }

    const grid = [];
    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.cols; col++) {
        const isFood = food.row === row && food.col === col;
        const isSnake =
          (head.row === row && head.col === col) ||
          tail.find(s => s.row === row && s.col === col);
        grid.push({
          row,
          col,
          isFood,
          isSnake,
        });
      }
    }

    if (tail.length > 1) {
      const testPart = tail.slice(1, tail.length);
      if (
        testPart.some(
          tailItem => tailItem.row === head.row && tailItem.col === head.col,
        )
      ) {
        clearInterval(this.tick);
        this.props.history.push('/gameover');
      }
    }

    this.setState({
      ...this.state,
      grid,
      snake: {
        head: {
          ...head,
        },
        tail: [...tail],
      },
      food,
      score,
    });
  }

  attachKeyHandler() {
    const {isMobile} = this.state;

    if (!!isMobile) {
      document.body.addEventListener(
        'touchstart',
        this.handleTouchStart,
        false,
      );
      document.body.addEventListener('touchmove', this.handleTouchMove, false);
    } else {
      document.body.addEventListener('keydown', this.handleKeyPress);
    }
  }

  removeKeyHandler() {
    const {isMobile} = this.state;
    if (!!isMobile) {
      document.body.removeEventListener('touchstart', this.handleTouchStart);
      document.body.removeEventListener('touchmove', this.handleTouchMove);
    } else {
      document.body.removeEventListener('keydown', this.handleKeyPress);
    }
  }

  handleTouchStart(e) {
    e.preventDefault();
    const {clientX, clientY} = e.touches[0];
    this.setState({
      xDown: clientX,
      yDown: clientY,
    });
  }

  handleTouchMove(e) {
    e.preventDefault();
    let {
      xDown,
      yDown,
      snake: {
        head: {direction},
      },
    } = this.state;

    if (!xDown || !yDown) {
      return;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        if (direction === 'right') return;
        direction = 'left';
      } else {
        /* right swipe */
        if (direction === 'left') return;
        direction = 'right';
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        if (direction === 'down') return;
        direction = 'up';
      } else {
        /* down swipe */
        if (direction === 'up') return;
        direction = 'down';
      }
    }
    this.setState({
      snake: {
        ...this.state.snake,
        head: {
          ...this.state.snake.head,
          direction,
        },
      },
      xDown: null,
      yDown: null,
    });
  }

  handleKeyPress(e) {
    let {
      snake: {
        head: {direction},
      },
    } = this.state;

    switch (e.keyCode) {
      case 37:
        if (direction === 'right') break;
        direction = 'left';
        break;
      case 38:
        if (direction === 'down') break;
        direction = 'up';
        break;
      case 39:
      default:
        if (direction === 'left') break;
        direction = 'right';
        break;
      case 40:
        if (direction === 'up') break;
        direction = 'down';
        break;
    }

    this.setState({
      snake: {
        ...this.state.snake,
        head: {
          ...this.state.snake.head,
          direction,
        },
      },
    });
  }

  componentWillMount() {
    this.drawGrid();
    this.attachKeyHandler();
    this.tick = setInterval(this.gameLoop, 250);
  }
  render() {
    const {grid, score} = this.state;

    const gridItems = grid.map(grid => {
      return (
        <div
          key={grid.row.toString() + '-' + grid.col.toString()}
          className={classNames('grid-item', {
            'is-food': grid.isFood && !grid.isHead,
            'is-snake': grid.isSnake,
          })}></div>
      );
    });

    return (
      <React.Fragment>
        {gridItems}
        <div className="score">SCORE: {score}</div>
      </React.Fragment>
    );
  }
}

export default Game;
