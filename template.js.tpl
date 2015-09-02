var page = require('webpage').create();

page.settings.userAgent = "{{{userAgent}}}";
page.settings.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
page.settings["Accept-Encoding"] = "gzip, deflate, sdch";
page.settings["Accept-Language"] = "{{{acceptLanguage}}}";
page.settings.Referer = "{{{referer}}}";
var settings = {{{settings}}}
page.open("{{{openUrl}}}", settings, function(status) {
    page.includeJs('{{{includeJsUrl}}}', function() {
        setTimeout(function(){
            var results = page.evaluate(function(){
                return ({{{evaluateScript}}})();
            });
            console.log(JSON.stringify(results));
            phantom.exit();
        }, {{timeout}});
    });
});