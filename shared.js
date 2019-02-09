<head>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>
</head>
  
console.log("listening");

var typedWord = '';
window.addEventListener('keypress', function(e){
  var c = String.fromCharCode(e.keyCode);
  typedWord += c.toLowerCase();
  highlight(typedWord);
  if(e.keyCode==32) typedWord = typedWord.slice(-1);
  console.log(typedWord);
//  const response = await fetch('url');
});


console.log(typedWord);


//const response = await fetch('*')
//const process = await response.json()

//highlight current word


function highlight(text) {
  var inputText = document.getElementById("inputText");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  if (index >= 0) { 
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   inputText.innerHTML = innerHTML;
  }
}


$(document).ready(function () {
    $(document).on("mouseup", ".conttext", function () {
        var highlight = window.getSelection();
        console.log(highlight);
        var spn = '<span class="highlight">' + highlight + '</span>';
        var text = $('.conttext').text();
        $('.conttext').html(text.replace(highlight, spn));
    });
    $(document).on("mouseover", ".highlight", function () {
        alert("You hovered on selected tex"); // Your tooltip code goes here
    })
});


if (mouseover==true){
//show bubble
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