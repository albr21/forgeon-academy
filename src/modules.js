(function () {
  var babelAttr = 'type="text/babel" data-presets="react,typescript"';

  var modules = [
    'src/core/init.tsx',
    'src/core/xp.tsx',
    'src/core/storage.tsx',
    'src/core/python.tsx',

    'src/components/Toast.tsx',
    'src/components/Confetti.tsx',
    'src/components/ProgressRing.tsx',

    'src/components/CodeSandbox.tsx',

    'src/components/Sidebar.tsx',
    'src/components/Header.tsx',
    'src/components/Footer.tsx',
    'src/components/Onboarding.tsx',

    'src/components/pages/Dashboard.tsx',
    'src/components/pages/Topic.tsx',
    'src/components/pages/Lesson.tsx',
    'src/components/pages/Profile.tsx',
    'src/components/pages/Achievements.tsx',
    'src/components/pages/Settings.tsx',

    'src/hooks/useToasts.tsx',
    'src/hooks/useTheme.tsx',
    'src/hooks/useNavigation.tsx',
    'src/hooks/useProfile.tsx',
    'src/hooks/useApp.tsx',

    'src/app.tsx',
  ];

  for (var i = 0; i < modules.length; i++) {
    document.write('<script ' + babelAttr + ' src="' + modules[i] + '"><\/script>');
  }
})();
