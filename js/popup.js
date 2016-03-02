var CounterMgr = chrome.extension.getBackgroundPage().CounterMgr;
CounterMgr.getCurrentCounter(function (counter) {
    $("#count").text(counter.count);
    for (var i = 0; i < counter.urls.length; i++) {
        var url = counter.urls[i];
        var domaimName = url.split("/")[2] + "[" + (1 +i) + "]";
        $("#list").append("<li><a title='" + url + "' href='" + url + "'>" + domaimName + "</a></li>");
    }
});