Package.describe({
  name: 'flynn:crawler',
  version: '0.0.5',
  // Brief, one-line summary of the package.
  summary: 'crawl is very simple',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/niceilm/meteor-crawler.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.export('Crawler');
  api.versionsFrom('METEOR@1.2');
  api.use('meteorhacks:ssr@2.2.0', 'server');
  api.addFiles('crawler.js', 'server');
  api.addAssets('template.js.tpl', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('flynn:crawler');
  api.addFiles('crawler-tests.js');
});
