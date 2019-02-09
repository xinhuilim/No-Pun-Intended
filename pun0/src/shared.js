/* var typedWord = '';
 * window.addEventListener('keypress', function(e){
 *   var c = String.fromCharCode(e.keyCode);
 *   typedWord += c.toLowerCase();
 *   if(e.keyCode==32) typedWord = typedWord.slice(-1);
 *   console.log(typedWord);
 *   renderBubble(e.clientX, e.clientY, typedWord);
 * //  const response = await fetch('url');
 * }); */

var inputs = document.getElementsByTagName('input');
for (var index = 0; index < inputs.length; ++index) {
  var input = inputs[index]

  input.addEventListener('focus', function(e) {
    // create bubble
    var bubble = getBubble(e.target)
    if (!bubble) {
      bubble = createBubble(e.target)
    }
    updateBubble(bubble, e)
  })

  input.addEventListener('blur', function(e) {
    // kill bubble
    deleteBubble(e.target)
  })

  input.addEventListener('input', function(e) {
    var bubble = getBubble(e.target)
    if (!bubble) {
      bubble = createBubble(e.target)
    }
    updateBubble(bubble, e)
  }, true);
}

//const response = await fetch('*')
//const process = await response.json()

// Add bubble to the top of the page.
/* var bubbleDOM = document.createElement('div');
 * bubbleDOM.setAttribute('class', 'selection_bubble');
 * document.body.appendChild(bubbleDOM); */

// Lets listen to mouseup DOM events.
/* document.addEventListener('mouseup', function (e) {
 *   var selection = window.getSelection().toString();
 *   if (selection.length > 0) {
 *     renderBubble(e.clientX, e.clientY, selection);
 *   }
 * }, false);
 * 
 * 
 * // Close the bubble when we click on the screen.
 * document.addEventListener('mousedown', function (e) {
 *   bubbleDOM.style.visibility = 'hidden';
 * }, false);
 *  */
function createBubble(elem) {
  var bubbleDom = document.createElement('div');
  bubbleDom.className = 'selection_bubble'
  elem.parentNode.appendChild(bubbleDom);
  return bubbleDom
}

function deleteBubble(elem) {
  var bubble = getBubble(elem)
  if (bubble) {
    elem.parentNode.removeChild(bubble)
  }
}

function getBubble(elem) {
  var children = elem.parentNode.children

  var bubble = null
  for (var i = 0; i < children.length; ++i) {
    var e = children[i]
    if (e.className == 'selection_bubble') {
      bubble = e
      break
    }
  }

  return bubble
}

function updateBubble(bubble, event) {
  var elem = event.target
  bubble.innerHTML = elem.value
  /* console.log(event)
   * console.log(bubble) */

  var elemSize = elem.getBoundingClientRect()
  var bubbleSize = bubble.getBoundingClientRect()

  var elemStyle = window.getComputedStyle(elem);

  var currTop = parseInt(bubble.style.top, 10)
  var currLeft = parseInt(bubble.style.left, 10)

  bubble.style.fontSize = elemStyle.fontSize
  bubble.style.fontFamily = elemStyle.fontFamily

  Object.assign(bubble.style, elemStyle)

  /* bubble.style.top = (elemSize.top - bubbleSize.top + currTop) + 'px'
   * bubble.style.left = (elemSize.left - bubbleSize.left + currLeft) + 'px' */
}

console.log('Extension Loaded')

