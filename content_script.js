chrome.runtime.sendMessage({	blogName:$("#Header1_HeaderTitle").text(),	authorName:location.href.split("/")[3],	accessTime:(new Date()).toLocaleString(),	lastAccessTime:""});//var jsUrl=chrome.extension.getURL("alert.js");//var jsUrl="http://localhost:64228/contents/alert.js";//$("body").append("<script src='"+jsUrl+"'>");