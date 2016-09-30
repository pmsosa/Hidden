//ADD ITEM
function additem(){
	console.log("adding...");
	newitem = document.getElementById("newitem").value;
	if (newitem.value != ""){
		chrome.extension.getBackgroundPage().addblacklist(newitem);
		fill_blacklist();
	}
	else{
		newitem.focus();
	}
}

//REMOVE ITEM
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

function rmbtndisable(){
	if (itemlist.value == ""){
		btrm.disabled = true;
	}
	else{
		btrm.disabled = false;
	}
}




document.addEventListener('DOMContentLoaded', function () {
	var btadd = document.getElementById("btadd");
	var btrm  = document.getElementById("btrm");
	var itemlist = document.getElementById("itemlist");
	

	btadd.addEventListener('click',additem);
	btrm.addEventListener('click',rmitem);
	itemlist.addEventListener('change',rmbtndisable)
	btrm.disabled = true;
	fill_blacklist();



});


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
