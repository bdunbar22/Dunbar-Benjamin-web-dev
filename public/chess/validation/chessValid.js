/* This file has the validation for the chess moves in it!
*  This will clean up the code so that it is less difficult 
*  to find individual functions.
*  The board columns go from A -> H going left from right.
*  The board rows go from 1 -> 8 going top to bottom.
*
*  chessMan1 -> red
*  chessMan2 -> blue
*/


//check if the destination is legal for current piece
function verifyLegal(piece, target, pieceWillBeHere, pieceWillNotBeHere) {
    var nextSpace = target,
        currentSpace = piece.getLocation();

    if(target.className === "bucketOfChess1" || target.className === "bucketOfChess2") {
        throw ({name: "Invalid move", message: "This location is not valid."});
    }
    else if(currentSpace === "graveyard") {
        throw ({name: "Invalid move", message: "This piece has been captured already."});
    }
    else if(isAPiece(target.id))
        nextSpace = target.parentElement;
    nextSpace = nextSpace.id;
    if (pieceWillBeHere === currentSpace)
        throw ({name: "Okay", message: "In validate check. Piece being checked is getting captured."});
    if (currentSpace  === nextSpace)
        throw ({name: "Returning", message: "No message to display."});
    //Error if capturing own piece
    verifyDifferentColor(piece, target, pieceWillBeHere);
    
    switch(piece.getId()[0])
    {
        case 'P' :
            pawnMove(currentSpace, nextSpace, piece.getPlayer(), target, pieceWillBeHere, pieceWillNotBeHere);
            break;
        case 'R' :
            rookMove(currentSpace, nextSpace, pieceWillBeHere, pieceWillNotBeHere);
            break;
        case 'L' :
            //Couldn't use K for knight and king, used L for night.
            knightMove(currentSpace, nextSpace); 
            break;
        case 'B' :
            bishopMove(currentSpace, nextSpace, pieceWillBeHere, pieceWillNotBeHere);
            break;
        case 'Q' :
            queenMove(currentSpace, nextSpace, pieceWillBeHere, pieceWillNotBeHere);
            break;
        case 'K' :
            kingMove(currentSpace, nextSpace, piece);
            break;
    }
}


//return true if move is legal
function legal(piece, target, pieceWillBeHere, pieceWillNotBeHere) {
    try{
        verifyLegal(piece, target, pieceWillBeHere, pieceWillNotBeHere);
    }
    catch (e){
        return false;
    }
    return true;
}


//You can not move yourself to a position where you will be in check
function verifyNotMovingToCheck(piece, target) {
    var myKing = getMyKing(piece),
        pieceMovingFrom = piece.getLocation();

    var opponentPieces = getPlayerPieces(getLastPlayer().getClass());

    if(myKing.equals(piece)) {
        myKing.setLocation(target.id);
    }
    var opponentTarget = document.getElementById(myKing.getLocation());

    for(var opponentPiece in opponentPieces) {
        if(legal(opponentPieces[opponentPiece], opponentTarget, target, pieceMovingFrom))
            throw ({name: "Danger", message: "You will be in check if you make this move."});
    }
}


//Tell the player if they put the opponent in check
function otherPlayerInCheck() {
    var theirKing = getTheirKingSquare(),
        myClass = getCurrentPlayerClass(),
        myPieces = getPlayerPieces(myClass);
    
    for(var piece in myPieces) {
        if(legal(myPieces[piece], theirKing, null, null)) {
            showDunbarAlert("Check", "You put " + getLastPlayer().getSide() + " in check!");
            return;
        }
    }
}


//Can't capture your own piece
function verifyDifferentColor(piece, target, pieceWillBeHere) {
    var currentTarget = target;
    if(isAPiece(target.id)) {
        currentTarget = target.parentElement;
    }
    //currentTarget id === piece will be here will accept that a piece can move into the square it's
    //fellow piece is in after that piece is captured -> preventing the other king from being in check.
    if(currentTarget.id === pieceWillBeHere)
        return;
    //target itself can not have the same class name as the piece being moved.
    //in a normal move piece will be here is null, so this point is reached.
    if(isAPiece(target.id)) {
        var targetPlayer = getPlayerFromId(target.id);
        if(targetPlayer.getSide() === piece.getPlayer().getSide()) {
            throw ({name: "Invalid", message: "You can not capture your own piece."});
        }
    }
}


//See if the king can be captured by a pawn
function pawnCanTakeKingRed(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere) {
    if(containsClass(target.className, "chessMan1"))
        target = target.parentElement;
    if(!pieceWillBeHere || !pieceWillNotBeHere)
        return false;
    if(document.getElementById(pieceWillNotBeHere).firstElementChild.id[0] != "K")
        return false;
    if(target.id === pieceWillBeHere && (Math.abs(x2-x1) === 1 && y2-y1 === 1))
        return true;
    return false;
}
function pawnCanTakeKingBlue(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere) {
    if(containsClass(target.className, "chessMan2"))
        target = target.parentElement;
    if(!pieceWillBeHere || !pieceWillNotBeHere)
        return false;
    if(document.getElementById(pieceWillNotBeHere).firstElementChild.id[0] != "K")
        return false;
    if(target.id === pieceWillBeHere && (Math.abs(x2-x1) === 1 && y2-y1 === -1))
        return true;
    return false;
}

function containsClass(class1, searchClass) {
    return class1.indexOf(searchClass) != -1;
}

function verifyTurn(piece) {
    if(piece.getPlayer().getSide() === getLastPlayer().getSide()) {
        throw ({name: "Invalid move", message: "It is not your turn."});
    }
}

