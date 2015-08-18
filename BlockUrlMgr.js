
var BlockUrlMgr=(function(){
	var currentBlockUrls=null;
	//需要屏蔽的广告连接（默认）
	var defaultBlockUrls=[
		"http://same.stockstar.com/*",
		"http://*.doubleclick.net/*",
		"*://*.googleadservices.com/*",
		"*://*.googlesyndication.com/*",
		"*://*.google-analytics.com/*",
		"*://creative.ak.fbcdn.net/*",
		"http://*.adbrite.com/*",
		"http://*.expo9.exponential.com/*",
		"http://*.quantserve.com/*",
		"http://*.scorecardresearch.com/*",
		"http://pos.baidu.com/*",
		"http://*.zedo.com/*"
	];
	//当前需要屏蔽的广告链接
	function getBlockUrls(){
		if(null==currentBlockUrls){
			currentBlockUrls=getBlockUrlsFromLocalStorage();
		}
		return currentBlockUrls;
	}
	
	function getBlockUrlsFromLocalStorage(){
	     var blockUrlsStr=localStorage["BlockUrls"];
		 var urls=null;
		 if(blockUrlsStr){
			try{
				urls=JSON.parse(blockUrlsStr);
			}catch(error){
				console.log(error);
			}
		 }
		 if (!(urls instanceof Array)||urls.length<=0) {
			urls=defaultBlockUrls;
			saveBlockUrls(urls);
			console.log("Initializing BlockUrls to defaults.");
		}
		return urls; 
	}
	
	function getFromFile(callBack){
		chrome.fileSystem.chooseEntry({type: 'openFile'}, function(fileEntry){
			fileEntry.file(function(file){
				var reader = new FileReader();
				reader.onload = function(){
					var text = this.result;
					callBack(text)
					//do something with text
				}
				reader.readAsText(File);
			});
		});
	}
	
	function addBlockUrl(url){
		var blockUrls=getBlockUrls();
		if(blockUrls.indexOf(url)==-1){
			blockUrls.push(url);
		    saveBlockUrls(blockUrls);
			return true;
		}
		return false;
	}
	
	function removeBlockUrl(url){
		var blockUrls=getBlockUrls();
		var index=blockUrls.indexOf(url);
		if(index!=-1){
			blockUrls[index]=blockUrls[blockUrls.length-1];
			blockUrls.pop();
			saveBlockUrls(blockUrls);
			return true;
		}
		return false;
	}
	
	function saveBlockUrls(urls) {
		//currentBlockUrls=urls;
		localStorage["BlockUrls"] = JSON.stringify(urls);
    }
   return {
	   getBlockUrls:getBlockUrls,
	   addBlockUrl:addBlockUrl,
	   removeBlockUrl:removeBlockUrl
   };
}());
