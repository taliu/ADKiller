start();
processContentAjaxRequest();


chrome.contextMenus.create({
    type: 'normal',
    title: '屏蔽广告',
	onclick: blockAD,
    id: 'adkiller'
	,contexts: ['all']
	
});
function blockAD(info, tab){
	console.log("info:",info);
	console.log("tab:",tab);
}

function start(){
	addADListener();
}

function restart(){
	removeADListener();
	start();
}


function processContentAjaxRequest() {
    chrome.extension.onRequest.addListener(function (requestData, sender, sendResponse) {
        // 将信息能过Ajax发送到服务器
        $.ajax(requestData).success(function (data) {
            sendResponse({ status: 200, responseData: data });
        }).error(function () {
            sendResponse({status:500, requestData: requestData, error: "请求出错" });
        });
        console.log(requestData, sender, sendResponse);
    });
}

function addADListener(){
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestCallBack, 
												{ urls:  BlockUrlMgr.getBlockUrls() }, 
												["blocking"]);
}

function removeADListener(){
	chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestCallBack);
}


function onBeforeRequestCallBack(details) {
    var counter = CounterMgr.addBlockUrl(details.tabId, details.url);
    setBadge(counter.count);
    return { redirectUrl: "about:blank" };
}


//设置提示，提示在当前页面屏蔽了多少广告
function setBadge(count){
	chrome.tabs.getSelected(null, function(tab) {
		chrome.browserAction.setBadgeBackgroundColor({tabId:tab.id,color: '#0000FF'});
		chrome.browserAction.setBadgeText({ tabId: tab.id, text: count.toString() });
	});
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log('Tab ' + tabId + ' has been changed with these options:');
    if (changeInfo.status == "loading") {//当页面从新加载，重置广告计数器
        CounterMgr.reset(tabId);
    } else if (changeInfo.status == "complete") {

    }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    CounterMgr.removeCounter(tabId);
    //console.log('Tab ' + tabId + ' in window ' + removeInfo.windowId + ', and the window is ' + (removeInfo.isWindowClosing ? 'closed.' : 'open.'));
});



