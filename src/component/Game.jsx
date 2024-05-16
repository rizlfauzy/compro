import PropTypes from "prop-types";
import { useCallback, useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculate_winner = useCallback((squares) => {
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
  }, []);

  const handle_click = useCallback(
    (i) => {
      const squares_copy = [...squares];
      if (calculate_winner(squares_copy) || squares_copy[i]) return;
      squares_copy[i] = xIsNext ? "X" : "O";
      setSquares(squares_copy);
      setXIsNext(!xIsNext);
    },
    [calculate_winner, squares, xIsNext]
  );

  return (
    <>
      <div className="wrapper flex justify-center pt-8 pb-8">
        <div className="card rounded-md w-[550px] p-3 bg-primary_bg">
          <h3 className="text-secondary_text font-bold text-2xl mb-3">Tic Tac Toe</h3>
          <hr className="text-white" />
          <div className="card-body mt-3 flex justify-center">
            <div className="flex flex-wrap justify-center align-middle items-center max-h-40 w-[150px]">
              {squares.map((square, i) => {
                return <Square key={i} value={square} onClick={handle_click.bind(this, i)} />;
              })}
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
