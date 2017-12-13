/*
    Copyright © 2017 Theodoros Chatzigiannakis
 
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var storage = chrome.storage.local;

function saveTabState(tabId, tab, callback) {
    storage.set({ [tabId.toString()]: tab }, a => { callback(); });
}

function loadTabState(tabId, callback) {
    storage.get(tabId.toString(), result => { callback(result[tabId.toString()]); });
}

function revertToSavedTabState(tabId, callback) {
    loadTabState(tabId, tab => {
        chrome.tabs.update(tabId, { "url": tab.url }, () => callback());
    });
}

function matchHostnameWithSaved(changedUrl, tabId, callback) {
    loadTabState(tabId, result => {
        var oldHostname = new URL(result.url).hostname;
        var newHostname = new URL(changedUrl).hostname;
        callback(oldHostname == newHostname);
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {   
    if (changeInfo.pinned) {                
        saveTabState(tabId, tab, () => { });   
    }

    if (tab.pinned) {
        if (changeInfo.url != undefined) {
            matchHostnameWithSaved(changeInfo.url, tabId, match => {
                if (match) {                    
                    saveTabState(tabId, changeInfo, () => { });
                } else {                
                    revertToSavedTabState(tabId, () => { });
                }        
            });
        }           
    }       
});

chrome.tabs.query({ }, tabs => {
    for(var i = 0; i < tabs.length; i++) {
        saveTabState(tabs[i].id, tabs[i], () => { });
    }
});
