/*
*  This is the model for a piece. 
*  It will store the piece name and other details
* 
*/

var Piece = function() {
	this.id = "";
	this.location = "";
	this.player = "";
	this.imageName = "";
}

Piece.prototype.setId = function(id) {
	this.id = id;
}

Piece.prototype.setLocation = function(loc) {
	this.location = loc;
}

Piece.prototype.setName = function(imageName) {
	this.imageName = imageName;
}

Piece.prototype.setPlayer = function(player) {
	this.player = player;
}

Piece.prototype.getId = function(id) {
	return this.id;
}

Piece.prototype.getLocation = function(loc) {
	return this.location;
}

Piece.prototype.getName = function(imageName) {
	return this.imageName;
}

Piece.prototype.getPlayer = function(player) {
	return this.player;
}

Piece.prototype.getValue = function() {
	switch (this.getId()[0]) {
		case 'Q':
			return 9;
		case 'R':
			return 7;
		case 'B':
			//Bishop has Bi, but just looking at the first letter here
			return 6;
		case 'L':
			return 5;
		case 'P':
			return 2;
		case 'K':
			return 8;
		default:
			//Getting value of a destination square
			return 0;
	}
}

Piece.prototype.equals = function(otherPiece) {
	return (this.getId() === otherPiece.getId());
}

function getPieceFromId(id) {
	var piece = new Piece();
	piece.setId(id);
	piece.setName(getPieceImageName(id, getPlayerFromId(id)));
	piece.setPlayer(getPlayerFromId(id));
	piece.setLocation(document.getElementById(id).parentElement.id);
	return piece;
}

/*
 * Get the image name for a piece
 *
 */
function getPieceImageName(id, player) {
	var pieceName = getPieceNameFromId(id);
	return player.getImageColor() + pieceName;
}

/*
 * Convert from Id to Name
 */
function getPieceNameFromId(id) {
	id = id[0];
	switch (id) {
		case 'Q':
			return 'Queen';
		case 'R':
			return 'Rook';
		case 'B': //Bishop has Bi, but just looking at the first letter here
			return 'Bishop';
		case 'L':
			return 'Knight';
		case 'P':
			return 'Pawn';
		case 'K':
			return 'King';
		default:
			throw ({name: "Error", message: "Invalid Piece Id"});
	}
}

function isAPiece(id) {
	var stringToCheck = document.getElementById(id).className;
	return (containsClass(stringToCheck, "chessMan1") ||
		containsClass(stringToCheck, "chessMan2"));
}

