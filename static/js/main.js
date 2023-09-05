// Start Gradient background    
var gradient = new Gradient()
gradient.initGradient('#gradient-canvas');

var gradient = new Gradient()
gradient.initGradient('#site-title-background');

var gradient = new Gradient()
gradient.initGradient('#footer-background');

function showWelcomeMessage() {
    var welcomeMessage = $("#welcome-message");
    var welcomeText = "Hi! I'm here to answer your questions about Tom. What would you like to know?";
    var welcomeWords = welcomeText.split(" ");
    welcomeMessage.css("white-space", "pre-wrap");
    var cursor = $("#cursor"); // Assuming you have an element with ID "cursor"
    cursor.hide();

    $.each(welcomeWords, function(index, word) {
        // Create a new span for the word, hide it initially
        var wordSpan = $("<span class='welcome-word'></span>").text(word).css("opacity", 0);
        
        // Append the word to the bot message
        welcomeMessage.append(wordSpan);
        
        // Add space after each word except the last one
        if (index < welcomeWords.length - 1) {
            welcomeMessage.append(" ");
        }   
        
        // Fade in the word
        wordSpan.delay(index * 50).animate({ opacity: 1 }, 300);
    });
}

$(window).on("load", function() {
    $("#loading-wrapper > div").addClass("animate");
    var cursor = $("#cursor"); // Assuming you have an element with ID "cursor"
    cursor.show();
    
    setTimeout(function() {
        $("#loading-wrapper").hide();
        $("body").css("overflow", "auto");
    }, 2000);

    setTimeout(function() {
        showWelcomeMessage();
    }, 4000);
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
            var caseStudy = caseStudies.eq(index);
            var frontCard = projectCards.eq(index).find(".front-card");
            var projectDescription = projectCards.eq(index).find(".project-description");

            if (isOpen[index]) {
                // Collapse the project description
                projectDescription.slideUp(300, function() {
                    frontCard.css({height: "fit-content", "background-color": "rgb(23,23,24)"}); // Reset front-card height
                });
            } else {
                // Reverse the hover animation if the card is not open and is clicked
                reverseHoverAnimation(index);
                // Expand the project description
                frontCard.css({"height": "fit-content", "background-color": colors[index]}); // Set front-card height to auto & set background color based on the index
                projectDescription.slideDown(300, function() {
                });
            }
            if (isOpen[index]) {
                caseStudy.slideUp(300, function() {
                caseStudy.css({ overflow: "hidden", height: "0", display: "none" }); // Change overflow to hidden after slideUp
                frontCard.css("background-color", "#151515"); //reset the background color
            });
            } else {
            // Reverse the hover animation if the card is not open and is clicked
            reverseHoverAnimation(index);
            caseStudy.slideDown(300, function() {
                caseStudy.css({ overflow: "auto", height: "auto", display: "flex" }); // Change overflow to auto after slideDown
            });
            }

            isOpen[index] = !isOpen[index];
        });
    });
});

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
        chatDisplay.append("<div class='user-message'>" + userMessage + "</div>");
        
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
                var botMessage = $("<div class='bot-message'>").css("opacity", 0);
                
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

// MOBILE NAV

// Check if the screen size is less than or equal to 767.98px (mobile devices)
$(document).ready(function() {
    var projectsWrapper = $(".projects-wrapper");
    var footerWrapper = $(".footer-wrapper");
    var asideWrapper = $(".aside-wrapper");
    var activeLink = $(".active-link");
    var siteTitleWrapper = $(".site-title-wrapper");
    var mainContent = $(".main");
    var asideAbsolute = $(".aside-absolute");
    // Click event for .projects-link
    $(".projects-link").click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0}, 0);
        // Show Projects section
        projectsWrapper.show();
        // Show Site-title 
        siteTitleWrapper.show();
        // Hide footer 
        footerWrapper.show();
        // Hide Chat section
        asideWrapper.css("display","none");
        // Enable overflow on .main
        mainContent.css("overflow","auto")
        // Animate active link to highlight projects-link
        activeLink.css("transform", "translate(0%)");
    });

    // Click event for .chat-link
    $(".chat-link").click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0}, 0);
        // Modify aside absolute position wrapper;
        asideAbsolute.css({position: "relative", width: "100%"});
        // Show Chat section
        asideWrapper.css("display","flex");
        // Hide Projects section
        projectsWrapper.hide();
        // Hide site title 
        $(".site-title-wrapper").hide();
        // Hide footer
        footerWrapper.hide();
        // Hide overflow on .main
        mainContent.css("overflow","hidden")
        // Animate active link to highlight chat-link
        activeLink.css("transform", "translate(calc(101%))");
    });
});

// show icebreakers wrapper on menu-button click
$(document).ready(function() {
    $(".icebreaker-menu-button").click(function() {
        // Show the icebreaker menu
        $(".icebreakers-wrapper").css("display", "grid");
        
        // Animate the slide up effect
        $(".icebreakers-wrapper").animate({ bottom: "0" }, 500);
    });
});

// hide icebreakers wrapper on close-button click
$(document).ready(function() {
    $(".close-icebreaker-button").click(function() {

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

