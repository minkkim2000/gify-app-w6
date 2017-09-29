// Initial array of keywords
var keywordsArray = [];
var userKeyword;



// WHEN SUBMIT BUTTON IS CLICKED: new button is created and added to list
$("#add-keyword-btn").on("click", function(event){
	event.preventDefault();
	var userKeyword = $("#keyword-input").val().trim();
	keywordsArray.push(userKeyword);
	console.log(userKeyword);
	renderButtons();
});


// Making Buttons adding properties
function renderButtons() {
	$("#keywordButtons").empty();
	for (var i = 0; i < keywordsArray.length; i++) {

		var randomButtonClassList = ["btn btn-primary", "btn btn-success", "btn btn-danger", "btn btn-warning", "btn btn-info"]
		// mb = MAKE BUTTONS lol
		var mb = $("<button>");
		mb.addClass(randomButtonClassList[Math.floor(Math.random()*randomButtonClassList.length)]);
		mb.addClass("keyword");
		mb.attr("data-name", keywordsArray[i]);
		mb.attr("width='248px'");
		mb.attr("type", "submit");
		mb.text(keywordsArray[i]);
		$("#keywordButtons").prepend(mb);
	}
}


// grabbing info and displaying GIFS when clicking the buttons
$(document).on("click", ".keyword", function(event) {
	event.preventDefault();
    var userKeyword = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userKeyword + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
            })
        	.done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
            	var gifDiv = $("<div class='gifgifgif'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifs = $("<img>").attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(gifs);

                $("#gif-results").prepend(gifDiv);
            }
				
                });
    }); 

$(".gif").on("click", function() {
      var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", $(this).attr("data-still"));
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
