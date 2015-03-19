;(function (npfs,global,githubSmoothly) {
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);
    });
    githubSmoothly = {
        init:function(){
            this.hostPath = this.getHostsPath();
            this.changeDns();
        },
        getHostsPath:function(){
            if (npfs.getPlatform() == "windows") {
                return "C:/WINDOWS/system32/drivers/etc/hosts"
            } else {
                if (npfs.getPlatform() == "osx") {
                    return "/private/etc/hosts"
                } else {
                    return "/etc/hosts"
                }
            }
        },
        readFile:function(){
            var that = this;
            try {
                return npfs.getTextFile(that.getHostsPath());
            } catch (e) {
            }
        },
        writeFile: function (con) {
            var that = this;
            try {
                npfs.saveTextFile(that.getHostsPath(), con);
            } catch (e) {
                throw e;
            }
        },
        getData :function() {
            var that = this;
            var content = that.fileContent,
            data = {}, c;
            if (content) {
                for (i = 0; i < content.length; i++) { 
                    c = content.charAt(i);
                    if (c == '\ufffc' || c == '\ufffd') {
                        break;
                    }
                }
            }
            if(!~content.indexOf('github.global.ssl.fastly.net')){
                content += '\n185.31.17.184  github.global.ssl.fastly.net\n';
            }
            return content;
        },
        changeDns:function(){
            var that = this;
            that.fileContent = that.readFile();
            that.writeFile(that.getData());
        }
    };
    githubSmoothly.init();
    global.__githubSmoothly = githubSmoothly;
})((function () {
    var npfs = document.createElement("embed");
    npfs.type = "application/x-npfs";
    document.getElementsByTagName("body")[0].appendChild(npfs);
    return npfs;
})(),window,{});
