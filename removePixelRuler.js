/*
This code is used to make sure when the button is pressed again the pixelruler interface will turn off, it does this by taking them back to the old
webpage
*/
window.onload = (function () {
  function removeSelection(oldCanvas) {
    oldCanvas.parentNode.removeChild(oldCanvas);
  }
  var oldCanvas = document.getElementById("pixelruler");
  removeSelection(oldCanvas);
})();
