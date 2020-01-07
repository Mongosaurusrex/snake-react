import React from "react";
import classNames from "classnames";
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.rows = 10;
    this.cols = 10;
    this.scoreFactor = 10;
    this.state = {
      rows: this.rows,
      cols: this.cols
    };
    props.resetGame();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  gameLoop = () => {
    const {
      snake: { head },
      cols,
      rows
    } = this.state;

    switch (head.direction) {
      case "left":
        head.col--;
        if (head.col < 0) {
          head.col = cols - 1;
        }
        break;
      case "up":
        head.row--;
        if (head.row < 0) {
          head.row = rows - 1;
        }
        break;
      case "down":
        head.row++;
        if (head.row > rows - 1) {
          head.row = 0;
        }
        break;
      case "right":
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
      col: Math.floor(Math.random() * this.state.cols)
    };
  }

  componentWillUnmount() {
    clearInterval(this.tick);
    this.removeKeyHandler();
  }

  drawGrid() {
    let {
      snake: { tail = [this.randomGrid], head = this.randomGrid } = {},
      food = this.randomGrid,
      score = 0
    } = this.state;

    tail.unshift({
      row: head.row,
      col: head.col
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
          isSnake
        });
      }
    }

    if (tail.length > 1) {
      const testPart = tail.slice(1, tail.length);
      if (
        testPart.some(
          tailItem => tailItem.row === head.row && tailItem.col === head.col
        )
      ) {
        clearInterval(this.tick);
        this.props.history.push("/gameover");
      }
    }

    this.setState({
      ...this.state,
      grid,
      snake: {
        head: {
          ...head
        },
        tail: [...tail]
      },
      food,
      score
    });
  }

  attachKeyHandler() {
    document.body.addEventListener("keydown", this.handleKeyPress);
  }

  removeKeyHandler() {
    document.body.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    let {
      snake: {
        head: { direction }
      }
    } = this.state;

    switch (e.keyCode) {
      case 37:
        if(direction === "right") break;
        direction = "left";
        break;
      case 38:
        if(direction === "down") break;
        direction = "up";
        break;
      case 39:
      default:
        if(direction === "left") break;
        direction = "right";
        break;
      case 40:
        if(direction === "up") break;
        direction = "down";
        break;
    }

    this.setState({
      snake: {
        ...this.state.snake,
        head: {
          ...this.state.snake.head,
          direction
        }
      }
    });
  }

  componentWillMount() {
    this.drawGrid();
    this.attachKeyHandler();
    this.tick = setInterval(this.gameLoop, 250);
  }
  render() {
    const { grid, score } = this.state;

    const gridItems = grid.map(grid => {
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className={classNames("grid-item", {
            "is-food": grid.isFood && !grid.isHead,
            "is-snake": grid.isSnake
          })}
        ></div>
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
