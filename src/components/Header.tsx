var APP = (window as any).APP;
var { PAGE, xpProgress } = APP;

interface UserProfile {
  username: string;
  xp: number;
  level: number;
}

function Header({
  profile,
  currentPage,
  currentTopic,
  currentLesson,
  onMenuToggle,
  theme,
  onToggleTheme,
}: {
  profile: UserProfile;
  currentPage: string;
  currentTopic: any;
  currentLesson: any;
  onMenuToggle: () => void;
  theme: string;
  onToggleTheme: () => void;
}) {
  const progress = xpProgress(profile.xp);

  const getTitle = () => {
    switch (currentPage) {
      case PAGE.HOME: return 'Dashboard';
      case PAGE.PROFILE: return 'Profile';
      case PAGE.ACHIEVEMENTS: return 'Achievements';
      case PAGE.SETTINGS: return 'Settings';
      case PAGE.TOPIC: return currentTopic?.title || 'Topic';
      case PAGE.LESSON: return currentLesson?.title || 'Lesson';
      default: return APP.CONFIG.appName;
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>☰</button>
        <div className="header-breadcrumb">
          {currentPage === PAGE.LESSON && currentTopic ? (
            <>
              <span>{currentTopic.title}</span>
              <span className="separator">›</span>
              <span className="breadcrumb-current">{currentLesson?.title || 'Lesson'}</span>
            </>
          ) : (
            <span className="breadcrumb-current">{getTitle()}</span>
          )}
        </div>
      </div>
      <div className="header-right">
        <div className="xp-bar-container">
          <span className="xp-bar-label">{profile.xp} XP</span>
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: `${progress.percentage}%` }} />
          </div>
        </div>
        <div className="level-badge" title={`Level ${profile.level}`}>
          {profile.level}
        </div>
        <div
          className={`theme-switch ${theme === 'light' ? 'light' : ''}`}
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          role="button"
          tabIndex={0}
        >
          <span className="theme-switch-icon sun">☀️</span>
          <span className="theme-switch-icon moon">🌙</span>
          <span className="theme-switch-knob" />
        </div>
      </div>
    </header>
  );
}

APP.Header = Header;
