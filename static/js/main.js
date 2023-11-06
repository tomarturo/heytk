// Start Gradient background    
// var gradient = new Gradient()
// gradient.initGradient('#gradient-canvas');

// var gradient = new Gradient()
// gradient.initGradient('#site-title-background');

var gradient = new Gradient()
gradient.initGradient('#overview_tile');

function showWelcomeMessage() {
    var welcomeMessage = $("#welcome-message");
    var welcomeText = "Hi! I'm here to answer your questions about Tom.\nWhat would you like to know?";
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

// Exploring page load aniamtion once with cookies ... Check if a cookie with a specific name exists
// function checkCookie(name) {
//     return document.cookie.split(';').some((item) => item.trim().startsWith(name + '='));
// }

// $(document).ready(function() {
//     if (!checkCookie("pageLoadedOnce")) {
//         // This code will only run if the "pageLoadedOnce" cookie doesn't exist

//         $("#loading-wrapper > div").addClass("animate");
//         var cursor = $("#cursor"); // Assuming you have an element with ID "cursor"
//         cursor.show();

//         setTimeout(function() {
//             $("#loading-wrapper").hide();
//             $("body").css("overflow", "auto");
//         }, 2000);

//         setTimeout(function() {
//             showWelcomeMessage();
//         }, 4000);

//         // Set a cookie to indicate that the function has run once
//         document.cookie = "pageLoadedOnce=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
//     }
// });

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

//Password prompt 
document.getElementById("open-prompt").addEventListener("click", function () {
    const userInput = prompt("Enter the password to view this project:");
    
    if (userInput !== null && userInput.toLowerCase() === "password") {
        const passwordWrapper = document.getElementById("password-wrapper");
        passwordWrapper.classList.remove("hidden");
        const passwordScrim = document.getElementById("password-scrim");
        passwordScrim.remove()
    }
});

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