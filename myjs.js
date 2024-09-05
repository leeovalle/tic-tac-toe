$(function () {
    // defining game variables
    var squares = [], // array to store references to square elements
        SIZE = 3, //the size of the tic-tac-toe board (3x3)
        EMPTY = "&nbsp;", // HTML code for a non-breaking space, used to clear squares
        score, // object to keep track of players' scores
        moves, // counter for the number of moves made in the current game
        turn = "X", // variable created to track whose turn it is, X or O
        wins = [7, 56, 448, 73, 146, 292, 273, 84], // winning combinations using bitwise representation

    // resets the game to its initial state
    startNewGame = function () {
        turn = "X"; // set the turn back to X
        score = {"X": 0, "O": 0}; // reset scores
        moves = 0; // reset move counter
        squares.forEach(function (square) { square.html(EMPTY); }); // clear all squares
        $('#restartGame').remove(); // remove the restart button if it exists
    },

    // checks if the current score matches any winning combination
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                $("#message-container").html("Player " + turn + " wins!"); // display winning message
                setTimeout(createRestartButton, 500); // show the restart button after a delay
                return true; // returns true if there's a win
            }
        }
        if (moves === SIZE * SIZE) {
            $("#message-container").html("Cat’s game!"); // displays tie message if all squares are filled
            setTimeout(createRestartButton, 500); // show the restart button after a delay
        }
        return false; // return false if no win or tie
    },

    // this function handles click events on squares
    set = function () {
        if ($(this).html() !== EMPTY) return; // do nothing if square isn't empty
        $(this).html(turn); // set the square to the current player's symbol
        moves += 1; // increment move counter
        score[turn] += $(this)[0].indicator; // update the current player's score
        if (win(score[turn])) return; // check for a win and exit if true
        else if (moves === SIZE * SIZE) return; // check for a tie and exit if true
        turn = turn === "X" ? "O" : "X"; // switch turns
    },

    // this function creates and appends the restart button if it doesn't already exist
    createRestartButton = function () {
        if ($('#restartGame').length === 0) { // Check if the button doesn't exist
            $('<button/>', {
                text: 'Restart Game', // button text
                id: 'restartGame', // button ID
                click: startNewGame // attaches the click event handler to restart the game
            }).appendTo('.container').addClass('restart-button'); // add the button to the container with styling class
        }
    },

    // this function dynamically creates the game board and starts a new game
    play = function () {
        var board = $("<table border='1' cellspacing='0'>"), // creates the board
            indicator = 1; // indicator used for scoring
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>"); // creates a row
            board.append(row); // adds the row to the board
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td height='50' width='50' align='center' valign='center'></td>"); // creates a cell
                cell[0].indicator = indicator; // sets the indicator for scoring
                cell.click(set); // attaches click event handler to cell
                row.append(cell); // adds the cell to the row
                squares.push(cell); // adds the cell to the squares array
                indicator += indicator; // doubles the indicator value for the next cell
            }
        }

        $("#tictactoe").empty().append(board); // clears any existing board and add the new one
        startNewGame(); // initializes the game
    };

    play(); // call play to start the game
});
