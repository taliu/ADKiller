var CounterMgr = (function () {
    var blockCountHash = {}; //tabId:{count:0,urls:[]}
    function getDefaultCounter() {
        return { count: 0, urls: [] };
    }
    //获取当前广告计数器
    function getCurrentCounter(callBack) {
        chrome.tabs.getSelected(null, function (tab) {
            callBack(getCounter(tab.id));
        });
    }
    //根据tabId获取广告计数器
    function getCounter(tabId) {
        if (!blockCountHash[tabId]) {
            reset(tabId);
        }
        return blockCountHash[tabId];
    }
    //设置标签id为tabId的广告计数器
    function setCounter(tabId, value) {
        blockCountHash[tabId] = value;
    }

    //重置标签id为tabId的广告计数器
    function reset(tabId) {
        setCounter(tabId, getDefaultCounter());
        console.log("重置tabId:", tabId, "的广告计数器");
    }
    //添加新屏蔽的广告链接
    function addBlockUrl(tabId, url) {
        var counter = getCounter(tabId);
        counter.count++;
        counter.urls.push(url);
        console.log("为tabId:", tabId, "的广告计数器添加了url:",url);
        return counter;
    }

    function removeCounter(tabId) {
        delete blockCountHash[tabId];
        console.log("移除了tabId:", tabId, "的广告计数器");
    }
    return {
        reset: reset,
        getCounter: getCounter,
        addBlockUrl: addBlockUrl,
        removeCounter: removeCounter,
        getCurrentCounter: getCurrentCounter
    };
} ());