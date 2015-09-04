var page = require('webpage').create();
var isConsoleReady = false;
page.settings.userAgent = "{{{userAgent}}}";
page.settings.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
page.settings["Accept-Encoding"] = "gzip, deflate, sdch";
page.settings["Accept-Language"] = "{{{acceptLanguage}}}";
page.settings.Referer = "{{{referer}}}";
var settings = {{{settings}}};

page.onConsoleMessage = function(msg) {
  if(isConsoleReady) {
    console.log(msg);
  }
};

page.onError = function(){}

page.open("{{{openUrl}}}", settings, function(status) {
  page.includeJs('{{{includeJsUrl}}}', function() {
    var count = 1;
    var MAX_REPEAT = {{maxRepeat}};
    var REPEAT_TERM = {{repeatTerm}};

    runner();

    function runner() {
      if(count > MAX_REPEAT) {
        var results = page.evaluate(function(){
          return ({{{evaluateScript}}})();
        });
        isConsoleReady = true;
        console.log(JSON.stringify(results));
        phantom.exit();
        return;
      }
      count++;

      page.evaluate(function(){
        return ({{{repeatScript}}})();
      });

      setTimeout(runner, REPEAT_TERM);
    }
  });
});