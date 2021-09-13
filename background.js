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

chrome.contextMenus.create({
  "title" : "Red–Cyan Dubois",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"from": "rcd", "to": "ri", "source": "menu"});
  }
});


chrome.contextMenus.create({
  "title" : "Red–Cyan Half-Color Optimized",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"from": "rchc", "to": "ri", "source": "menu"});
  }
});

chrome.contextMenus.create({
  "title" : "Cyan–Red Dubois",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"from": "crd", "to": "ri", "source": "menu"});
  }
});

chrome.contextMenus.create({
  "title" : "Cyan–Red Half-Color Optimized",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"from": "crhc", "to": "ri", "source": "menu"});
  }
});

chrome.contextMenus.create({
  "title" : "Original",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"from": "orig", "to": "ri", "source": "menu"});
  }
});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.update({}, function(tab) {
    chrome.tabs.sendMessage(tab.id, {"from": command, "to": "ri", "source": "command"});
  });
});
