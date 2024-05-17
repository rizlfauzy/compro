import PropTypes from "prop-types";
import { useCallback, useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function calculate_winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState(() => `Next player: ${xIsNext ? "X" : "O"}`);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);

  const handle_click = useCallback(
    (i) => {
      const btn_history = document.querySelectorAll(".btn_history");
      btn_history.forEach((btn) => btn.classList.remove("active"));
      const squares_copy = [...squares];
      if (calculate_winner(squares) || squares_copy[i]) return;
      squares_copy[i] = xIsNext ? "X" : "O";
      setSquares(squares_copy);
      setHistory([...history.slice(0, stepNumber + 1), squares_copy]);
      setStepNumber(history.length);
      setXIsNext(!xIsNext);
      const winner = calculate_winner(squares_copy);
      if (winner) setStatus(`Winner: ${winner}`);
      else setStatus(`Next player: ${!xIsNext ? "X" : "O"}`);
    },
    [squares, xIsNext, history, stepNumber]
  );

  return (
    <>
      <div className="wrapper flex justify-center pt-8 pb-8">
        <div className="card rounded-md w-[550px] p-3 bg-primary_bg">
          <h3 className="text-secondary_text font-bold text-2xl mb-3">Tic Tac Toe</h3>
          <hr className="text-white" />
          <div className="card-body mt-3 flex">
            <div className="status text-secondary_text text-xl mt-3 flex-1">{status}</div>
            <div className="flex flex-wrap justify-center align-middle items-center max-h-[150px] flex-1 w-[150px]">
              {squares.map((square, i) => {
                return <Square key={i} value={square} onClick={handle_click.bind(this, i)} />;
              })}
            </div>
            <div className={`description border-secondary_bg rounded-md p-3 flex-1 ${history.length < 2 ? "" : "border-2"}`}>
              {history.length > 1 && (
                <>
                  <h3 className="text-secondary_text font-bold text-lg mb-3">History</h3>
                  <ul className="text-secondary_text">
                    {history.map((_, move) => {
                      return (
                        <li key={move}>
                          <button
                            className="btn_history transition bg-secondary_bg hover:bg-secondary_text hover:text-white rounded-md p-1 mt-1 w-full"
                            onClick={(e) => {
                              setStepNumber(move);
                              setSquares(history[move]);
                              setXIsNext(move % 2 === 0);
                              setStatus(`Next player: ${move % 2 === 0 ? "X" : "O"}`);
                              if (move === 0) setHistory([Array(9).fill(null)]);
                              const btn_history = document.querySelectorAll(".btn_history");
                              btn_history.forEach((btn) => btn.classList.remove("active"));
                              e.target.classList.add("active");
                            }}
                          >
                            {move ? `Go to move #${move}` : "Go to game start"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
