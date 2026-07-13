//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//players
let playerWidth = 10;
let playerHeight = 50;

let player1 = {
  x : 10,
  y : BoardHeight/2,
  width : playerWidth,
  height : playerHeight
}


window.onload = function() {
  board = document.getElementById("board");
  board.height =  boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d}); //used for drawing on the board
}
