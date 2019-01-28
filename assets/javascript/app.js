// Define default topics search topics
    var topics = ["hackersmovie", "pride", "VR", "norml"];
  
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
    a.attr("class", "btn btn-secondary")
// Set Button Text
    a.text(topics[i]); 
// Add the bootstrap button to the searchTopics section in the HTML
    $("#searchTopics").append(a);
    }
}

$("#btnTopicSubmit").on("click", function(event) {
// Prevent form submitting itself
    event.preventDefault();
// Grab input from textbox
    var topic = $(".form-control").val().trim();
// Push it to the array and disable to button until the next keyup event in the $(document).ready function
    topics.push(topic);
    $("#btnTopicSubmit").prop("disabled", true); 

// Call renderButtons();
    renderButtons();
});
 
$(document).ready (function () {
    renderButtons();
    $("#btnTopicSubmit").prop("disabled", true);
    $(".form-control").keyup(function () {
        // Check to see if the value of the textbox contains a value already in the array
        if (topics.includes(this.value.trim())) {
        $("#btnTopicSubmit").prop("disabled", true); 
        console.log(this.value);   
        // Check to see if the textbox contains no text, and disable the button if that's the case.
        } else if (this.value.trim().length === 0 ) {
        $("#btnTopicSubmit").prop("disabled", true); 
        // If none of the conditions are met, enable the button. 
        } else {
        $("#btnTopicSubmit").prop("disabled", false); 
        }
    });
});