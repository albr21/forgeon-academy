(function () {
  // Topic files (order = display order in sidebar)
  var topicScripts = [
    'src/data/topics/welcome.js',
    'src/data/topics/privacy-recommendation.js',
    'src/data/topics/github-actions.js',
    'src/data/topics/proxy-certs.js',
  ];

  var dataScripts = [
    'src/data/topics.js',
    'src/data/achievements.js',
  ];

  var all = topicScripts.concat(dataScripts);
  for (var i = 0; i < all.length; i++) {
    document.write('<script src="' + all[i] + '"><\/script>');
  }
})();
