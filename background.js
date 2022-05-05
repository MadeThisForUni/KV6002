/*
This code creates a background colour that can seen when in the ruler mode, it is a way to indicate to a user that they can start using the ruler to
measure pixels also is the colour for the selection ruler
*/
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({backgroundLayerColor: 'rgba(173, 261, 230, 0.2)', selectionColor: 'rgba(255, 0, 0, 5)'}, function() {
      console.log("Background Colour");
    });
  });
  var clicked = false;
