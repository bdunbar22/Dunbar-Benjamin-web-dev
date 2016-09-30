/*
* This will store a move 
* a move consists of:
* a piece id
* a starting location
* an ending location
*/

var Move = function () {
	this.piece = '',
	this.startLocation = '',
	this.endLocation = '',
	this.score = 0;
}

var Move = function(piece, startLocation, endLocation) {
	this.piece = piece;
	this.startLocation = startLocation;
	this.endLocation = endLocation;
	this.score = 0;
}

Move.prototype.getPiece = function() {
	return this.piece;
}

Move.prototype.getTarget = function() {
	return this.endLocation;
}

Move.prototype.getStart = function() {
	return this.startLocation;
}

Move.prototype.getScore = function() {
	return this.score;
}

Move.prototype.setPiece = function(piece) {
	this.piece = piece;
}


Move.prototype.setStart = function(startLocation) {
	this.startLocation = startLocation;
}


Move.prototype.setTarget = function(targetLocation) {
	this.endLocation = targetLocation;
}

Move.prototype.assignScore = function(thisPieceVal, endingSpaceVal) {
	this.score = endingSpaceVal - thisPieceVal;
}

function getValueFromTarget(target) {
	if(isAPiece(target.id)) {
		return getPieceFromId(target.id).getValue();
	}
	else
		return 0;
}

//Note: best score must start below any other score.
function getIndexOfBestMove(availableMoves) {
	var bestScore = -10000,
		possibleIndices = [];
	for(moveIndex in availableMoves) {
		if(availableMoves[moveIndex].getScore() > bestScore) {
			bestScore = availableMoves[moveIndex].getScore();
		}
	}
	for(moveIndex in availableMoves) {
		if(availableMoves[moveIndex].getScore() === bestScore) {
			possibleIndices.push(moveIndex);
		}
	}

	var whichIndex = Math.floor(Math.random() * possibleIndices.length);

	return possibleIndices[whichIndex];
}
