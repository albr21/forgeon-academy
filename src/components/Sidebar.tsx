var APP = (window as any).APP;
var { PAGE, TOPICS } = APP;

interface UserProfile {
  username: string;
  xp: number;
  level: number;
  completedLessons: string[];
  achievements: string[];
  profileImage?: string;
}

function Sidebar({
  currentPage,
  currentTopicId,
  profile,
  onNavigate,
  isOpen,
  onClose,
}: {
  currentPage: string;
  currentTopicId: string | null;
  profile: UserProfile;
  onNavigate: (page: string, topicId?: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const getTopicProgress = (topic: any) => {
    const completedInTopic = topic.lessons.filter((l: any) =>
      profile.completedLessons.includes(l.id)
    ).length;
    return { completed: completedInTopic, total: topic.lessons.length };
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">{APP.CONFIG.logoLetter}</div>
        <span className="logo-text">{APP.CONFIG.appName}</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Navigation</div>
        <div
          className={`sidebar-item ${currentPage === PAGE.HOME ? 'active' : ''}`}
          onClick={() => { onNavigate(PAGE.HOME); onClose(); }}
        >
          <span className="item-icon">🏠</span>
          Dashboard
        </div>
        <div
          className={`sidebar-item ${currentPage === PAGE.ACHIEVEMENTS ? 'active' : ''}`}
          onClick={() => { onNavigate(PAGE.ACHIEVEMENTS); onClose(); }}
        >
          <span className="item-icon">🏆</span>
          Achievements
          {profile.achievements.length > 0 && (
            <span className="item-progress">{profile.achievements.length}</span>
          )}
        </div>
        <div
          className={`sidebar-item ${currentPage === PAGE.SETTINGS ? 'active' : ''}`}
          onClick={() => { onNavigate(PAGE.SETTINGS); onClose(); }}
        >
          <span className="item-icon">⚙️</span>
          Settings
        </div>

        <div className="sidebar-section-title">Topics</div>
        {TOPICS.map((topic: any) => {
          const progress = getTopicProgress(topic);
          const isComplete = progress.completed === progress.total;
          return (
            <div
              key={topic.id}
              className={`sidebar-item ${currentPage === PAGE.TOPIC && currentTopicId === topic.id ? 'active' : ''}`}
              onClick={() => { onNavigate(PAGE.TOPIC, topic.id); onClose(); }}
            >
              <span className="item-icon">{topic.icon}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {topic.title}
              </span>
              <span className={`item-progress ${isComplete ? 'complete' : ''}`}>
                {progress.completed}/{progress.total}
              </span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-profile" onClick={() => { onNavigate(PAGE.PROFILE); onClose(); }}>
        <div className="avatar">
          {profile.profileImage
            ? <img src={profile.profileImage} alt="" className="avatar-img" />
            : profile.username.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <div className="profile-name">{profile.username}</div>
          <div className="profile-level">⭐ Level {profile.level}</div>
        </div>
      </div>
    </div>
  );
}

APP.Sidebar = Sidebar;
