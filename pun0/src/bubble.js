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

  /* input.addEventListener('focus', function(e) {
   *   // create bubble
   *   var bubble = getBubble(e.target)
   *   if (!bubble) {
   *     bubble = createBubble(e.target)
   *   }
   *   updateBubble(bubble, e)
   * }) */

  input.addEventListener('blur', function(e) {
    // kill bubble
    deleteBubble(e.target)
  })

  /* input.addEventListener('input', function(e) {
   *   var bubble = getBubble(e.target)
   *   if (!bubble) {
   *     bubble = createBubble(e.target)
   *   }
   *   updateBubble(bubble, e)
   * }, true); */

  input.addEventListener('mouseup', function(e) {

    setTimeout(function() {
      var elem = e.target

      var start = elem.selectionStart
      var end = elem.selectionEnd

      if (start != end) {
        var bubble = getBubble(e.target)
        if (!bubble) {
          bubble = createBubble(e.target)
        }

        var text = elem.value.substring(start, end)

        updateBubble(bubble, e, text)
      } else {
        deleteBubble(elem)
      }
    }, 1)
  })
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

  bubbleDom.addEventListener('click', async function(e) {
    var selected = e.target.innerHTML
    var allInput = elem.value

    fetch('').then(function (response) {
      return response.json()
    }).then(function (jsonValue) {
      console.log(jsonValue)
    })
  })
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

function updateBubble(bubble, event, text) {
  var elem = event.target
  bubble.innerHTML = text
  /* console.log(event)
   * console.log(bubble) */

  elem.parentNode.style.position = 'relative'

  /* var elemSize = elem.getBoundingClientRect() */
  var bubbleSize = bubble.getBoundingClientRect()

  var elemStyle = window.getComputedStyle(elem);

  bubble.style.fontSize = elemStyle.fontSize
  bubble.style.fontFamily = elemStyle.fontFamily

  /* Object.assign(bubble.style, elemStyle) */

  var parentSize = elem.getBoundingClientRect()

  var elemSize = getTextBoundingRect(elem, elem.selectionStart)

  console.log(elemSize)

  var currTop = parseFloat(bubble.style.top, 10)
  var currLeft = parseFloat(bubble.style.left, 10)

  bubble.style.bottom = (elemSize.bottom - parentSize.bottom + parseInt(elemStyle.fontSize, 10)) + 'px'
  bubble.style.left = (elemSize.left - parentSize.left) + 'px'

  /* console.log(elemSize.top - parentSize.top) */
  console.log(elemSize.left - parentSize.left)
}

// @author Rob W       http://stackoverflow.com/users/938089/rob-w
// @name               getTextBoundingRect
// @param input          Required HTMLElement with `value` attribute
// @param selectionStart Optional number: Start offset. Default 0
// @param selectionEnd   Optional number: End offset. Default selectionStart
// @param debug          Optional boolean. If true, the created test layer
//                         will not be removed.
function getTextBoundingRect(input, selectionStart, selectionEnd, debug) {
    // Basic parameter validation
    if(!input || !('value' in input)) return input;
    if(typeof selectionStart == "string") selectionStart = parseFloat(selectionStart);
    if(typeof selectionStart != "number" || isNaN(selectionStart)) {
        selectionStart = 0;
    }
    if(selectionStart < 0) selectionStart = 0;
    else selectionStart = Math.min(input.value.length, selectionStart);
    if(typeof selectionEnd == "string") selectionEnd = parseFloat(selectionEnd);
    if(typeof selectionEnd != "number" || isNaN(selectionEnd) || selectionEnd < selectionStart) {
        selectionEnd = selectionStart;
    }
    if (selectionEnd < 0) selectionEnd = 0;
    else selectionEnd = Math.min(input.value.length, selectionEnd);

    // If available (thus IE), use the createTextRange method
    if (typeof input.createTextRange == "function") {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', selectionStart);
        range.moveEnd('character', selectionEnd - selectionStart);
        return range.getBoundingClientRect();
    }
    // createTextRange is not supported, create a fake text range
    var offset = getInputOffset(),
        topPos = offset.top,
        leftPos = offset.left,
        width = getInputCSS('width', true),
        height = getInputCSS('height', true);

        // Styles to simulate a node in an input field
    var cssDefaultStyles = "white-space:pre;padding:0;margin:0;",
        listOfModifiers = ['direction', 'font-family', 'font-size', 'font-size-adjust', 'font-variant', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'text-align', 'text-indent', 'text-transform', 'word-wrap', 'word-spacing'];

    topPos += getInputCSS('padding-top', true);
    topPos += getInputCSS('border-top-width', true);
    leftPos += getInputCSS('padding-left', true);
    leftPos += getInputCSS('border-left-width', true);
    leftPos += 1; //Seems to be necessary

    for (var i=0; i<listOfModifiers.length; i++) {
        var property = listOfModifiers[i];
        cssDefaultStyles += property + ':' + getInputCSS(property) +';';
    }
    // End of CSS variable checks

    var text = input.value,
        textLen = text.length,
        fakeClone = document.createElement("div");
    if(selectionStart > 0) appendPart(0, selectionStart);
    var fakeRange = appendPart(selectionStart, selectionEnd);
    if(textLen > selectionEnd) appendPart(selectionEnd, textLen);

    // Styles to inherit the font styles of the element
    fakeClone.style.cssText = cssDefaultStyles;

    // Styles to position the text node at the desired position
    fakeClone.style.position = "absolute";
    fakeClone.style.top = topPos + "px";
    fakeClone.style.left = leftPos + "px";
    fakeClone.style.width = width + "px";
    fakeClone.style.height = height + "px";
    document.body.appendChild(fakeClone);
    var returnValue = fakeRange.getBoundingClientRect(); //Get rect

    if (!debug) fakeClone.parentNode.removeChild(fakeClone); //Remove temp
    return returnValue;

    // Local functions for readability of the previous code
    function appendPart(start, end){
        var span = document.createElement("span");
        span.style.cssText = cssDefaultStyles; //Force styles to prevent unexpected results
        span.textContent = text.substring(start, end);
        fakeClone.appendChild(span);
        return span;
    }
    // Computing offset position
    function getInputOffset(){
        var body = document.body,
            win = document.defaultView,
            docElem = document.documentElement,
            box = document.createElement('div');
        box.style.paddingLeft = box.style.width = "1px";
        body.appendChild(box);
        var isBoxModel = box.offsetWidth == 2;
        body.removeChild(box);
        box = input.getBoundingClientRect();
        var clientTop  = docElem.clientTop  || body.clientTop  || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
            scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
        return {
            top : box.top  + scrollTop  - clientTop,
            left: box.left + scrollLeft - clientLeft};
    }
    function getInputCSS(prop, isnumber){
        var val = document.defaultView.getComputedStyle(input, null).getPropertyValue(prop);
        return isnumber ? parseFloat(val) : val;
    }
}
console.log('Extension Loaded')

