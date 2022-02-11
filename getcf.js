var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var username = getQueryString("user");
var isonline;
new HttpClient().get('https://codeforces.live/profile/{0}'.format(username), function (resp) {
    console.log(resp); 
    isonline = resp.contains("online now");
});
if (isonline) {
    new HttpClient().get('https://img.shields.io/badge/{0}-online-green'.format(username),function(resp){
        console.log(resp);
        document.body.innerHTML = resp;
    })
} else {
    new HttpClient().get('https://img.shields.io/badge/{0}-offine-red'.format(username),function(resp){
        console.log(resp);
        document.body.innerHTML = resp;
    });
}
