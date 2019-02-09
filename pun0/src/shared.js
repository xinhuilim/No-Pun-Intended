console.log("listening");

var typedWord = '';
window.addEventListener('keypress', function(e){
  var c = String.fromCharCode(e.keyCode);
  typedWord += c.toLowerCase();
  if(e.keyCode==32) typedWord = typedWord.slice(-1);
  console.log(typedWord);
//  const response = await fetch('url');
});


console.log(typedWord);


//const response = await fetch('*')
//const process = await response.json()


if (e.keyCode==96){
	//popup
	
}

// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events. 
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, selection);
  }
}, false);


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  bubbleDOM.innerHTML = selection;
  bubbleDOM.style.top = mouseY + 'px';
  bubbleDOM.style.left = mouseX + 'px';
  bubbleDOM.style.visibility = 'visible';
}




/* chrome.browserAction.onClicked.addListener(
    function(tab){
    chrome.browserAction.setTitle({title :"Hi"});
}); */