import React, { Component } from "react";

export class Square extends Component {
  render() {
    return (
      <div
        className="square"
        onClick={(e) => {
          if (this.props.value === "") {
            this.props.onClickSquare(e, this.props.id, this.props.player);
          } else {
            e.preventDefault();
          }
        }}
      >
        {this.props.value}
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.X = "X";
    this.O = "O";

    this.state = {
      squares: [
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
        { id: 5, value: "" },
        { id: 6, value: "" },
        { id: 7, value: "" },
        { id: 8, value: "" },
        { id: 9, value: "" },
      ],
      square: this.X,
      winner: "none",
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.winner === "none") {
      let player1_check = this.checkWinner(this.X);

      let player2_check = this.checkWinner(this.O);

      if (player1_check) {
        this.setState({ winner: this.X });
      }

      if (player2_check) {
        this.setState({ winner: this.O });
      }
    }
  }

  checkWinner = (player) => {
    let check1 =
      this.state?.squares[0].id === 1 &&
      this.state?.squares[1].id === 2 &&
      this.state?.squares[2].id === 3 &&
      this.state.squares[0].value === player &&
      this.state.squares[1].value === player &&
      this.state.squares[2].value === player;

    let check2 =
      this.state?.squares[3].id === 4 &&
      this.state?.squares[4].id === 5 &&
      this.state?.squares[5].id === 6 &&
      this.state.squares[3].value === player &&
      this.state.squares[4].value === player &&
      this.state.squares[5].value === player;

    let check3 =
      this.state?.squares[6].id === 7 &&
      this.state?.squares[7].id === 8 &&
      this.state?.squares[8].id === 9 &&
      this.state.squares[6].value === player &&
      this.state.squares[7].value === player &&
      this.state.squares[8].value === player;

    let check4 =
      this.state?.squares[0].id === 1 &&
      this.state?.squares[4].id === 5 &&
      this.state?.squares[8].id === 9 &&
      this.state.squares[0].value === player &&
      this.state.squares[4].value === player &&
      this.state.squares[8].value === player;

    let check5 =
      this.state?.squares[2].id === 3 &&
      this.state?.squares[4].id === 5 &&
      this.state?.squares[6].id === 7 &&
      this.state.squares[2].value === player &&
      this.state.squares[4].value === player &&
      this.state.squares[6].value === player;

    let check6 =
      this.state?.squares[0].id === 1 &&
      this.state?.squares[3].id === 4 &&
      this.state?.squares[6].id === 7 &&
      this.state.squares[0].value === player &&
      this.state.squares[3].value === player &&
      this.state.squares[6].value === player;

    let check7 =
      this.state?.squares[1].id === 2 &&
      this.state?.squares[4].id === 5 &&
      this.state?.squares[7].id === 8 &&
      this.state.squares[1].value === player &&
      this.state.squares[4].value === player &&
      this.state.squares[7].value === player;

    let check8 =
      this.state?.squares[2].id === 3 &&
      this.state?.squares[5].id === 6 &&
      this.state?.squares[8].id === 9 &&
      this.state.squares[2].value === player &&
      this.state.squares[5].value === player &&
      this.state.squares[8].value === player;

    if (
      check1 ||
      check2 ||
      check3 ||
      check4 ||
      check5 ||
      check6 ||
      check7 ||
      check8
    ) {
      return true;
    }

    return false;
  };

  handleSquareClick = (e, id, player) => {
    e.preventDefault();

    if (this.state.winner !== "none") {
      return;
    }

    this.setState((prevState) => ({
      squares: prevState.squares.map((obj) =>
        obj.id === id && obj.value === ""
          ? Object.assign(obj, { id, value: player })
          : obj
      ),
      square: player === this.X ? this.O : this.X,
    }));
  };

  handleResetClick = (e) => {
    e.preventDefault();

    if (this.state.winner !== "none") {
      this.setState({
        squares: [
          { id: 1, value: "" },
          { id: 2, value: "" },
          { id: 3, value: "" },
          { id: 4, value: "" },
          { id: 5, value: "" },
          { id: 6, value: "" },
          { id: 7, value: "" },
          { id: 8, value: "" },
          { id: 9, value: "" },
        ],
        square: this.X,
        winner: "none",
      });
    }
  };

  render() {
    return (
      <div className="tic-tac-toe-container">
        <h1>Tic Tac Toe</h1>
        <h3>
          Next Player: <span>{this.state.square}</span>
        </h3>
        <h3>
          Winner: <span>{this.state.winner}</span>
        </h3>

        <button className="btn-reset" onClick={this.handleResetClick}>
          Reset
        </button>

        <div className="square-container">
          {this.state.squares.map((item) => (
            <div key={item.id}>
              <Square
                id={item.id}
                value={item.value}
                onClickSquare={this.handleSquareClick}
                player={this.state.square}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
