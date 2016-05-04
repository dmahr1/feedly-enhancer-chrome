// ==UserScript==
// @name feedly-enhancer-chrome
// @namespace https://github.com/dmahr1/feedly-enhancer-chrome
// @description Enhances the left pane in feedly.
// @include    	http://feedly.com/*
// @include    	https://feedly.com/*
// @include   http://www.feedly.com/*
// @include    	https://www.feedly.com/*
// @include   http://cloud.feedly.com/*
// @include        https://cloud.feedly.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @downloadURL https://raw.githubusercontent.com/dmahr1/feedly-enhancer-chrome/master/feedly-enhancer-chrome.js
// @updateURL   https://raw.githubusercontent.com/dmahr1/feedly-enhancer-chrome/master/feedly-enhancer-chrome.js
// @version    	4.0.0
// @run-at     document-end
// @require https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @license    	Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @license    	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

//Function to add CSS styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Mutation observer to reapply changes after Feedly is refreshed
var feedlyTabsObserver = null;
function initRefreshObserver(){
    if (feedlyTabsObserver == null && $('#feedlyTabs').length > 0) {
        feedlyTabsObserver = new MutationObserver(function(mutations) {
            var refreshObserved = false;
            mutations.forEach(function(mutation) {
                if (mutation.type == "childList"){
                    if(mutation.removedNodes.length > 0){
                        for(var i = 0; i < mutation.removedNodes.length; i++){
                            if(mutation.removedNodes[i].id == 'menuHolder') refreshObserved = true;
                        }
                    }
                }
            });
            if(refreshObserved) {
                classChanges();
            }
        }).observe(document.getElementById("feedlyTabs"), { childList: true});
    }
}

//CSS changes
addGlobalStyle(

    //Hide elements
    ".feHideElement { display: none !important; }" + 
    ".feInlineBlock { display: inline-block !important; }" +    

    //Styling for header items (today, save for later)
    ".feTabParents { margin: 0 0 0 0 !important;line-height: 15px; }" +     
    
    //Adjust feed list line height
    "#feedlyTabsHolder .favicon {margin: 3px !important;}"+
    ".feedIndex, .tab .feedIndexTitleHolder {line-height:22px !important;height:22px !important;}"+
    "#feedlyTabsHolder div.simpleUnreadCount {line-height:22px !important;height:22px !important;}"+

    //Remove padding to right of feed counter
    "#.icon.handle {padding-right: 0 !important !important;}"+
    
    //Reduce padding in feed list
    "#feedlyTabs {width: 238px !important;padding-left: 10px !important;padding-right: 20px !important;}"+
    
    ""
);

//Class changes
function classChanges() {
    
    //Add div to main. This is what is observed for mutations
    var menuHolder = $('<div/>', { 'id': 'menuHolder'}).css('line-height', '17px');
    menuHolder.prependTo('#feedlyTabs');
    
    //Add class to header
    $('#mytab').parent().addClass('feTabParents');

    //Hide elements
    $('#feedlyTabsPin').parent().addClass('feHideElement');
    $("#mytab_label").addClass('feHideElement');
    $("#savedtab_label").addClass('feHideElement');
    $(".secondaryPanelButton").addClass('feHideElement');
    $(".moreHandle").addClass('feHideElement');
    $(".moreHandle").next().next().addClass('feHideElement');
    
    //Inline block
    $("#mytab").addClass('feInlineBlock');
    $("#savedtab").addClass('feInlineBlock');
}

//Initialization
function main(count){
    if ($("#savedtab").length > 0 ) {
        classChanges();
        initRefreshObserver();
    }else{
        if(count <= 80) {
            console.debug('element not found, waiting 1s');
            setTimeout(function(){
                main(count+1);
            }, 1000);
        }
    }
}

//Main
$(document).ready(function() {
    main(1);
});
