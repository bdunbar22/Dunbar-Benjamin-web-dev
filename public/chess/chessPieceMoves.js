/* This file contains all of the logic for if a piece can move based
*  on the piece's abilities and the status of the board
*  The board columns go from A -> H going left from right.
*  The board rows go from 1 -> 8 going top to bottom.
*
*  chessMan1 -> red
*  chessMan2 -> blue
*/


//Pawn move. This will vary based on the player
function pawnMove(currentSpace, nextSpace, player, target, pieceWillBeHere, pieceWillNotBeHere) {
    var x1 = currentSpace[0].charCodeAt(),
        x2 = nextSpace[0].charCodeAt(),
        y1 = currentSpace[1],
        y2 = nextSpace[1];
    if(player.getSide() === "evil")
        evilPawn(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere);
    else //color is blue
        goodPawn(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere);
}


//Rook move. Also make sure the path is clear
function rookMove(currentSpace, nextSpace, pieceWillBeHere, pieceWillNotBeHere) {
    var x1 = currentSpace[0].charCodeAt(),
        x2 = nextSpace[0].charCodeAt(),
        y1 = currentSpace[1],
        y2 = nextSpace[1];
    if(x1 === x2 && columnPathIsClear(x1, y1, y2, pieceWillBeHere, pieceWillNotBeHere))
        return;
    else if(y1 === y2 && rowPathIsClear(x1, x2, y1, pieceWillBeHere, pieceWillNotBeHere))
        return;
    else
        throw ({name: "Invalid move", message: "This is not a valid destination."});
}


//Bishop move. Make sure the path is clear
function bishopMove(currentSpace, nextSpace, pieceWillBeHere, pieceWillNotBeHere) {
    var x1 = currentSpace[0].charCodeAt(),
        x2 = nextSpace[0].charCodeAt(),
        y1 = currentSpace[1],
        y2 = nextSpace[1];
    if(!((x2-x1 === y2-y1 || x2-x1 === y1-y2) && diagonalPathIsClear(x1, x2, y1, y2, pieceWillBeHere, pieceWillNotBeHere)))
        throw ({name: "Invalid move", message: "This is not a valid destination."});
}


//Knight move. Path does not need to be clear
function knightMove(currentSpace, nextSpace) {
    var x1 = currentSpace[0].charCodeAt(),
        x2 = nextSpace[0].charCodeAt(),
        y1 = currentSpace[1],
        y2 = nextSpace[1];
    if(!((Math.abs(x2-x1) === 2 && Math.abs(y2-y1) === 1) || (Math.abs(x2-x1) === 1 && Math.abs(y2-y1) === 2))) {
        throw ({name: "Invalid move", message: "This is not a valid destination."});
    }
}


//Queen move. Path must be clear
function queenMove(currentSpace, nextSpace, pieceWillBeHere, pieceWillNotBeHere) {
    var x1 = currentSpace[0].charCodeAt(),
        x2 = nextSpace[0].charCodeAt(),
        y1 = currentSpace[1],
        y2 = nextSpace[1];
    if(x1 === x2 && columnPathIsClear(x1, y1, y2, pieceWillBeHere, pieceWillNotBeHere))
        return;
    if(y1 === y2 && rowPathIsClear(x1, x2, y1, pieceWillBeHere, pieceWillNotBeHere))
        return;
    if((x2-x1 === y2-y1 || x2-x1 === y1-y2) && diagonalPathIsClear(x1, x2, y1, y2, pieceWillBeHere, pieceWillNotBeHere))
            return;
    throw ({name: "Invalid move", message: "This is not a valid destination."});
}


//King move. One space any direction
function kingMove(currentSpace, nextSpace, data) {
    var x1 = currentSpace[0].charCodeAt(),
        x2 = nextSpace[0].charCodeAt(),
        y1 = currentSpace[1],
        y2 = nextSpace[1];
    if(data.id === 'K1' && checkRedCastling(x1, x2, y1, y2))
        return;
    if(data.id === 'K2' && checkBlueCastling(x1, x2, y1, y2))
        return;
    if(Math.abs(x2-x1) < 2 && Math.abs(y2-y1) < 2) {
        return;
    }
    throw ({name: "Invalid move", message: "This is not a valid destination."});
}


//In the case of good's turn. See if a pawn move is okay
function goodPawn(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere) {
    if(pawnCanTakeKingRed(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere))
        return;
    if(Math.abs(x2-x1) === 1 && y2-y1 === 1 && containsClass(target.className, "chessMan2")) // move different to capture
        return;  
    if(pieceWillBeHere)
        throw ({name: "Not in Check", message: "Pawn can't take king in validate check"});
    if(((x2 === x1 && y2-y1 === 1)  || (x2 === x1 && y1 === '2' && y2 === '4')) && !containsClass(target.className, "chessMan2"))
        return;
    //below is case for en passant
    if(y1 === '5' && y2 === '6' && Math.abs(x2-x1) === 1) {
        var spaceInFrontOfTarget = String.fromCharCode(x2) + '5';
        spaceInFrontOfTarget = document.getElementById(spaceInFrontOfTarget).firstChild;
        if(spaceInFrontOfTarget && containsClass(spaceInFrontOfTarget.className, "chessMan2") && spaceInFrontOfTarget.id[0] === 'P') {
            return;
        }
    }   
    throw ({name: "Invalid move", message: "This is not a valid destination."});  
}


//In the case of evil's turn. See if a pawn move is okay
function evilPawn(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere) {
    if(pawnCanTakeKingBlue(x1, x2, y1, y2, target, pieceWillBeHere, pieceWillNotBeHere))
        return;
    if(Math.abs(x2-x1) === 1 && y2-y1 === -1 && containsClass(target.className, "chessMan1")) // move different to capture
        return;
    if(pieceWillBeHere)
        throw ({name: "Not in Check", message: "Pawn can't take king in validate check"});
    if(((x2 === x1 && y2-y1 === -1) || (x2 === x1 && y1 === '7' && y2 === '5')) && !containsClass(target.className, "chessMan1"))
        return;
    //below is case for en passant
    if(y1 === '4' && y2 === '3' && Math.abs(x2-x1) === 1) {
        var spaceInFrontOfTarget = String.fromCharCode(x2) + '4';
        spaceInFrontOfTarget = document.getElementById(spaceInFrontOfTarget).firstChild;
        if(spaceInFrontOfTarget && containsClass(spaceInFrontOfTarget.className, "chessMan1") && spaceInFrontOfTarget.id[0] === 'P') {
            return;
        }
    } 
    throw ({name: "Invalid move", message: "This is not a valid destination."});
}


//If castling is legal and intitiated then move pieces and return true
function checkRedCastling(x1, x2, y1, y2) {
    if(String.fromCharCode(x1) === "D" && y1 === '1') { //King at starting position
        //Check Kings destination and if original rook is in place RIGHT SIDE
        if(String.fromCharCode(x2) === "F" && y2 === '1' && document.getElementById('H1').firstElementChild.id === 'R4'){
            if(rowPathIsClear(x1, 'H'.charCodeAt(), y1)) {
                document.getElementById('E1').appendChild(document.getElementById('R4'));
                return true;
            }
        }
        //Check Kings destination and if original rook is in place LEFT SIDE
        if(String.fromCharCode(x2) === "B" && y2 === '1' && document.getElementById('A1').firstElementChild.id === 'R3'){
            if(rowPathIsClear('A'.charCodeAt(),x1, y1)) {
                document.getElementById('C1').appendChild(document.getElementById('R3'));
                return true;
            }
        }
    }
    return false;
}


//See if blue is trying to do the special move "castling"
function checkBlueCastling(x1, x2, y1, y2) {
    if(String.fromCharCode(x1) === "D" && y1 === '8') { //King at starting position
        //Check Kings destination and if original rook is in place RIGHT SIDE
        if(String.fromCharCode(x2) === "F" && y2 === '8' && document.getElementById('H8').firstElementChild.id === 'R6'){
            if(rowPathIsClear(x1, 'H'.charCodeAt(), y1)) {
                document.getElementById('E8').appendChild(document.getElementById('R6'));
                return true;
            }
        }
        //Check Kings destination and if original rook is in place LEFT SIDE
        if(String.fromCharCode(x2) === "B" && y2 === '8' && document.getElementById('A8').firstElementChild.id === 'R5'){
            if(rowPathIsClear('A'.charCodeAt(),x1, y1)) {
                document.getElementById('C8').appendChild(document.getElementById('R5'));
                return true;
            }
        }
    }
    return false;
}


//Check if any squares between x1, y1 and x2, y1 are occupied
function rowPathIsClear(x1, x2, y1, pieceWillBeHere) {
    if(x1 > x2) {
        var temp = x1;
        x1 = x2;
        x2 = temp;
    } //x1 is left x pos now.
    for(var i = (x1 + 1); i < x2; i++) {
        var id = String.fromCharCode(i) + y1;
        if(document.getElementById(id).firstElementChild || id === pieceWillBeHere)
            return false;
    }
    return true;
}


//Check if any squares between x1, y1 and x1, y2 are occupied
function columnPathIsClear(x1, y1, y2, pieceWillBeHere) {
        if(Number(y1) > Number(y2)) {
        var temp = y1;
        y1 = y2;
        y2 = temp;
    } //y1 is low y pos now.
    for(var i = (Number(y1) + 1); i < Number(y2); i++) {
        var id = String.fromCharCode(x1) + i;
        if(document.getElementById(id).firstElementChild || id === pieceWillBeHere)
            return false;
    }
    return true;
}


//Check if any squares on the diagonal path from x1, y1 to x2, y2 are occupied
function diagonalPathIsClear(x1, x2, y1, y2, pieceWillBeHere, pieceWillNotBeHere) {
    var direction = "";
    if(x1 < x2) {
        direction += "right";
    } else {
        direction += "left";
    }
    if(Number(y1) < Number(y2)) {
        direction += "down";
    } else {
        direction += "up";
    }
    switch (direction) {
        case "rightdown":
            return diagonalDownIsClear(x1, x2, y1, y2, pieceWillBeHere, pieceWillNotBeHere);
            break;
        case "rightup":
            return diagonalUpIsClear(x1, x2, y1, y2, pieceWillBeHere, pieceWillNotBeHere);
            break;
        case "leftdown":
            //same path as right up, switch start and end.
            return diagonalUpIsClear(x2, x1, y2, y1, pieceWillBeHere, pieceWillNotBeHere);
            break;
        case "leftup":
            //same path as right down, switch start and end.
            return diagonalDownIsClear(x2, x1, y2, y1, pieceWillBeHere, pieceWillNotBeHere);
            break;       
        default:
            throw ({name: "Invalid move", message: "This is not a valid destination."});
    }
}


//Subtask for diagonal path check
function diagonalUpIsClear(left, right, y1, y2, pieceWillBeHere, pieceWillNotBeHere) {
    var i = (Number(y1)-1);
    left ++;
    while(i > Number(y2) && left < right) {
        var id = String.fromCharCode(left) + i;
        if(id === pieceWillNotBeHere) {
            i--;
            left++; 
            continue;
        } 
        if(document.getElementById(id).firstElementChild || id === pieceWillBeHere)
            return false;
        i--;
        left++; 
    };
    return true;
}


//Second option for diagonal path check
function diagonalDownIsClear(left, right, y1, y2, pieceWillBeHere, pieceWillNotBeHere) {
    var i = (Number(y1)+1);
    left ++;
    while(i < Number(y2) && left < right) {
        var id = String.fromCharCode(left) + i;
        if(id === pieceWillNotBeHere) {
            i++;
            left++; 
            continue;
        }
        if(document.getElementById(id).firstElementChild || id === pieceWillBeHere)
            return false;
        i++;
        left++; 
    }
    return true;
}
