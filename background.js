/*
var blogInfo={};
//当content_script有消息发过来时
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	blogInfo=request;
});
*/

//需要挡住的广告连接（默认）
var defaultBlockUrls=[
"http://same.stockstar.com/*"
];
//当前需要挡住的广告连接
var currentBlockUrls=getBlockUrls();

chrome.webRequest.onBeforeRequest.addListener(function(details) {  
        setBadge();
		//return {cancel: true};
		return {redirectUrl: "about:blank"};
},{urls: currentBlockUrls},["blocking"]);

//设置提示，提示在当前页面挡住了多少广告
function setBadge(){
	chrome.tabs.getSelected(null, function(tab) {
		tab.blockCount=tab.blockCount||0;
		tab.blockCount++;
		chrome.browserAction.setBadgeBackgroundColor({tabId:tab.id,color: '#0000FF'});
		chrome.browserAction.setBadgeText({tabId:tab.id,text: tab.blockCount.toString()});
	});
}

function getBlockUrls(){
	var urls=localStorage["BlockUrls"];
	if (urls == undefined) {
		console.log("Initializing BlockUrls to defaults.");
		setFilters(defaultBlockUrls);
		return defaultBlockUrls;
	} else {
		return JSON.parse(urls);
	}
}

function setBlockUrls(urls) {
    currentBlockUrls=urls;
	localStorage["BlockUrls"] = JSON.stringify(urls);
}