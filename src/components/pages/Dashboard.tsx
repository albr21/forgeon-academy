var APP = (window as any).APP;
var { PAGE, TOPICS, ACHIEVEMENTS, xpProgress } = APP;

interface UserProfile {
  username: string;
  xp: number;
  level: number;
  completedLessons: string[];
  achievements: string[];
}

function DashboardPage({
  profile,
  onNavigate,
}: {
  profile: UserProfile;
  onNavigate: (page: string, topicId?: string) => void;
}) {
  const totalLessons = TOPICS.reduce((sum: number, t: any) => sum + t.lessons.length, 0);
  const completedLessons = profile.completedLessons.length;
  const progress = xpProgress(profile.xp);

  return (
    <div className="page-content">
      <div className="dashboard-hero">
        <h1>Welcome back, {profile.username}! 👋</h1>
        <p>
          You're Level {APP.calculateLevel(profile.xp)} with {profile.xp} XP. Keep learning to level up!
          {progress.needed > 0 && ` — ${progress.needed - progress.current} XP to next level.`}
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{profile.xp}</div>
          <div className="stat-label">Total XP Earned</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{APP.calculateLevel(profile.xp)}</div>
          <div className="stat-label">Current Level</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{completedLessons}/{totalLessons}</div>
          <div className="stat-label">Lessons Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{profile.achievements.length}/{ACHIEVEMENTS.length}</div>
          <div className="stat-label">Achievements Unlocked</div>
        </div>
      </div>

      <h2 className="section-title">Available Topics</h2>
      <p className="section-subtitle">Choose a topic to start learning</p>

      <div className="topics-grid">
        {TOPICS.map((topic: any) => {
          const completedInTopic = topic.lessons.filter((l: any) =>
            profile.completedLessons.includes(l.id)
          ).length;
          const topicProgress = topic.lessons.length > 0
            ? (completedInTopic / topic.lessons.length) * 100
            : 0;
          const totalXP = topic.lessons.reduce((sum: number, l: any) => sum + l.xpReward, 0);

          return (
            <div
              key={topic.id}
              className="topic-card"
              onClick={() => onNavigate(PAGE.TOPIC, topic.id)}
            >
              <div className="topic-icon">{topic.icon}</div>
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-desc">{topic.description}</p>
              <div className="topic-meta">
                <span className="topic-lessons-count">
                  📖 {topic.lessons.length} lessons
                </span>
                <span className="topic-xp">⭐ {totalXP} XP</span>
              </div>
              <div className="topic-progress-bar">
                <div className="fill" style={{ width: `${topicProgress}%` }} />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                {completedInTopic}/{topic.lessons.length} completed • {topic.difficulty}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

APP.DashboardPage = DashboardPage;
