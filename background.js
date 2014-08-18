
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
		"http://*.zedo.com/*"
	];
	//当前需要屏蔽的广告链接
	function getCurrentBlockUrls(){
		if(null==currentBlockUrls){
			currentBlockUrls=getBlockUrls();
		}
		return currentBlockUrls;
	}
	
	function getBlockUrls(){
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
			setBlockUrls(urls);
			console.log("Initializing BlockUrls to defaults.");
		}
		return urls; 
	}
	
	function setBlockUrls(urls) {
		currentBlockUrls=urls;
		localStorage["BlockUrls"] = JSON.stringify(urls);
   }
   return {
	   getCurrentBlockUrls:getCurrentBlockUrls,
	   getBlockUrls:getBlockUrls,
	   setBlockUrls:setBlockUrls
   };
}());




var blockAdCount=0;
chrome.webRequest.onBeforeRequest.addListener(function(details) {  
        blockAdCount++;
		setBadge(blockAdCount);
		//return {cancel: true};
		return {redirectUrl: "about:blank"};
},{urls: BlockUrlMgr.getCurrentBlockUrls()},["blocking"]);

//新页面打开，blockAdCount重置为0
chrome.extension.onRequest.addListener(function(message, sender, sendResponse){
     blockAdCount=0;
	 console.log(message);
	 sendResponse("知道了");
});

//设置提示，提示在当前页面挡住了多少广告
function setBadge(count){
	chrome.tabs.getSelected(null, function(tab) {
		chrome.browserAction.setBadgeBackgroundColor({tabId:tab.id,color: '#0000FF'});
		chrome.browserAction.setBadgeText({tabId:tab.id,text: count.toString()});
	});
}



