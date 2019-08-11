var players = ["Pele", "Diego Maradona", "Ronaldinho", "Zinedine Zidane"];

function makeButtons() {
    $('#player-button').empty();
    for (var i = 0; i < players.length; i++) {
        var btn = $('<button>');
        btn.addClass("player");
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

        for (var i = 0; i < result.length; i++) {
            var imgDiv = $('<div>');
            var imgView = result[i].images.original.url;
            var imgStill = result[i].images.original_still.url;
            // console.log(imgView);

            var imgGif = $('<img>');
            imgGif.attr("src", imgStill);
            imgGif.attr("data-animate", imgView);
            imgGif.attr("data-still", imgStill);
            imgGif.attr("data-state", "still");
            $('#player-view').prepend(imgGif);
            imgGif.on('click', animate)


            var rate = result[i].rating;


            var playerRate = $('<p>').text("Rating is: " + rate);

            $('#player-view').prepend(playerRate);
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
    players.push(player);
    console.log(players);

    makeButtons();


});

$(document).on("click", ".player", aboutPlayer);