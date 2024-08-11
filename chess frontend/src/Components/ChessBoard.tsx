import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../Pages/Game";
import { UseSockets } from "../Hooks/UseSockets";

export const ChessBoard = ({
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);
  const socket = UseSockets();
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Chess Board</h1>
        {board.map((row, i) => {
          return (
            <div key={i} className="flex">
              {row.map((square, j) => {
                return (
                  <div
                    onClick={() => {
                      if (!from) {
                        setFrom(square?.square ?? null);
                        return;
                      } else {                                                 ///try removing if block in this else block
                        setTo(square?.square ?? null);
                        if (socket) {
                          socket.send(
                            JSON.stringify({ type: MOVE, payload: { from, to: square?.square } })
                          );
                        }
                        console.log(from,to);
                        setFrom(null)
                      }
                    }}
                    key={j}
                    className={`w-8 h-8 ${
                      (i + j) % 2 === 0 ? "bg-green-500" : "bg-green-300"
                    }`}
                  >
                    {square ? square.type : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
