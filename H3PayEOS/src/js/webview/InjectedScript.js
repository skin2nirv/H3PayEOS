import envConfig from '../../env';

export var InjectedScript = function(webview){
    this.webview = null;
    this.init(webview);
    true;
}

InjectedScript.prototype.init = function(webview){
    this.webview = webview;
    true;
}

InjectedScript.prototype.alert = function(message){
    if(this.webview == null) return;
    var script = `window.alert("${message}");`
    this.webview.injectJavaScript(script);
    true;
}

InjectedScript.prototype.login = function(props = null){
    if(this.webview == null) return;

    if(props == null) props = envConfig.WEBVIEW.login;
    var script = `
        window.vueLogin.uid="${props.uid}"; window.vueLogin.upw="${props.upw}";
        var btnLogin = window.document.getElementById("loginBtn");
        btnLogin.click()
    `;
    this.webview.injectJavaScript(script);
    true;
}

InjectedScript.prototype.movePayAmountPage = function(val){
    if(this.webview == null) return;
    var script = `
        window.location.href = "/h3pay/pay/payAmount?qrcode_value=${val}";
    `;
    this.webview.injectJavaScript(script);
}

InjectedScript.prototype.getPermission = function (type) {
    if (this.webview == null) return;
    var script = `
        var _permission = window.localStorage.getItem(${type});
        if(_permission == "true"){
            _permission = true;
        }else{
            _permission = false;
        }

        var param = {
            type : '${type}',
            message : _permission
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(param));
    `;
    var self = this;
    setTimeout(function(){
        self.webview.injectJavaScript(script);
    }, 500);
    true;
}

InjectedScript.prototype.setPermission = function (type, permission) {
    if (this.webview == null) return;
    var script = ``;
    if(type == "location"){
        script = `window.localStorage.setItem("location", ${permission});`;
    }else if(type == "camera"){
        script = `window.localStorage.setItem("camera", ${permission});`;
    }
    
    var self = this;``
    setTimeout(function(){
        self.webview.injectJavaScript(script);
    }, 500);
}

InjectedScript.prototype.setLocation = function (LAT, LNG) {
    if (this.webview == null) return;
    var script = `
        window.localStorage.setItem("LAT", ${LAT});
        window.localStorage.setItem("LNG", ${LNG});
    `;
    var self = this;
    setTimeout(function(){
        self.webview.injectJavaScript(script);
    }, 500);
}

InjectedScript.prototype.getLocation = function () {
    if (this.webview == null) return;
    var script = `
        var _LAT = window.localStorage.getItem("LAT");
        var _LNG = window.localStorage.getItem("LNG");

        var param = {
            type : 'location',
            LAT : _LAT,
            LNG : _LNG
        }
        window.ReactNativeWebView.postMessage(JSON.stringify(param));
    `;
    var self = this;
    setTimeout(function(){
        self.webview.injectJavaScript(script);
    }, 500);
}

