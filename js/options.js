$(function(){
var page=chrome.extension.getBackgroundPage();
var BlockUrlMgr=page.BlockUrlMgr;
var blockUrls=BlockUrlMgr.getBlockUrls();
var serviceBaseUrl = "http://127.0.0.1:5000";
loadUrls();
$("#addUrl").click(function(){
    var url=$("#url").val();
	if(url){
		if(addUrl(url)){
			addRow(url,blockUrls.length);
			doAction("add", url, function () { msgTip().show("添加成功！"); });
		}
		$("#url").val("");
	}
});

$("#saveBtn").click(function(){
	page.restart();
	msgTip().show("生效");
});

function msgTip() {
    hide();
    function show(msg) {
        $(".alert").show();
        $("#msgTip").html(msg);
        setTimeout(function () {
            hide();
        }, 1500);
    }
    function hide() {
        $(".alert").hide();
    }
    $(".close").click(function () { hide(); });
    return {hide:hide,show:show};
}

$("#updateBtn").click(function () {
    var url = serviceBaseUrl+"/ADKiller.json?t"+Date.now();
    var $that = $(this);
    $.getJSON(url, function (blockList) {
        blockList.forEach(function (item) {
            if (item.status==1&&item.url) {
                if (addUrl(item.url)) {
                    addRow(item.url, blockUrls.length);
                }
            }
        });
        page.restart();
        msgTip().show($that.text());
    });
});

function doAction(action,url,callback) {
    var serivceUrl = serviceBaseUrl + "/adkiller";
    var params = {
        action:action,
        url:url
    };
    $.getJSON(serivceUrl, params, function (data) {
        callback&&callback(data);
    });
}


function addRow(url,orderNum){
	var $tr=$("<tr>").append("<td>"+orderNum+"</td><td>"+url+"</td>");
	$("<td>").appendTo($tr).append($("<a  style='cursor:pointer'>删除</a>").click(function () {
		deleteUrl(url);
		$tr.remove();
		var arr=location.href.split("?");
		var act = arr.length == 2 ? arr[1] : "del";
		doAction(act, url, function () { msgTip().show("删除成功！"); });
	}));
	$("#table tbody").append($tr);
}


function loadUrls(){
	for(var i in blockUrls){
		addRow(blockUrls[i],1+Number(i));
	}
}

function addUrl(url){
	 return BlockUrlMgr.addBlockUrl(url);
}

function deleteUrl(url){
	 return BlockUrlMgr.removeBlockUrl(url);
}
})
