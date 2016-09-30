/*
*  This will represent the chess board as a collection of the 32 pieces
*  The locations of each piece will be stored.
* 
*/

var Board = function() {
	this.boardName = '',
	this.redPieces = [],
	this.bluePieces = [],
	this.createBoardFromPage();
}

Board.prototype.setName = function(name) {
	this.boardName = name;
}

Board.prototype.setRedPieces = function(pieces) {
	this.redPieces = pieces;
}

Board.prototype.setBluePieces = function(pieces) {
	this.bluePieces = pieces;
}

Board.prototype.createBoardFromPage = function() {
	this.boardName = "CurrentPage";
	this.setRedPieces(this.getPieces('chessMan1'));
	this.setBluePieces(this.getPieces('chessMan2'));
}

Board.prototype.getPieces = function(nameOfClass) {
	var pieces = document.getElementsByClassName(nameOfClass),
		newPieces = [];

    for(piece in pieces) {
        if(isNaN(piece) && piece != 'item' && piece != "namedItem" && piece != "length") {
            var newPiece = new getPieceFromId(piece);

            newPieces.push(newPiece);
        }
    }
    return newPieces;
}
