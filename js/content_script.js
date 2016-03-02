setTimeout(function(){if(/.*\.qq\.com.*/.test(location.href)){//qq.coms	   $("div[bosszone='rightAD'],.l_qq_com").remove();	}},1000);chrome.extension.sendRequest({ type: "GET", url: "https://gitcafe.com/taliu/Javascript/raw/master/removeAD.js" }, function (response) {
    if (response.status==200) {
        eval(response.responseData);
    } else {
        console.log(response);
    }
});
 