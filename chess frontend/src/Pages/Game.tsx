import { ChessBoard } from "../Components/ChessBoard"
import { Bottons } from "../Components/Bottons"
import { UseSockets } from "../Hooks/UseSockets";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER= "game_over";

export const Game = () => {
    const socket = UseSockets();
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data); 
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("game started");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("move");
                    break;
                case GAME_OVER:
                    console.log("game over");
                    break;
            }
        }}, [socket]);
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Game
            </h1>
            <p>You entered game page</p>
            <div className="flex justify-center gap-5">
            <div className="col-span-4"><ChessBoard board={board} /></div>
            <div className="flex p-5 bg-slate-200 px-10"><Bottons onClick={()=>{socket && socket.send(JSON.stringify({type:INIT_GAME}))}}>play</Bottons></div>
            </div>
        </div>
    )
}