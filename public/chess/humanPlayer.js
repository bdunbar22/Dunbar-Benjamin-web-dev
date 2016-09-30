/* This js file allows the chess game to be mediated by the computer.
*  The board columns go from A -> H going left from right.
*  The board rows go from 1 -> 8 going top to bottom.
*
*  chessMan1 -> red
*  chessMan2 -> blue
*	This file allows for human vs. human chess play.
*/


//check if a move is okay and perform
//data is the Id of the piece being moved
//target is the div it is being placed on
function startMove(data, target) {
    try {
        var board = new Board();

        var piece = getPieceFromId(data);

        verifyTurn(piece);
        
        verifyLegal(piece, target, null, null);

        verifyNotMovingToCheck(piece, target);

        performMove(piece, target);

        otherPlayerInCheck();
        //verifyNotADraw(data, target);

        changeLastPlayer();
    }
    catch(e) {
        if (e.name != "Returning")
            showDunbarAlert(e.name, e.message);
    }
}
