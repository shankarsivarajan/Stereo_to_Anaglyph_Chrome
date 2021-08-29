function rc(info, tab) {
  chrome.tabs.sendMessage(tab.id, "rc2ri");
}

function cr(info, tab) {
  chrome.tabs.sendMessage(tab.id, "cr2ri");
}

function orig(info, tab) {
  chrome.tabs.sendMessage(tab.id, "orig");
}

chrome.contextMenus.create({
  "title" : "Red–Cyan Anaglyph",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"from": "rc", "to": "ri", "source": "menu"});
  }
});

chrome.contextMenus.create({
  "title" : "Cyan–Red Anaglyph",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : function(info, tab) {
    chrome.tabs.sendMessage(tab.id, {"from": "cr", "to": "ri", "source": "menu"});
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
