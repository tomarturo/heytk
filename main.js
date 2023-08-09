// Start Gradient background    
var gradient = new Gradient()
gradient.initGradient('#gradient-canvas');

var gradient = new Gradient()
gradient.initGradient('#site-title-background');

var gradient = new Gradient()
gradient.initGradient('#mobile-site-title-background');

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
// Array to store chat history
var chatHistory = [];

// Function to display chat history
function displayChatHistory() {
    $("#chat-display").empty(); // Clear existing chat messages
    chatHistory.forEach(function (chat) {
        var messageClass = chat.type === "user" ? "user-message" : "bot-message";
        $("#chat-display").append("<div class='" + messageClass + "'>" + chat.message + "</div>");
    });
    // Scroll down to display the most recent messages
    var chatDisplay = document.getElementById("chat-display");
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

$(document).ready(function() {
    $("#chat-form").submit(function(event) {
        event.preventDefault();

        // Get user input
        var userMessage = $("#user-input").val().trim();
        if (userMessage === "") {
            return;
        }

        // Display user message in the chat display area
        $("#chat-display").append("<div class='user-message'>" + userMessage + "</div>");

        // Add user message to chat history
        chatHistory.push({ type: "user", message: userMessage });

        // Uncomment the following section to send the user message to the Python backend via API
        // $.ajax({
        //     type: "POST",
        //     url: "http://127.0.0.1:5000/api/chat",  // Replace with your Python server URL
        //     data: JSON.stringify({ "message": userMessage }),
        //     contentType: "application/json",
        //     dataType: "json",
        //     success: function(response) {
        //         // Display chatbot's response in the chat display area
        //         var botResponse = response.response;
        //         $("#chat-display").append("<div class='bot-message'>" + botResponse + "</div>");

        //         // Add chatbot's response to chat history
        //         chatHistory.push({ type: "bot", message: botResponse });

        //         // Clear the user input field and reset its height
        //         $("#user-input").val("");
        //         $("#user-input").css("height", "");

        //         // Scroll down to display the most recent messages
        //         var chatDisplay = document.getElementById("chat-display");
        //         chatDisplay.scrollTop = chatDisplay.scrollHeight;
        //     },
        //     error: function(error) {
        //         console.error("Error sending message:", error);
        //     }
        // });

        // Generate a placeholder response (for testing purposes)
        var placeholderResponse = "This is a placeholder response to: " + userMessage;
        $("#chat-display").append("<div class='bot-message'>" + placeholderResponse + "</div>");

        // Add the placeholder response to chat history (for testing purposes)
        chatHistory.push({ type: "bot", message: placeholderResponse });

        // Clear the user input field and reset its height
        $("#user-input").val("");
        $("#user-input").css("height", "");

        // Scroll down to display the most recent messages
        var chatDisplay = document.getElementById("chat-display");
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    });

    // Adjust input field height to grow up to three lines with a vertical scrollbar
    $("#user-input").on("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });
});

// Icebreaker tile copy on click
$(document).ready(function() {
    $(".icebreaker-tile").click(function() {
        // Get the h4 text from the clicked tile
        var h6Text = $(this).find("h6.copy-text").text();

        // Create a temporary textarea element to copy text to clipboard
        var tempTextArea = $("<textarea>");
        tempTextArea.val(h6Text);
        $("body").append(tempTextArea);

        // Copy the text from the textarea to clipboard
        tempTextArea.select();
        document.execCommand("copy");

        // Remove the temporary textarea
        tempTextArea.remove();

        // Show the overlay with "Copied to clipboard" message and hide the original text
        $(this).addClass("copied");
        setTimeout(function() {
            $(this).removeClass("copied");
        }.bind(this), 1500);
    });
});

// Mobile nav 
// Check if the screen size is less than or equal to 767.98px (mobile devices)
    $(document).ready(function() {
        // Click event for .projects-link
        $(".projects-link").click(function(e) {
            e.preventDefault();
            // Show Projects section
            $(".projects-wrapper").show();
            // Show Site-title 
            $(".site-title-wrapper").show();
            // Restore title wrapper height 
            $(".site-title-wrapper").css("height", "42vh");
        // Show title contents
            $("#site-title-img").show();
            $("#site-title-details-img").show();
            // $("#chat-title-img").hide();
            // $("#chat-title-details-img").hide();
            // Hide footer 
            $(".footer-wrapper").hide();
            // Hide Chat section
            $(".aside-wrapper").hide();
            // Add active class to .projects-link
            $(this).addClass("active-link");
            // Remove active class from .chat-link
            $(".chat-link").removeClass("active-link");
            // Remove active class from .contact-link
            $(".contact-link").removeClass("active-link");
        });

        // Click event for .chat-link

        $(".chat-link").click(function(e) {
            e.preventDefault();
            // Show Chat section
            $(".aside-wrapper").show();
            // Hide Projects section
            $(".projects-wrapper").hide();
            // Hide footer
            $(".footer-wrapper").hide();
            // Hide title wrapper 
            $(".site-title-wrapper").hide();
            // Add active class to .chat-link
            $(this).addClass("active-link");
            // Remove active class from .projects-link
            $(".projects-link").removeClass("active-link");
            // Remove active class from .contact-link
            $(".contact-link").removeClass("active-link");
        });

        // Click event for .contact-link
        $(".contact-link").click(function(e) {
            e.preventDefault();
            // Show Chat section
            $(".footer-wrapper").show();
            // Hide Projects section
            $(".projects-wrapper").hide();
            // Hide Chat section
            $(".aside-wrapper").hide();
            // Show title
            $(".site-title-wrapper").show();
            // Add active class to .chat-link
            $(this).addClass("active-link");
            // Remove active class from .projects-link
            $(".projects-link").removeClass("active-link");
            $(".chat-link").removeClass("active-link");
        });
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



// Title background gradient color change
// const root = document.documentElement;
// const gradientDuration = 10000; // 10 seconds
// const interval = gradientDuration / 100; // 100 random colors
// let currentColorIndex = 0;
// let colors = [];

// // Generate an array of 100 random colors using chroma.js
// for (let i = 0; i < 100; i++) {
//     colors.push(chroma.random().hex());
// }

// function animateColorChange() {
//     const currentColor = colors[currentColorIndex];
//     const nextColor = colors[(currentColorIndex + 1) % colors.length];
//     const startTime = Date.now();

//     function updateColor() {
//     const currentTime = Date.now() - startTime;
//     const progress = currentTime / gradientDuration;
//     const interpolatedColor = chroma.mix(currentColor, nextColor, progress, 'hsl');
//     root.style.setProperty('--chroma-color', interpolatedColor.hex());

//     if (currentTime < gradientDuration) {
//         requestAnimationFrame(updateColor);
//     } else {
//         currentColorIndex = (currentColorIndex + 1) % colors.length;
//         animateColorChange();
//     }
//     }

//     updateColor();
// }

// // Start the color animation once the page loads
// window.addEventListener('load', () => {
//     animateColorChange();
// });


// Tilt image on hover

