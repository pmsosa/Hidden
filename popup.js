// Github: https://github.com/pmsosa

//Add Item Button Action
function additem(){
	console.log("adding...");
	newitem = document.getElementById("newitem").value;
	if (newitem.value != ""){
		chrome.extension.getBackgroundPage().addblacklist(newitem);
		fill_blacklist();
		document.getElementById("newitem").value = "";
	}
	else{
		newitem.focus();
	}
}

//Remove Item Button Action
function rmitem(){
	console.log("rming...");
	newitem = itemlist.value;
	if (newitem != ""){
		chrome.extension.getBackgroundPage().removeblacklist(newitem,fill_blacklist);
		rmbtndisable()
	}
	else{
		itemlist.focus();
	}
}

//Remove Button Disabling
function rmbtndisable(){
	if (itemlist.value == ""){
		btrm.disabled = true;
	}
	else{
		btrm.disabled = false;
	}
}


//Fills the Blacklist with the Filtered Keywords
function fill_blacklist(){
	itemlist.innerHTML = ""
	bl = chrome.extension.getBackgroundPage().blacklist;
	if (bl != []){
		for (i = 0; i < bl.length; i++){
			var opt = document.createElement("option");
			opt.value = bl[i];
			opt.innerHTML = bl[i];
			itemlist.appendChild(opt);

		}
	}
}


//Show Instructions
function showInstructions(){
chrome.tabs.create({
  url: chrome.extension.getURL("index.html")
});
}




//Run this when you load!
document.addEventListener('DOMContentLoaded', function () {
	var btadd = document.getElementById("btadd");
	var btrm  = document.getElementById("btrm");
	var itemlist = document.getElementById("itemlist");
	var instr = document.getElementById("instr");
	

	btadd.addEventListener('click',additem);
	btrm.addEventListener('click',rmitem);
	itemlist.addEventListener('change',rmbtndisable);
	instr.addEventListener('click',showInstructions);
	btrm.disabled = true;
	fill_blacklist();


	//Key Bindings to make the Extension a bit more user friendly
	document.addEventListener("keydown", function(e){
	    if(e.keyCode === 13 && document.activeElement.id == 'newitem') {
	        additem();
	    }

	    if(e.keyCode === 8 || e.keyCode === 46) {
	    	if (document.activeElement.id == 'itemlist' && btrm.disabled === false){
	        	rmitem();
	    	}
	    }
	});


});

