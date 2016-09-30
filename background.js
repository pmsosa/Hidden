//Hidden - Pedro M. Sosa

//Blacklist
var blacklist = [  
  "test"
];


//Is a URL blacklisted
function blacklisted(url){
  for (var i = 0; i < blacklist.length; i++){
    if (url.includes(blacklist[i])){
      return true;
    }
  }
  return false;
}


//Callback Function to Hide a new requested site!
//Note: Chrome.tabs.get will throw a bunch of errors because when it pre-fetches websites, it does so from a tab that does not exist.
function hide(info){
  if (blacklisted(info.url)){
    chrome.tabs.get(info.tabId, function(tab){
      if (info.type=="main_frame" & tab != undefined){
        
        url = info.url;
        console.log(info);

        //for (var i = 0; i < blacklist.length; i++){
        //  if (url.includes(blacklist[i])){
            chrome.tabs.remove(info.tabId);
            chrome.windows.create({url: url , incognito: true});
        //  }
        //}
      } //Endif
    }); //EndTabs
    return {cancel: true};
  } //EndBlacklist
} //EndHide



//Listener
chrome.webRequest.onBeforeRequest.addListener(hide,{urls:["<all_urls>"]},["blocking"]);
