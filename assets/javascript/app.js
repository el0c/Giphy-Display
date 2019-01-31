// Add Giphy API and Vars
let numGIFs = 9;
const api_url = `https://api.giphy.com/v1/gifs/search?api_key=u4jXl5UG0A6CjuZ37rjIOBxkEVetiof9&limit=${numGIFs}&q=`;

// Define default topics search topics
    var topics = ["hackers", "pride", "vr", "norml"];

function getGIFs(query) {
    $.ajax({
        "url"   : api_url + query,
        "method": "GET"

    }).done(response => {
        // Reset the event handler
        $(document).off("click", ".image_container");

        let output = "";

        response.data.forEach(r => {
            output += `<div class="image_container">
                           <img src="${r.images.fixed_width_still.url}" height="150">
                           <span class="rating">Rating: ${r.rating.toUpperCase()}</span>
                       </div>`;
        });
        console.log(query);
        // Send output to the id=searchResults <seciton>
        $("#searchResults").html(output);

    });
}


function renderButtons() {  
// Delete buttons before adding new buttons to prevent duplicates
    $("#searchTopics").empty();
  
// Go through the array of movies
    for (var i = 0; i < topics.length; i++) {
// Add buttons to #searchTopics 
    var a = $("<button>");
// Add "type=button"
    a.attr("type", "button");
// Add "class= btn btn-secondary"
    a.attr("class", "btn btn-secondary topics")
// Add a specific id for the button based on the topic name
    // a.attr("id", topics[i]);
// Set Button Text
    a.text(topics[i]); 
// Add the bootstrap button to the searchTopics section in the HTML
    $("#searchTopics").append(a);
    }
}

$("#btnTopicSubmit").on("click", function(submit) {
// Prevent form submitting itself
    submit.preventDefault();
// Grab input from textbox
    var topic = $(".form-control").val().trim();
// Push it to the array and disable to button until the next keyup event in the $(document).ready function    
    topics.push(topic.toLowerCase());
    console.log(this.value + "Value pushed to array. Emptying textbox and disabling button.")
    $(".form-control").val("");
    $("#btnTopicSubmit").prop("disabled", true);
    $(".topics").off("click");


// Call renderButtons();
    renderButtons();
});
 
$(document).ready (function () {
    renderButtons();

    $("#btnTopicSubmit").prop("disabled", true);
    
    // Bugfix for holding the key down and being able to click the button and add a duplicate before the code was executed.
    $(".form-control").keydown(function() {
        console.log("Keydown!")
        $("#btnTopicSubmit").prop("disabled", true); 
    });
    $(".form-control").keyup(function() {
        console.log("Keyup!")
        // Check to see if the value of the textbox contains a value already in the array
        if (topics.includes(this.value.toLowerCase().trim())) {
            $("#btnTopicSubmit").prop("disabled", true); 
            console.log(this.value + " already exists. Disabling button.");   
        // Check to see if the textbox contains no text, and disable the button if that's the case.
        } else if (this.value.trim().length === 0 ) {
            console.log(this.value + "Textbox has no value, Disabling button.")
            $("#btnTopicSubmit").prop("disabled", true); 
        // If none of the conditions are met, enable the button. 
        } else {
            console.log(this.value +" does not exist, enabling button.")
            $("#btnTopicSubmit").prop("disabled", false); 
        }
    });

    // If a topic button is clicked
    $(".topics").on("click", function() {
        // Set Query to the text of the button, lowercased.
        const query = $(this).text().toLowerCase();
        // Get GIFs with the query.
        getGIFs(query);
    });
});