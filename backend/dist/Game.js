"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
const messages_2 = require("./messages");
const messages_3 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess(); // Assign a new instance of Chess to the board property
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_2.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: messages_2.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
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
        }
        catch (e) {
            console.log(e);
            return;
        }
        console.log("success move");
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            return;
        }
        console.log(this.board.moves().length % 2);
        if (this.board.moves().length % 2 === 0) {
            console.log("move1");
            this.player2.send(JSON.stringify({
                type: messages_3.MOVE,
                payload: move,
            }));
        }
        else {
            console.log("move2");
            this.player1.send(JSON.stringify({
                type: messages_3.MOVE,
                payload: move,
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
