;(function (global) {
    var doc = document;
    var uri = global.location.href;
    chrome.extension.sendRequest({
    }, function (response) {
    });

    chrome.extension.onRequest.addListener();

})(this)
