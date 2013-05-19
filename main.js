chrome.extension.onConnect.addListener(function(port) {
  var last = 0;
  var lstmsgs = [];

  port.onMessage.addListener(function(alert) {
  	var now = +new Date();

    if(alert.type == "battle" && localStorage["sound-battle"] == "true") {
      document.getElementById("sound-battle").play();
    }
    else if(alert.type == "whisper" && localStorage["sound-whisper"] == "true") {
      document.getElementById("sound-whisper").play();
    }
    if(now - last > 20000 || alert.type == "battle") {
      var notification = webkitNotifications.createNotification(
        'icon.png',
        "Fallen Galaxy : "+(alert.type=="whisper"?"Nouveau message":"Pandora"),
        alert.message
      );
      notification.show();
      setTimeout(function() { notification.cancel(); }, 10000);
    }
    else {
      if(lstmsgs.length === 0) {
        setTimeout(function() {
          var notification = webkitNotifications.createNotification(
            'icon.png',
            "Fallen Galaxy : Nouveau"+(lstmsgs.length > 1?"x":"")+" message"+(lstmsgs > 1?"s":""),
            lstmsgs.join("\n")
          );
          lstmsgs = [];
          notification.show();
          setTimeout(function() { notification.cancel(); }, 10000);
        }, 20000 - (now - last));
      }
      lstmsgs.push(alert.message);
    }
    last = now;
  });
});
