/* This js file allows the chess game to be mediated by the computer.
*  The board columns go from A -> H going left from right.
*  The board rows go from 1 -> 8 going top to bottom.
*
*  chessMan1 -> red
*  chessMan2 -> blue
*/

//Allow the chess piece to be dropped on another location.
function allowDrop(event) {
    event.preventDefault();
}

//Allow the chess piece to be dragged.
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}


//When the piece is placed start the validation and auto movement
function drop(event) {
    var data = event.dataTransfer.getData("text"),
        target = event.target;
    startMove(data, target);
}

//Automatically capture and move the pieces that need to move
function performMove(piece, target) {
    target = capture(piece, target);
    target.appendChild(document.getElementById(piece.getId()));
    checkAndPerformPromotion(piece, target);
}


//check if a piece was captured and return the destination square as the target
function capture(piece, target) {
    var currentTarget = target;
    if(performEnPassant(piece, target))
        return currentTarget;
    if(containsClass(target.className, "chessMan1")) {
        currentTarget = target.parentElement;
        target.remove();
        document.getElementsByClassName('bucketOfChess1')[0].appendChild(target);
    } else if (containsClass(target.className, "chessMan2")){
        currentTarget = target.parentElement;
        target.remove();
        document.getElementsByClassName('bucketOfChess2')[0].appendChild(target);
    }
    return currentTarget;
}

//If the move is an en passant, perform it.
function performEnPassant(piece, target) {
    if(piece.getId()[0] != 'P')
        return false;
    var currentSpace = piece.getLocation(),
        y1 = currentSpace[1],
        y2 = target.id[1],
        x1 = currentSpace[0].charCodeAt(),
        x2 = target.id[0].charCodeAt(),
        spaceInFrontOfTarget;
    //good en passant
    if(y1 === '5' && y2 === '6' && Math.abs(x2-x1) === 1) {
        spaceInFrontOfTarget = String.fromCharCode(x2) + '5';
        spaceInFrontOfTarget = document.getElementById(spaceInFrontOfTarget).firstChild;
        if(spaceInFrontOfTarget && containsClass(spaceInFrontOfTarget.className, "chessMan2") && spaceInFrontOfTarget.id[0] === 'P') {
            spaceInFrontOfTarget.remove();
            //put the piece being captured in discard container.
            document.getElementsByClassName('bucketOfChess2')[0].appendChild(spaceInFrontOfTarget);
            return true;
        }
    }   
    //evil en passant
    if(y1 === '4' && y2 === '3' && Math.abs(x2-x1) === 1) {
        spaceInFrontOfTarget = String.fromCharCode(x2) + '4';
        spaceInFrontOfTarget = document.getElementById(spaceInFrontOfTarget).firstChild;
        if(spaceInFrontOfTarget && containsClass(spaceInFrontOfTarget.className, "chessMan1") && spaceInFrontOfTarget.id[0] === 'P') {
            spaceInFrontOfTarget.remove();
            //put the piece being captured in discard container.
            document.getElementsByClassName('bucketOfChess1')[0].appendChild(spaceInFrontOfTarget);
            return true;
        }
    } 
}


//Give ability to get a promotion
function checkAndPerformPromotion(piece, target) {
    if(!(piece.getId()[0] === "P" && (target.id[1] === "1" || target.id[1] === "8")))
        return;
    //They have to promote
    var newPiece = getPromotionPiece();

    target.innerHTML = newPiece;
}


//Create the piece to promote the pawn to
function getPromotionPiece() {
    var classForPlayer = getCurrentPlayerClass();
    var player = getPlayerFromClass(classForPlayer);
    var pieceInput = prompt('Your pawn can be promoted!\nPlease enter the piece you would like to promote your pawn to.' +
            '\nOptions:\n(Queen)\n(Rook)\n(Bishop)\n(Knight)');
    var newPieceId = getPieceIdForPromotion(pieceInput) + getNextNumber();
    var newPieceImageName = getPieceImageName(newPieceId, player);

    return '<img id="' + newPieceId + '" class="' + classForPlayer
        + ' chessPiecePicture" draggable="true" ondragstart="drag(event)" src= "../Pictures/Chess Pieces/' + newPieceImageName + '.png" alt="Not found">';
}


//Find out the class of the current player
function getCurrentPlayerClass() {
    if(getLastPlayer().getSide() === "good") {
        return "chessMan2";
    } else {
        return "chessMan1";
    }
}


//Translate the name of a piece to the abbr. for the id
function getPieceIdForPromotion(piece) {
    if(!piece)
        return 'Q';
    piece = piece[0].toUpperCase();
    switch (piece) {
        case 'Q':
            return 'Q';
        case 'R':
            return 'R';
        case 'B':
            return 'Bi';
        case 'K':
            return 'L';
        default:
            return 'Q';
    }
}


//Get a 'unique #' to put with the id of the piece
function getNextNumber() {
    var time = new Date();
    return time.getTime();
}


//Find location of your king for check validation
function getMyKing(piece) {
    if(piece.getPlayer().getClass() === 'chessMan1')
        return getPieceFromId('K1');
    else
        return getPieceFromId('K2');
}


//Find the location of the other players king to see if you put them in check
function getTheirKingSquare() {
    if(getLastPlayer().getClass() === 'chessMan1')
        return document.getElementById('K1');
    else
        return document.getElementById('K2');
}


//Return an array of the other players pieces' ids
function getPlayerPieces(playerClass) {
        pieceElements = document.getElementsByClassName(playerClass),
        pieces = [];

    for(piece in pieceElements)
        if(isNaN(piece) && piece != 'item' && piece != "namedItem" && piece != "length")
            pieces.push(getPieceFromId(piece));

    return pieces;
}
