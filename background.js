function rcd(info, tab) {
  chrome.tabs.sendMessage(tab.id, "rcd2ri");
}


function rchc(info, tab) {
  chrome.tabs.sendMessage(tab.id, "rchc2ri");
}


function crd(info, tab) {
  chrome.tabs.sendMessage(tab.id, "crd2ri");
}

function crhc(info, tab) {
  chrome.tabs.sendMessage(tab.id, "crhc2ri");
}

function orig(info, tab) {
  chrome.tabs.sendMessage(tab.id, "orig");
}

chrome.runtime.onInstalled.addListener(function() {
	
chrome.contextMenus.create({
	"id" : "red_cyan_dubois",
	"title" : "Red–Cyan Dubois",
	"type" : "normal",
	"contexts" : ["all"],
	});


chrome.contextMenus.create({
	"id" : "red_cyan_half_color",
	"title" : "Red–Cyan Half-Color Optimized",
	"type" : "normal",
	"contexts" : ["all"],
	});

chrome.contextMenus.create({
	"id" : "cyan_red_dubois",
	"title" : "Cyan–Red Dubois",
	"type" : "normal",
	"contexts" : ["all"],
	});

chrome.contextMenus.create({
	"id" : "cyan_red_half_color",
	"title" : "Cyan–Red Half-Color Optimized",
	"type" : "normal",
	"contexts" : ["all"],
	});

chrome.contextMenus.create({
  "id" : "original",
  "title" : "Original",
  "type" : "normal",
  "contexts" : ["all"],
  });

chrome.contextMenus.onClicked.addListener(clickHandler);

});
	

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "red_cyan_dubois") {
        chrome.tabs.sendMessage(tab.id, {"from": "rcd", "to": "ri", "source": "menu"});
    }
    if (info.menuItemId === "red_cyan_half_color") {
        chrome.tabs.sendMessage(tab.id, {"from": "rchc", "to": "ri", "source": "menu"});
    }
    if (info.menuItemId === "cyan_red_dubois") {
        chrome.tabs.sendMessage(tab.id, {"from": "crd", "to": "ri", "source": "menu"});
    }
    if (info.menuItemId === "cyan_red_half_color") {
        chrome.tabs.sendMessage(tab.id, {"from": "crhc", "to": "ri", "source": "menu"});
    }
    if (info.menuItemId === "original") {
        chrome.tabs.sendMessage(tab.id, {"from": "orig", "to": "ri", "source": "menu"});
    }
});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.update({}, function(tab) {
    chrome.tabs.sendMessage(tab.id, {"from": command, "to": "ri", "source": "command"});
  });
});
