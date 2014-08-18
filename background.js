/*
var blogInfo={};
//当content_script有消息发过来时
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	blogInfo=request;
});
*/

//需要挡住的广告连接（默认）
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
//当前需要挡住的广告连接
var currentBlockUrls=getBlockUrls();
var blockAdCount=0;
chrome.webRequest.onBeforeRequest.addListener(function(details) {  
        blockAdCount++;
		setBadge(blockAdCount);
		//return {cancel: true};
		return {redirectUrl: "about:blank"};
},{urls: currentBlockUrls},["blocking"]);

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

function getBlockUrls(){
	var urls=JSON.parse(localStorage["BlockUrls"]);
	if (!(urls instanceof Array)||urls.length<=0) {
		console.log("Initializing BlockUrls to defaults.");
		urls=defaultBlockUrls;
		setBlockUrls(urls);
		return urls;
	} else {
		return urls;
	}
}

function setBlockUrls(urls) {
    currentBlockUrls=urls;
	localStorage["BlockUrls"] = JSON.stringify(urls);
}