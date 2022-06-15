// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  function simpleLiker() {
    // Define Variables
    const heartButtons = document.querySelectorAll(".like-glyph");
    const errorBanner = document.querySelector("#modal");

    // Targeting buttons & adding event listener(s)
    heartButtons.forEach((heart) => {
      console.log(heart);
      heart.addEventListener("click", () => {
        mimicServerCall()
          .then((response) => {
            console.log(response);
            // *Note: Need to use 'contains' because it is a DOM Token*
            // Set a variable for an active heart (button that is clicked)
            const activeHeart = heart.classList.contains("activated-heart");

            // *If statement that will remove the active heart (outline) & make it empty
            // if clicked/active. If not already active it will fill the heart and
            // make it active*

            if (activeHeart) {
              heart.classList.remove("activated-heart");
              heart.innerHTML = EMPTY_HEART;
            } else {
              heart.classList.add("activated-heart");
              heart.innerHTML = FULL_HEART;
            }
          })
          .catch((error) => {
            // Display the error message that is hidden within html
            // Target the id w/in the html & remove .hidden
            errorBanner.classList.remove("hidden");
            console.log(error);

            // setTimeout - add .hidden back after 3 seconds
            setTimeout(() => errorBanner.classList.add("hidden"), 3000);
          });
      });
    });
  }
  simpleLiker();
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

