import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER } from "./messages";
import { INIT_GAME } from "./messages";
import { MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  startTime: Date;
  private moveCount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess(); // Assign a new instance of Chess to the board property
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  public makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    console.log("inside makeMove");
    console.log(this.board.moves().length % 2);
    if (this.moveCount % 2 === 0 && socket !== this.player1) {
      console.log("move by 1");

     
    }
    if (this.moveCount % 2 === 0 && socket !== this.player2) {
      console.log("move by 2");

      
    }
    ////////////////////////////////////////////////////////
    console.log("did not early return");
    ///////////////////////////////////////////////////////
    try {
      this.board.move(move);
      // this.moveCount++;
    } catch (e) {
      console.log(e);
      return;
    }

    console.log("success move");

    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      return;
    }
    console.log(this.board.moves().length % 2);

    if (this.board.moves().length % 2 === 0) {
      console.log("move1");

      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      console.log("move2");

      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
    this.moveCount++;
  }
}
