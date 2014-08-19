
$(function(){
var page=chrome.extension.getBackgroundPage();
var BlockUrlMgr=page.BlockUrlMgr;
var blockUrls=BlockUrlMgr.getBlockUrls();

loadUrls();
$("#addUrl").click(function(){
    var url=$("#url").val();
	if(url){
		if(addUrl(url)){
			addRow(url,blockUrls.length+1);
		}
		$("#url").val("");
	}
});

$("#saveBtn").click(function(){
	page.restart();
});

function addRow(url,orderNum){
	var $tr=$("<tr>").append("<td>"+orderNum+"</td><td>"+url+"</td>");
	$("<td>").appendTo($tr).append($("<a href='#'>删除</a>").click(function(){
		deleteUrl(url);
		$tr.remove();
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
