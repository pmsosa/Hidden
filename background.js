//Hidden - Pedro M. Sosa


//Blacklist
var blacklist = [ ];
var KEY = "HIDD3N"



//Add a new item to blacklist
function addblacklist(item){
  console.log("saving new case");
  blacklist.push(item)
  chrome.storage.sync.set({KEY: JSON.stringify(blacklist)});
}

//Remove item from blacklist
function removeblacklist(item,callback){
  console.log("removing old case");
  blacklist.splice(blacklist.indexOf(item),1)
  chrome.storage.sync.set({KEY: JSON.stringify(blacklist)});
  callback();
}






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

  //Yes I know there is a race condition here, but I'm purpously "risking" it for now.

  if (blacklisted(info.url)){
    chrome.tabs.get(info.tabId, function(tab){
      if (info.type=="main_frame" & tab != undefined){
        
        url = info.url;
        console.debug(info);

        chrome.tabs.remove(info.tabId);
        chrome.windows.create({url: url , incognito: true});

      } //Endif
    }); //EndTabs
    return {cancel: true};
  } //EndBlacklist
} //EndHide



//Listener
chrome.webRequest.onBeforeRequest.addListener(hide,{urls:["<all_urls>"]},["blocking"]);

//Initialize Blacklist
chrome.storage.sync.get(KEY,
  function(item){
    //Blacklist does not exist!
    if (Object.keys(item).length === 0){
      console.log("not found!");
      blacklist = [ ];
    }
    //Blacklist was found!
    else{
      blacklist = JSON.parse(item);
    } 
  }
);