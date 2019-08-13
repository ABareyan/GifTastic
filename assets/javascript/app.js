var players = [
    "Pele",
    "Diego Maradona",
    "Cristiano Ronaldo",
    "Henrikh Mkhitaryan",
    "Zinedine Zidane",
    "Sergio Ramos",
    "Lukas Podolski",
    "Manuel Neuer",

];

function makeButtons() {
    $('#player-button').empty();
    for (var i = 0; i < players.length; i++) {
        var btn = $('<button>');
        btn.addClass("player-btn");
        btn.attr("data-name", players[i]);
        btn.text(players[i]);
        $('#player-button').append(btn);

    }
}

makeButtons();

function aboutPlayer() {
    var apiKey = "MrqWaVNJjj1NZq05zK8EQhWWu2LAeOie";
    var limit = 10;
    var player = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=" + apiKey + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var result = response.data;
        console.log(result);
        $('#player-view').empty();

        var playerSecton = $("<section class='players-result'>");

        for (var i = 0; i < result.length; i++) {
            var imgDiv = $("<div class='player-result'>");
            var imgView = result[i].images.fixed_height.url;
            var imgStill = result[i].images.fixed_height_still.url;
            // console.log(imgView);

            var imgGif = $("<img>");
            imgGif.attr("src", imgStill);
            imgGif.attr("data-animate", imgView);
            imgGif.attr("data-still", imgStill);
            imgGif.attr("data-state", "still");
            imgGif.on('click', animate)


            var rate = result[i].rating;


            var playerRate = $('<p>').text("Rating: " + rate);

            imgDiv.prepend(imgGif);
            imgDiv.prepend(playerRate);

            playerSecton.prepend(imgDiv);

            $('#player-view').prepend(playerSecton);
        }
    });
};


function animate() {
    var state = $(this).attr('data-state')
    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
}


$("#new-player").on("click", function(event) {
    event.preventDefault();

    player = $('#player-input').val().trim();

    if (player === "") {
        alert("Please Add Player Name!")
    } else {
        players.push(player);
        console.log(players);

        makeButtons();
    }

});

$(document).on("click", ".player-btn", aboutPlayer);