/*
 *  This will represent the players of the game
 *
 *  Sides:
 *  good -> chessMan1
 *  evil -> chessMan2
 */

var Player = function(goodOrEvil) {
    this.side = goodOrEvil;
}

Player.prototype.getSide = function() {
    return this.side;
}

Player.prototype.getClass = function() {
    if(this.side === "good") {
        return "chessMan1";
    }
    else if(this.side === "evil") {
        return "chessMan2";
    }
    else throw("Player needs a correct side");
}

/*
 * Convert from side to png image color
 */
Player.prototype.getImageColor = function() {
    if(this.side === "good") {
        return "white";
    }
    else if(this.side === "evil") {
        return "black";
    }
    else throw("Player needs a correct side");
}

/*
 * Find the player in the hidden element that shows who played last.
 */
function getLastPlayer() {
    var lastPlayerText = document.getElementById("hidden").textContent;
    if(lastPlayerText === "good") {
        return new Player("good");
    }
    else if(lastPlayerText === "evil") {
        return new Player("evil");
    }
    else
        throw("Invalid last player stored.");
}


/*
 * Determing the Player of a piece from the Id
 */
function getPlayerFromId(id) {
    var element = document.getElementById(id);
    var className = element.className;
    if(containsClass(className, "chessMan1")) {
        return new Player("good");
    }
    else if(containsClass(className, "chessMan2")) {
        return new Player("evil");
    }
    else
        throw("Could not determine player of element with id " + id);
}

/*
 * Determing the Player of a piece from the class
 */
function getPlayerFromClass(className) {
    if(containsClass(className, "chessMan1")) {
        return new Player("good");
    }
    else if(containsClass(className, "chessMan2")) {
        return new Player("evil");
    }
    else
        throw("Could not determine player of element with class " + className);
}


//Store the new value for the last player in a hidden element on the page
function changeLastPlayer() {
    if(getLastPlayer().getSide() === "good") {
        document.getElementById("hidden").textContent = "evil";
    } else {
        document.getElementById("hidden").textContent = "good";
    }
}

/*
 * Find the player in the hidden element that shows who played last.
 */
function getNextPlayer() {
    var lastPlayerText = document.getElementById("hidden").textContent;
    if(lastPlayerText === "good") {
        return new Player("evil");
    }
    else if(lastPlayerText === "evil") {
        return new Player("good");
    }
    else
        throw("Invalid last player stored.");
}
