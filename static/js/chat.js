
// Chat POST and display animations
$(document).ready(function() {
    var cursor = $("#cursor")
    var chatDisplay = $("#chat-display");
    function scrollDisplay() {
        chatDisplay.animate({"scrollTop": $('#chat-display')[0].scrollHeight}, 1000);
    }

    $("#chat-form").submit(function(event) {
        event.preventDefault();
    
        var userInput = $("#user-input").val();
        
        // Push data to the data layer
        dataLayer.push({
            event: 'chatFormSubmission',
            category: 'Form',
            action: 'Submit',
            label: userInput
        });

        // Get user input and trim
        var userMessage = $("#user-input").val().trim();
        if (userMessage === "") {
            return;
        }

        // Display user message in the chat display area
        chatDisplay.append("<div class='text-lg font-medium'>" + userMessage + "</div>");
        
        var userMessageHeight = $(".user-message").height();
        var currentScrollPosition = chatDisplay.scrollTop();
        var chatDisplayScrollHeight = chatDisplay.scrollHeight;
        chatDisplay.animate({ scrollTop: currentScrollPosition + userMessageHeight + 40 }, 1000);
        cursor.show() 
    

        var chatUrl = $("#user-input").attr('data-chat-url');
        $.ajax({
            type: "POST",
            url: chatUrl,
            data: JSON.stringify({"message": userMessage}),
            contentType: "application/json",
            dataType: "json",
            
            success: function(response_json) {

                // Get the bot response from the JSON
                var botResponse = response_json.response;
                
                // Create a new div for the bot message and hide it initially
                var botMessage = $("<div class='text-lg bot-message'>").css("opacity", 0);
                
                setTimeout(function() {
                // Append the bot message container to the chat display and show it
                chatDisplay.append(botMessage);
                botMessage.animate({ opacity: 1 }, 300);
                scrollDisplay();
                
                // Split the bot response into individual words
                var words = botResponse.split(" ");
                
                // Set white-space property to preserve line breaks
                botMessage.css("white-space", "pre-wrap");
                
                // Variable to keep track of completed iterations
                var completedIterations = 0;

                // Loop through each word and append it to the bot message
                setTimeout(function() {
                    cursor.hide()
                1800})

                    $.each(words, function(index, word) {
                        // Create a new span for the word, hide it initially
                        var wordSpan = $("<span class='bot-word'></span>").text(word).css("opacity", 0);
                        
                        // Append the word to the bot message
                        botMessage.append(wordSpan);
                        
                        // Add space after each word except the last one
                        if (index < words.length - 1) {
                            botMessage.append(" ");
                        }
                        
                        // Fade in the word
                        wordSpan.delay(index * 50).animate({opacity: 1}, 300, function() {
                            // Increment the completedIterations count
                            completedIterations++; 
                            
                            // Check if all iterations are complete
                            if (completedIterations === words.length) {
                                // All iterations are complete, perform actions after the loop                 
                                scrollDisplay();
                            }                    
                        });
                    });
                6000});
            },  
            
            error: function(error) {
                cursor.hide()
                if (error.responseJSON && error.responseJSON.error) {
                    var errorMessage = error.responseJSON.error;
                    
                    // Display error message in the chat display area
                    chatDisplay.append("<div class='bot-message'>" + errorMessage + "</div>");
                    
                    // Display error message in the console
                    console.error("Error sending message:", errorMessage);
                } else {
                    var genericErrorMessage = "😖 Ugh! An error occurred. Use the contact link to get in touch with Tom to continue your chat.";
                    
                    // Display generic error message in the chat display area
                    chatDisplay.append("<div class='bot-message'>" + genericErrorMessage + "</div>");
                    
                    // Display generic error message in the console
                    console.error("Error sending message:", genericErrorMessage);
                }
                scrollDisplay();
                
                setTimeout(function() {
                    cursor.hide()
                1800})
            }
        });

        // Clear the user input field and reset its height
        $("#user-input").val(" ");
        
    });
});

// Icebreaker tile submit on click
$(document).ready(function() {
    $(".icebreaker-tile").click(function() {
        // Get the h4 text from the clicked tile
        var tileText = $(this).find("div.tile-text").text();
        // Insert the h6 text into the chat input field
        $("#user-input").val(tileText);
        // Submit the chat form
        $("#chat-form").submit();
        // Animate the button
        
    });
});

