import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turnO, setTurnO] = useState(true);
  const [count, setCount] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [winner, setWinner] = useState(null);
  const [winningPattern, setWinningPattern] = useState([]);
  const [drawCheck, setDrawCheck] = useState(false);
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    const isWinner = checkWinner();
    if (isWinner) {
      setWinner(board[isWinner.pattern[0]]);
      const winPattern = [
        isWinner.pattern[0],
        isWinner.pattern[1],
        isWinner.pattern[2],
      ];
      setWinningPattern(winPattern);
    } else if (count === 9 && winner === null) {
      gameDraw();
    }
  }, [board]);
  const handleBoxClick = (index) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = turnO ? "O" : "X";
      setBoard(newBoard);
      setTurnO(!turnO);
      setCount(count + 1);
      if (count === 9 && winner === null) {
        gameDraw();
      }
    }
  };
  const checkWinner = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { pattern, winner: board[a], value: true };
      }
    }
    return null;
  };

  const getNextValue = (index) => (hoveredIndex === index && (turnO ? "O" : "X")) || "";


  const handleBoxHover = (index) => {
    setHoveredIndex(index);
  };
  const gameDraw = () => setDrawCheck(count === 9 && !winner);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurnO(true);
    setCount(0);
    setHoveredIndex(null);
    setWinner(null);
    setWinningPattern([]);
    setDrawCheck(false);
  };
  return (
    <div className="App">
      <div className="gamearea">
        <div className="heading">Tic-Tac-Toe</div>
        <div className="playground">
          {board.map((value, index) => (
            <div
              key={index}
              className={`block ${winningPattern.includes(index) ? "win" : ""}`}
              onClick={() => handleBoxClick(index)}
              onMouseEnter={value ? null : () => handleBoxHover(index)}
              onMouseLeave={value ? null : () => setHoveredIndex(null)}
              data-next-value={value ? null : getNextValue(index)}
            >
              {value}
            </div>
          ))}
        </div>
        <div>
          {winner && (
            <>
              <div className="result">
                Winner: {winner}
                <ConfettiExplosion />
                <button className="reset" onClick={() => resetGame()}>
                  Restart
                </button>
              </div>
            </>
          )}
          {drawCheck && (
            <>
              <div className="result">
                Game Draw !!
                <button className="reset" onClick={() => resetGame()}>
                  Restart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
