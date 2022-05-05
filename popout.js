//toggles are used to inject and remove each tool when a button is pressed.
var toggleSI,togglePR = false;
/**
 * Used to inject and remove the "Section Identifier" functionality.
 * Relevant JS files search the DOM for data-section-id attribute and displays them for the user to copy, and 
 * then removes them.
 */
function sectionIdentifier() {
    if(!toggleSI){
        chrome.tabs.executeScript({
            file: 'injectSectionIdentifers.js'
        });
        toggleSI = true;
    }
    else{
        chrome.tabs.executeScript({
            file: 'removeSectionIdentifers.js'
        });
        toggleSI = false;
    }
}
/**
 * Used to inject and remove the "Pixel Ruler" functionality.
 * !! write explanation here !!
 */
function pixelRuler() {
    if(!togglePR){
        chrome.tabs.executeScript({
            file: 'injectPixelRuler.js'
        });
        togglePR = true;
    }
    else{
        chrome.tabs.executeScript({
            file: 'removePixelRuler.js'
        });
        togglePR = false;
    }
}
/*
As the toggle value is outside the scope of individual tabs, an issue arose where users had to double click the chosen
option if they switched the tab after using it.
This function resets the value of the toggle if the user switches tab.
*/
window.onblur = function(){
    toggleSI,togglePR = false;
}
//Attaches click event to the relevant buttons.
document.getElementById('sectionIdentifier').addEventListener('click', sectionIdentifier);
document.getElementById('pixelRuler').addEventListener('click', pixelRuler);