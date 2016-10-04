// Github: https://github.com/pmsosa


//Blacklist
var blacklist = [ ];
var KEY = "HIDD3N"


//Add a new item to blacklist
function addblacklist(item){
  
  blacklist.push(item.toLowerCase());
  blacklist.sort();
  toSave = {};
  toSave[KEY] = JSON.stringify(blacklist);
  chrome.storage.sync.set(toSave,function(){console.log("saved new case")});
}

//Remove item from blacklist
function removeblacklist(item,callback){

  blacklist.splice(blacklist.indexOf(item.toLowerCase()),1);
  blacklist.sort();
  
  toSave = {};
  toSave[KEY] = JSON.stringify(blacklist);
  chrome.storage.sync.set(toSave,callback);
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
        
        url = info.url.toLowerCase();
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
initBlacklist();

//Initialize Blacklist
function initBlacklist(){
  chrome.storage.sync.get(KEY,
    function(item){
      console.log(item);
      //Blacklist does not exist!
      if (Object.keys(item).length === 0){
        console.log("not found!");
        blacklist = [ ];
      }
      //Blacklist was found!
      else{
        blacklist = JSON.parse(item[KEY]);
        console.log("found!")
      } 
    }
  );
}