## install
```
meteor add flynn:crawler
```

## prerequisite
```
brew install phantomjs
```

## use
```
  var results = Crawler.crawl({
    openUrl: 'http://www.naver.com',
    evaluateScript: Assets.getText('crawlers/some_function.js')
  });
```

**private/crwalers/some_function.js**
```
function some_function() {
    return {title:document.title};
}
```