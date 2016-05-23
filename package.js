Package.describe({
  name: 'idklabs:reply',
  version: '0.0.1',
  summary: 'ReplyApp.io API integration for Meteor.js',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('http@1.0.0')
  api.addFiles('reply.js', 'client');
  api.export('Reply' ,'client');
});
