// Start Gradient background    
var gradient = new Gradient()
gradient.initGradient('#gradient-canvas');

var gradient = new Gradient()
gradient.initGradient('#site-title-background');

var gradient = new Gradient()
gradient.initGradient('#footer-background');

// Icebreaker tile height 
$(document).ready(function() {
    // Check if the screen width is 991.98px or larger
    if ($(window).width() >= 991.98) {
      // Get the height of .front-card including padding
      const frontCardHeight = $(".front-card").outerHeight();
      // Set the height of .icebreaker-tile to the height of .front-card
      $(".icebreaker-tile").height(frontCardHeight);
    }
  });

// Project cards & case study 
$(document).ready(function() {
    var projectCards = $(".project-card-wrapper");
    var caseStudies = $(".case-study");
    var isOpen = [false, false, false, false];
    var colors = ["#151515", "#151515", "#151515", "#151515"];

    function playHoverAnimation(index) {
        // Play the hover animation if the card is not open
        if (!isOpen[index]) {
            var card_hover = gsap.timeline({ paused: true });

            // Apply the staggered rotation animation
            card_hover.to(projectCards.eq(index).find(".front-card, .accordion-1, .accordion-2, .accordion-3"), {
                stagger: {
                    each: 0.02,
                    from: "start",
                    ease: "back.out",
                },
                duration: 0.3,
                ease: "back.out",
                rotateX: function (i) {
                    return -45 + i * 10;
                },
                scaleY: 1.05,
            });

            card_hover.play();
        }
    }

    function reverseHoverAnimation(index) {
        // Reverse the hover animation if the card is not open
        if (!isOpen[index]) {
            var card_hover = gsap.timeline({ paused: true });

            // Apply the staggered rotation animation in reverse
            card_hover.to(projectCards.eq(index).find(".front-card, .accordion-1, .accordion-2, .accordion-3"), {
                stagger: {
                    each: 0.02,
                    from: "end",
                    ease: "circ.out",
                },
                duration: 0.3,
                ease: "circ.out",
                rotateX: 0,
                scaleY: 1,
            });

            card_hover.play();
        }
    }

    projectCards.each(function(index) {
        $(this).hover(
            function() {
                playHoverAnimation(index);
            },
            function() {
                reverseHoverAnimation(index);
            }
        );

        $(this).click(function() {
            console.log("Clicked Card " + (index + 1) + "!");
            var caseStudy = caseStudies.eq(index);
            var frontCard = projectCards.eq(index).find(".front-card");
            var projectDescription = projectCards.eq(index).find(".project-description");

            if (isOpen[index]) {
                // Collapse the project description
                projectDescription.slideUp(300, function() {
                    frontCard.css({height: "fit-content", "background-color": "rgb(23,23,24)"}); // Reset front-card height
                    console.log("Animation completed!");
                });
            } else {
                // Reverse the hover animation if the card is not open and is clicked
                reverseHoverAnimation(index);
                // Expand the project description
                frontCard.css({"height": "fit-content", "background-color": colors[index]}); // Set front-card height to auto & set background color based on the index
                projectDescription.slideDown(300, function() {
                    console.log("Animation completed!");
                });
            }
            if (isOpen[index]) {
                caseStudy.slideUp(300, function() {
                caseStudy.css({ overflow: "hidden", height: "0", display: "none" }); // Change overflow to hidden after slideUp
                frontCard.css("background-color", "#151515"); //reset the background color
                console.log("Animation completed!");
            });
            } else {
            // Reverse the hover animation if the card is not open and is clicked
            reverseHoverAnimation(index);
            caseStudy.slideDown(300, function() {
                caseStudy.css({ overflow: "auto", height: "auto", display: "flex" }); // Change overflow to auto after slideDown
                console.log("Animation completed!");
            });
            }

            isOpen[index] = !isOpen[index];
        });
    });
});

// CHAT INTERACTIONS 

// Array to store chat history
var chatHistory = [];

// Function to display chat history
function displayChatHistory() {
    $("#chat-display").empty(); // Clear existing chat messages
    chatHistory.forEach(function (chat) {
        var messageClass = chat.type === "user" ? "user-message" : "bot-message";
        $("#chat-display").append("<div class='" + messageClass + "'>" + chat.message + "</div>");
    });
}

// WORKING CODE STARTS HERE, EXPERIMENTAL HIDE ON SCROLL STARTS BELOW THIS COMMENT

// $(document).ready(function() {
//     $("#chat-form").submit(function(event) {
//         event.preventDefault();

//         // Get user input
//         var userMessage = $("#user-input").val().trim();
//         if (userMessage === "") {
//             return;
//         }

//         // Display user message in the chat display area
//         $("#chat-display").append("<div class='user-message'>" + userMessage + "</div>");

//         // Add user message to chat history
//         chatHistory.push({ type: "user", message: userMessage });

//         // Uncomment the following section to send the user message to the Python backend via API
//         // $.ajax({
//         //     type: "POST",
//         //     url: "http://127.0.0.1:5000/api/chat",  // Replace with your Python server URL
//         //     data: JSON.stringify({ "message": userMessage }),
//         //     contentType: "application/json",
//         //     dataType: "json",
//         //     success: function(response) {
//         //         // Display chatbot's response in the chat display area
//         //         var botResponse = response.response;
//         //         $("#chat-display").append("<div class='bot-message'>" + botResponse + "</div>");

//         //         // Add chatbot's response to chat history
//         //         chatHistory.push({ type: "bot", message: botResponse });

//         //         // Clear the user input field and reset its height
//         //         $("#user-input").val("");
//         //         $("#user-input").css("height", "");

//         //         // Scroll down to display the most recent messages
//         //         var chatDisplay = document.getElementById("chat-display");
//         //         chatDisplay.scrollTop = chatDisplay.scrollHeight;
//         //     },
//         //     error: function(error) {
//         //         console.error("Error sending message:", error);
//         //     }
//         // });
        
//         // Create a new div for the bot message and hide it initially
//         var botMessage = $("<div class='bot-message'></div>").hide();
        
//         // Append the bot message container to the chat display and show it
//         $("#chat-display").append(botMessage);
        
//         // Generate a placeholder response (for testing purposes)
//         var placeholderResponse = "This is a placeholder response to: " + userMessage;
        
//         // Split the response into individual words
//         var words = placeholderResponse.split(" ");
          
//         // Set white-space property to preserve line breaks
//         botMessage.css("white-space", "pre-wrap");
          
//         // Loop through each word and append it to the bot message
//         $.each(words, function(index, word) {
//             // Create a new span for the word, hide it initially
//             var wordSpan = $("<span class='bot-word'></span>").text(word).hide();
            
//             // Append the word to the bot message
//             botMessage.append(wordSpan);
            
//             // Add space after each word except the last one
//             if (index < words.length - 1) {
//                 botMessage.append(" ");
//             }
            
//             // Fade in the word
//             wordSpan.delay(index * 200).fadeIn(300); // Delay and duration can be adjusted
//         });
        
//         // Show the bot message and calculate its total height
//         botMessage.show();
//         var botMessageHeight = botMessage.outerHeight();

//         // Scroll down to display the most recent messages along with the new message
//         var chatDisplay = document.getElementById("chat-display");
//         chatDisplay.scrollTop = chatDisplay.scrollHeight + botMessageHeight;

//         // Add the placeholder response to chat history (for testing purposes)
//         chatHistory.push({ type: "bot", message: placeholderResponse });

//         // Clear the user input field and reset its height
//         $("#user-input").val("");
//         $("#user-input").css("height", "");
//     });

//     // Adjust input field height to grow up to three lines with a vertical scrollbar
//     $("#user-input").on("input", function() {
//         this.style.height = "auto";
//         this.style.height = (this.scrollHeight) + "px";
//     });
// });


// HIDE ALL MESSAGES ON SCROLL EXPERIMENT STARTS HERE

$(document).ready(function() {
    // Variable to keep track of whether chat display is scrolled down
    var isScrolledDown = false;

    // Function to check if chat display is scrolled down
    function checkScroll() {
        isScrolledDown = $("#chat-display")[0].scrollHeight - $("#chat-display").scrollTop() === $("#chat-display").outerHeight();
    }

    // Initialize the variable and attach the scroll event handler
    checkScroll();
    $("#chat-display").on("scroll", checkScroll);

    $("#chat-form").submit(function(event) {
        event.preventDefault();

        // Get user input
        var userMessage = $("#user-input").val().trim();
        if (userMessage === "") {
            return;
        }

        // Hide all previous messages if chat display is not scrolled down
        if (!isScrolledDown) {
            $(".user-message, .bot-message").hide();
        }

        // Display user message in the chat display area
        $("#chat-display").append("<div class='user-message'>" + userMessage + "</div>");

        // Scroll to the top of the chat display
        var chatDisplay = document.getElementById("chat-display");
        chatDisplay.scrollTop = 0;

        // Add user message to chat history
        chatHistory.push({ type: "user", message: userMessage });

        // Generate a placeholder response (for testing purposes)
        var placeholderResponse = "This is a placeholder response to: " + userMessage;

        // Split the response into individual words
        var words = placeholderResponse.split(" ");

        // Create a new div for the bot message and hide it initially
        var botMessage = $("<div class='bot-message'></div>").hide();

        // Set white-space property to preserve line breaks
        botMessage.css("white-space", "pre-wrap");

        // Append the bot message container to the chat display and show it
        $("#chat-display").append(botMessage);
        botMessage.show();

        // Loop through each word and append it to the bot message
        $.each(words, function(index, word) {
            // Create a new span for the word, hide it initially
            var wordSpan = $("<span class='bot-word'></span>").text(word).hide();

            // Append the word to the bot message
            botMessage.append(wordSpan);

            // Add space after each word except the last one
            if (index < words.length - 1) {
                botMessage.append(" ");
            }

            // Fade in the word
            wordSpan.delay(index * 200).fadeIn(300); // Delay and duration can be adjusted
        });

        // Clear the input field
        $("#user-input").val("");
    });

    // Show previous messages when chat display is scrolled down
    function showPreviousMessages() {
        if (isScrolledDown) {
            $(".user-message, .bot-message").show();
        }
    }

    // Attach a click event to the chat display to show previous messages
    $("#chat-display").on("click", showPreviousMessages);
});

// EXPERIMENT ENDS HERE

// Icebreaker tile copy on click
$(document).ready(function() {
    $(".icebreaker-tile").click(function() {
        // Get the h4 text from the clicked tile
        var h6Text = $(this).find("div.copy-text").text();
        // Insert the h6 text into the chat input field
        $("#user-input").val(h6Text);
        // Submit the chat form
        $("#chat-form").submit();
        // Show the overlay with "Copied to clipboard" message and hide the original text
        $(this).addClass("copied");
        setTimeout(function() {
        $(this).removeClass("copied");
        }.bind(this), 1500);
    });
});

// MOBILE NAV

// Check if the screen size is less than or equal to 767.98px (mobile devices)
$(document).ready(function() {
    // Click event for .projects-link
    $(".projects-link").click(function(e) {
        e.preventDefault();
        // Show Projects section
        $(".projects-wrapper").show();
        // Show Site-title 
        $(".site-title-wrapper").show();
        // Hide footer 
        $(".footer-wrapper").hide();
        // Hide Chat section
        $(".aside-wrapper").css("display","none");
        // Enable overflow on .main
        $(".main").css("overflow","auto")
        // Animate active link to highlight projects-link
        $(".active-link").css("transform", "translate(0%)");
    });

    // Click event for .chat-link
    $(".chat-link").click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0}, 0);
        // Show Chat section
        $(".aside-wrapper").css("display","flex");
        // Hide Projects section
        $(".projects-wrapper").hide();
        // Hide site title 
        $(".site-title-wrapper").hide();
        // Hide footer
        $(".footer-wrapper").hide();
        // Hide overflow on .main
        $(".main").css("overflow","hidden")
        // Animate active link to highlight chat-link
        $(".active-link").css("transform", "translate(calc(101%))");
    });

    // Click event for .about-link
    $(".about-link").click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0}, 0);
        // Show Chat section
        $(".footer-wrapper").css("display","grid");
        // Hide Projects section
        $(".projects-wrapper").hide();
        // Hide Chat section and reset flex direction
        $(".aside-wrapper").css("display","none");
        // Show title
        $(".site-title-wrapper").hide();
        // Hide overflow on .main
        $(".main").css("overflow","auto")
        // // Animate active link to highlight about-link
        $(".active-link").css("transform", "translate(203%)");
    });
});

// ICEBREAKER MOBILE INTERACTIONS 

// show icebreakers wrapper on menu-button click
$(document).ready(function() {
    $(".icebreaker-menu-button").click(function() {
        // Show the icebreaker menu
        $(".icebreakers-wrapper").css("display", "flex");
        
        // Animate the slide up effect
        $(".icebreakers-wrapper").animate({ bottom: "0" }, 500);
    });
});

// hide icebreakers wrapper on close-button click
$(document).ready(function() {
    $(".close-icebreaker-button").click(function() {
        console.log("button click!")
        // Animate the slide down effect to hide the menu
        $(".icebreakers-wrapper").animate({ bottom: "-100%" }, 500, function() {
            // Once the animation is complete, hide the menu
            $(".icebreakers-wrapper").css("display", "none");
        });
    });
});

// hide icebreakers wrapper on icebreaker-tile click
$(document).ready(function() {
    // Check if the screen width is 991.98px or larger
    if ($(window).width() <= 991.98) {
        $(".icebreaker-tile").click(function() {
            // Animate the slide down effect to hide the menu
            $(".icebreakers-wrapper").animate({ bottom: "-100%" }, 500, function() {
                // Once the animation is complete, hide the menu
                $(".icebreakers-wrapper").css("display", "none");
            });
        });
    }
  });

// Accurate VH calculation from CSS Tricks TY!
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });