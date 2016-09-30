/* This js file allows the chess game to be mediated by the computer.
*  The board columns go from A -> H going left from right.
*  The board rows go from 1 -> 8 going top to bottom.
*
*  chessMan1 -> good
*  chessMan2 -> evil
*
*/


//check if a move is okay and perform
//target is the div it is being placed on
function startMove(data, target) {
    try {
        var piece = getPieceFromId(data);

        verifyTurn(piece);

        verifyLegal(piece, target, null, null);

        verifyNotMovingToCheck(piece, target);

        performMove(piece, target);

        otherPlayerInCheck();

        removeLastComputerMoveMarker();

        changeLastPlayer();

        makeComputerMove();
    }
    catch(e) {
        if (e.name === "Win") {
            showDunbarAlert("Victory!", "The computer admits defeat. Good work brave general.<br>" + 
                            "<br>Please reload to page if you dare to challenge the computer again.");
            return;
        }
        if (e.name != "Returning")
            showDunbarAlert(e.name, e.message);
    }
}

//When computer should start
function computerStart() {
    try {
        makeComputerMove();
    }
    catch(e) {
        if (e.name === "Win") {
            showDunbarAlert("Victory!", "The computer admits defeat. Good work brave general.<br>" +
                "<br>Please reload to page if you dare to challenge the computer again.");
            return;
        }
        if (e.name != "Returning")
            showDunbarAlert(e.name, e.message);
    }
}

//Make the first legal move the computer has. If no moves are legal computer admits defeat.
function makeComputerMove() {
    hideComputerFirstOption();
    var computerPieces = getPlayerPieces(getNextPlayer().getClass()),
        target = null,
        availableMoves = [],
        foundAll = false;

    computerPieces = getPiecesNotInJail(computerPieces);
    var computerPieceToMove = computerPieces[0];
    computerPieces = getRemainingPieces(computerPieces);

    while(!foundAll) {
        try {
            target = getNextTarget(target);
            target = getNextTargetDiv(target);
        } 
        catch(e) {
            target = getNextTargetDiv('A1');
            computerPieces = getPiecesNotInJail(computerPieces);
            computerPieceToMove = computerPieces[0];
            computerPieces = getRemainingPieces(computerPieces);
        }
        try {
            var move = findComputerMove(computerPieceToMove, target);
            availableMoves.push(move);
        }
        catch(err) {
            if(computerPieces.length === 0 && target.id === 'H8')
                foundAll = true;
        }
    }

    if(availableMoves === null || availableMoves.length === 0) {
        throw ({name: "Win", message: "Computer has lost"});
    }

    var moveToMakeIndex = getIndexOfBestMove(availableMoves);
    var moveToMake = availableMoves[moveToMakeIndex];

    computerMove(moveToMake.getPiece(), moveToMake.getTarget());
}


//Try to make a move as computer using a piece and target
//it will throw an error if the move is not possible
function findComputerMove(piece, target) {
    if(target.childElementCount > 0) {
        target = target.firstElementChild;
    }

    verifyLegal(piece, target, null, null);

    verifyNotMovingToCheck(piece, target);

    var legalMove = new Move(piece, piece.getLocation(), target);
    var thisPieceVal = legalMove.getPiece().getValue();
    var endingSpaceVal = getValueFromTarget(legalMove.getTarget());
    legalMove.assignScore(thisPieceVal, endingSpaceVal);
    return legalMove;
}

function computerMove(piece, target) {
    performMove(piece, target);

    otherPlayerInCheck();

    document.getElementById(piece.getId()).className += " lastComputerMove";

    changeLastPlayer();
}

//Get the document element of the target
function getNextTargetDiv(target) {
    return document.getElementById(target);
}


//Get a target
function getNextTarget(target) {
    if(!target)
        return 'A1';
    target = target.id;

    switch (target[0]) {
        case 'A':
            switch (target[1]) {
                case '1':
                    return 'A2';
                case '2':
                    return 'A3';
                case '3':
                    return 'A4';
                case '4':
                    return 'A5';
                case '5':
                    return 'A6';
                case '6':
                    return 'A7';
                case '7':
                    return 'A8';
                case '8':
                    return 'B1';
            }
        case 'B':
            switch (target[1]) {
                case '1':
                    return 'B2';
                case '2':
                    return 'B3';
                case '3':
                    return 'B4';
                case '4':
                    return 'B5';
                case '5':
                    return 'B6';
                case '6':
                    return 'B7';
                case '7':
                    return 'B8';
                case '8':
                    return 'C1';
            }
        case 'C':
            switch (target[1]) {
                case '1':
                    return 'C2';
                case '2':
                    return 'C3';
                case '3':
                    return 'C4';
                case '4':
                    return 'C5';
                case '5':
                    return 'C6';
                case '6':
                    return 'C7';
                case '7':
                    return 'C8';
                case '8':
                    return 'D1';
            }
        case 'D':
            switch (target[1]) {
                case '1':
                    return 'D2';
                case '2':
                    return 'D3';
                case '3':
                    return 'D4';
                case '4':
                    return 'D5';
                case '5':
                    return 'D6';
                case '6':
                    return 'D7';
                case '7':
                    return 'D8';
                case '8':
                    return 'E1';
            }
        case 'E':
            switch (target[1]) {
                case '1':
                    return 'E2';
                case '2':
                    return 'E3';
                case '3':
                    return 'E4';
                case '4':
                    return 'E5';
                case '5':
                    return 'E6';
                case '6':
                    return 'E7';
                case '7':
                    return 'E8';
                case '8':
                    return 'F1';
            }
        case 'F':
            switch (target[1]) {
                case '1':
                    return 'F2';
                case '2':
                    return 'F3';
                case '3':
                    return 'F4';
                case '4':
                    return 'F5';
                case '5':
                    return 'F6';
                case '6':
                    return 'F7';
                case '7':
                    return 'F8';
                case '8':
                    return 'G1';
            }
        case 'G':
            switch (target[1]) {
                case '1':
                    return 'G2';
                case '2':
                    return 'G3';
                case '3':
                    return 'G4';
                case '4':
                    return 'G5';
                case '5':
                    return 'G6';
                case '6':
                    return 'G7';
                case '7':
                    return 'G8';
                case '8':
                    return 'H1';
            }
        case 'H':
            switch (target[1]) {
                case '1':
                    return 'H2';
                case '2':
                    return 'H3';
                case '3':
                    return 'H4';
                case '4':
                    return 'H5';
                case '5':
                    return 'H6';
                case '6':
                    return 'H7';
                case '7':
                    return 'H8';
                case '8':
                    throw new Error('next piece');
            }
        default: 
            throw new Error('next piece');
    }
}


//Get a piece that is not in jail
function getPiecesNotInJail(pieces) {
    var pieceList = [];
    for(var piece in pieces) {
        if(pieces[piece].getLocation() != "graveyard")
            pieceList.push(pieces[piece]);
    }
    return pieceList;
}

//Take first value off of list so that the computer pieces list only stores pieces that
//are possible pieces of the computer to move
function getRemainingPieces(computerPieces) {
    var pieces = [];
    for(var piece in computerPieces) {
        if(piece != '0')
            pieces.push(computerPieces[piece]);
    }
    return pieces;
}

function removeLastComputerMoveMarker() {
    var element = document.getElementsByClassName("lastComputerMove");
    if(element != null && element.length != 0) {
        element = element[0];
        var classes = element.className.split(" ");

        element.className = classes[1];
        element.className += " " + classes[0];
    }
}

function hideComputerFirstOption() {
    var option = document.getElementById("computerFirstOption");
    if(option != null)
        option.remove();
}




