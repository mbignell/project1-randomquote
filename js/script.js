// event listener to respond to "Show another quote" button clicks (swapped for mousedown to fix the button not responding)
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("mousedown", buttonClick, false);

// Sets global variable to keep track of current quote
var currentQuoteIndex = 0;

// Function : Return random quote from array
function getRandomQuote() {
  // Generates a random number that we'll use as an Index on the array
  var randomIndex = Math.floor(Math.random() * (quotes.length));

  // If it's the same as the current quote, get a new number
  while (currentQuoteIndex == randomIndex) {
    randomIndex = Math.floor(Math.random() * (quotes.length));
  }

  // Set Current Index to New Index
  currentQuoteIndex = randomIndex;

  // Return the quote object
  return quotes[randomIndex];
};

// Function : Returns a random hex code that I don't use because
// 1. it'd be ugly and
// 2. be weirdly removed from the quote association
// But here's just an example of *how* I'd do it.
function getRandomColor() {
  var characters = '0123456789ABCDEF';
  var hex = '#';
  for (var i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return hex;
}

// Function : Creates HTML block and prints to page
function printQuote() {
  // Calls getRandomQuote and stores object in a variable
  var currentQuote = getRandomQuote();

  // Begins to construct the HTML we'll add in
  var quoteHTML = "<p class=\"quote\">" + currentQuote.quote + "</p>";

  // Opens source paragraph and adds source
  quoteHTML += '<p class="source">' + currentQuote.source;

  // Add Citation if it exists
  if (currentQuote.citation) {
    quoteHTML += '<span class="citation">' + currentQuote.citation + '</span>';
  };

  // Add Date if it exists
  if (currentQuote.date) {
    quoteHTML += '<span class="year">' + currentQuote.date + '</span>';
  };

  // Closes source paragraph whether or not citations and dates were added
  // Opens tag div
  quoteHTML += '</p> <div class="tags">';

  // If there are tags in the object, add each one in the array as a link
  if (currentQuote.tags) {
    var currentTags = currentQuote.tags;
    for(i in currentTags) {
      var tagHTML = '<a href="#whatever" class="tag">' + currentTags[i] + '</a>';
      quoteHTML += tagHTML;
    }
  }

  // Closes Tags div
  quoteHTML += '</div>';

  // Change background and text colors based on the colors associated to the object literal.
  // First line specifically changes the root css variable, and second line the body's background-image (a gradient);
  document.documentElement.style.setProperty('--main-color', currentQuote.bgcolor);
  var string = 'background-image: ' + currentQuote.bggradient + '; background-image:  -webkit-' + currentQuote.bggradient + ';';
  document.getElementsByTagName('body')[0].style.cssText = string;

  // Displays created HTML on page
  document.getElementById('quote-box').innerHTML = quoteHTML;

  return;
};

// When the page load, it selects a random quote to display
window.onload = printQuote();

// Create interval to let quotes change every 10 seconds.
var interval;
interval = setInterval(function(){
  printQuote();
},10000);

// Adds restarting the interval to the original PrintQuote button click
function buttonClick() {
  printQuote();
  // Clears JavaScript interval
  clearInterval(interval);
  // Restarts CSS animation to match button click
  var loadingBar = document.getElementById('loadingQuote')
  loadingBar.classList.remove("loadingQuoteAnimate");
  interval = setInterval(function(){
    loadingBar.classList.add("loadingQuoteAnimate");
  },1);
  // Restarts JavaScript Interval
  interval = setInterval(function(){
    printQuote();
  },10000);
};
