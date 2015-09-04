Crawler = {};

var child_process = Npm.require('child_process');
var execFileSync = Meteor.wrapAsync(child_process.execFile);
var MAX_BUFFER = 20 * 1024 * 1024;
var requestTimeoutMs = 30 * 1000;
SSR.compileTemplate('crawlTemplate', Assets.getText('template.js.tpl'));

/**
 * @param {Object} options
 * @param {String} options.openUrl
 * @param {String} options.referer
 * @param {String} options.evaluateScript
 * @param {String} options.repeatScript
 * @param {String} options.userAgent
 * @param {String} options.settings
 * @returns {Object}
 */
Crawler.crawl = function(options) {
  check(options, Object);
  check(options.openUrl, String);

  options = _.defaults(options, {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36',
    acceptLanguage: 'ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4',
    includeJsUrl: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js',
    maxRepeat: 0,
    repeatTerm: 1000,
    repeatScript: "function(){}",
    settings: JSON.stringify({})
  });

  var phantomScript = SSR.render('crawlTemplate', options);
  $log.debug(phantomScript);
  var result = execFileSync('/bin/bash', ['-c', ("exec phantomjs /dev/stdin <<'END'\n" + phantomScript + "\nEND\n")], {
    timeout: requestTimeoutMs,
    maxBuffer: MAX_BUFFER
  });

  $log.debug(result);

  return JSON.parse(result || '{}');
};

/**
 * @param {Object} options
 * @param {String} options.openUrl
 * @param {String} options.referer
 * @param {String} options.evaluateScript
 * @param {String} options.userAgent
 * @param {String} options.settings
 * @param {String} options.timeout
 * @returns {Object}
 */
Crawler.safeCrawl = function(options) {
  try {
    return Crawler.crawl(options);
  } catch(e) {
    return null;
  }
};
