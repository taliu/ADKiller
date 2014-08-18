
$(function(){
var BlockUrlMgr=chrome.extension.getBackgroundPage().BlockUrlMgr;
var blockUrls=BlockUrlMgr.getCurrentBlockUrls().sort();

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
	if(blockUrls.indexOf(url)==-1){
		blockUrls.push(url);
		BlockUrlMgr.setBlockUrls(blockUrls);
		return true;
	}
	return false;
}

function deleteUrl(url){
	var index=blockUrls.indexOf(url);
	if(index!=-1){
		blockUrls[index]=blockUrls[blockUrls.length-1];
		blockUrls.pop();
		BlockUrlMgr.setBlockUrls(blockUrls);
	}
}
})
