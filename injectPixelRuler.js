(function() {
  var oldCanvas = document.getElementById("pixelruler");
  if (oldCanvas) {
    removeSelection(oldCanvas);
    return false;
  }

  function removeSelection(oldCanvas) {
    oldCanvas.parentNode.removeChild(oldCanvas);
  }

  chrome.storage.sync.get(['backgroundLayerColor', 'selectionColor'], function(data) {
    var backgroundLayerColor = data.backgroundLayerColor;
    var selectionColor = data.selectionColor;

    // Create semi-transparent layer
    var pixelruler = document.createElement('div');
    pixelruler.setAttribute("id", "pixelruler");
    pixelruler.style.position = 'fixed';
    pixelruler.style.top = 0;
    pixelruler.style.left = 0;
    pixelruler.style.bottom = 0;
    pixelruler.style.right = 0;
    pixelruler.style.backgroundColor = backgroundLayerColor;
    pixelruler.style.zIndex = "9999";
    pixelruler.style.cursor = "crosshair";

    // Creates the info container that holds the pixel count
    var pixelrulerBox = document.createElement('div');
    pixelrulerBox.setAttribute("id", "pixelrulerBox");
    pixelrulerBox.style.position = 'absolute';
    pixelrulerBox.style.background = "#000000";
    pixelrulerBox.style.color = "#ffffff";

    pixelruler.appendChild(pixelrulerBox);
    document.body.appendChild(pixelruler);

    initDraw(pixelruler);

    function initDraw(pixelruler) {
      function setMousePosition(e) {
        var ev = e || window.event;
        if (ev.clientX) {
          mouse.x = ev.clientX;
          mouse.y = ev.clientY;
        }
      };

      var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
      };

      var element = null;

      pixelruler.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
          element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
          element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
          element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
          element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
      };

      pixelruler.onclick = function(e) {
        if (element !== null) {
          // Display size info of the section highlighted
          pixelrulerBox.innerHTML = "Width: " + element.style.width + " / Height: " + element.style.height;

          // Position text box depending on the selection position
          pixelrulerBox.style.left = element.style.left;
          var elementTopPosition = parseInt(element.style.top);
          var elementHeight = parseInt(element.style.height);
          var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
          if (elementHeight >= (viewportHeight - 60)) {
            pixelrulerBox.style.top = elementTopPosition + 10 + "px";
          } else if (elementTopPosition >= 60) {
            pixelrulerBox.style.top = elementTopPosition - 20 + "px";
          } else {
            pixelrulerBox.style.top = elementTopPosition + elementHeight + 10 + "px";
          }

          element = null;
        } else {
          mouse.startX = mouse.x;
          mouse.startY = mouse.y;

          // Remove previous selection
          var oldElement = document.getElementById("selection");
          if (oldElement) {
            oldElement.parentNode.removeChild(oldElement);
            pixelrulerBox.innerHTML = "";
          }

          // Create new selection
          element = document.createElement('div');
          element.className = 'rectangle';
          element.setAttribute("id", "selection");
          element.style.left = mouse.x + 'px';
          element.style.top = mouse.y + 'px';
          element.style.border = "1px dashed " + selectionColor;
          element.style.position = "absolute";

          pixelruler.appendChild(element);
        }
      };


    }
  });
})();
