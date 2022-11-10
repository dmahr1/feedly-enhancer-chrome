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
// @version    	4.0.7
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

//CSS changes
addGlobalStyle(

    `
    /* Smaller top border in navigation panel */
    .m-t-2 { margin-top: 5px !important; }
    .m-t-2 .LeftnavListRow { display: inline; padding-right: 0px; }
    .m-t-2 .LeftnavListRow .LeftnavListRow__text { display: none; }

    /* Hide the "show more" links */
    .LeftnavListRow--link { display: none !important; }

    /* make rows take up more width and be less tall */
    .LeftnavListRow.LeftnavListRow--child {
        padding-left: 10px;
        line-height: 1.5rem;
    }
    .LeftnavList__heading { padding-top: 8px; }
    .LeftnavListRow {height: 1.6rem; padding-left: 10px;}

    /* Less whitespace in article reading area */
    #searchBarFX { display: none; }
    #feedlyPageHolderFX { padding: 0px; }
    #feedlyPageFX .board h4 { margin-top: 16px; }

    /* Wider article reading area */
    .entryBody { max-width: 800px !important; }
    .u100Entry { max-width: 800px !important; }
    `

);
