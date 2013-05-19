(function() {

var port = chrome.extension.connect();
var notifier = document.createElement("div");
notifier.setAttribute("id", "fallengalaxy-chrome-addon-notifier");
notifier.setAttribute("style", "display: none");
notifier.addEventListener("notify", function() {
  var data = document.getElementById("fallengalaxy-chrome-addon-notifier").innerText;
  port.postMessage(JSON.parse(data));
});
document.body.appendChild(notifier);

function inScript() {
  var customEvent = document.createEvent("Event");
  customEvent.initEvent("notify", true, true);
  var notifier = document.getElementById("fallengalaxy-chrome-addon-notifier");
  addAlertListener({
    onAlert: function(alert) {
      notifier.innerText = JSON.stringify(alert);
      notifier.dispatchEvent(customEvent);
    }
  });
}

var script = document.createElement("script");
script.appendChild(document.createTextNode("("+ inScript.toString() +")()"));
document.body.appendChild(script);
document.body.removeChild(script);

})();
