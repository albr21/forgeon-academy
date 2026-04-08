var APP = (window as any).APP;
var { TOPICS, xpProgress, ProgressRing } = APP;

interface UserProfile {
  username: string;
  xp: number;
  level: number;
  completedLessons: string[];
  achievements: string[];
  codeRunCount: number;
  joinDate: string;
  profileImage?: string;
}

function ProfilePage({ profile }: { profile: UserProfile }) {
  const progress = xpProgress(profile.xp);
  const totalLessons = TOPICS.reduce((sum: number, t: any) => sum + t.lessons.length, 0);

  const joinDate = new Date(profile.joinDate);
  const joinDateStr = joinDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="page-content">
      <div className="profile-page">
        <div className="profile-hero">
          <div className="profile-avatar-large">
            {profile.profileImage
              ? <img src={profile.profileImage} alt="" className="avatar-img" />
              : profile.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h1>{profile.username}</h1>
            <p className="profile-joined">Joined {joinDateStr}</p>
            <div className="profile-level-info">
              <div className="profile-level-badge">
                <span className="level-num">Lv. {profile.level}</span>
                <span className="level-label">({profile.xp} XP)</span>
              </div>
              <div className="profile-xp-display">
                <strong>{progress.current}</strong> / {progress.needed} XP to Level {profile.level + 1}
              </div>
            </div>
            <div style={{ marginTop: '12px', width: '300px' }}>
              <div className="xp-bar" style={{ width: '100%', height: '10px' }}>
                <div className="xp-bar-fill" style={{ width: `${progress.percentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{profile.xp}</div>
            <div className="stat-label">Total XP</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{profile.completedLessons.length}</div>
            <div className="stat-label">Lessons Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🧪</div>
            <div className="stat-value">{profile.codeRunCount}</div>
            <div className="stat-label">Code Runs</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{profile.achievements.length}</div>
            <div className="stat-label">Achievements</div>
          </div>
        </div>

        <h2 className="section-title" style={{ marginTop: '32px' }}>Topic Progress</h2>
        <div style={{ marginTop: '16px' }}>
          {TOPICS.map((topic: any) => {
            const completedInTopic = topic.lessons.filter((l: any) =>
              profile.completedLessons.includes(l.id)
            ).length;
            const pct = topic.lessons.length > 0 ? (completedInTopic / topic.lessons.length) * 100 : 0;
            return (
              <div key={topic.id} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '12px 16px', background: 'var(--bg-card)',
                border: '1px solid var(--border-color)', borderRadius: '10px',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '24px' }}>{topic.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '14px' }}>
                    {topic.title}
                  </div>
                  <div className="topic-progress-bar" style={{ marginTop: '6px' }}>
                    <div className="fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {completedInTopic}/{topic.lessons.length}
                </span>
                <ProgressRing percentage={pct} size={36} strokeWidth={3} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

APP.ProfilePage = ProfilePage;
