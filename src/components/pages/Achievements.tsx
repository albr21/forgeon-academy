var APP = (window as any).APP;
var { ACHIEVEMENTS } = APP;

interface UserProfile {
  achievements: string[];
}

function AchievementsPage({ profile }: { profile: UserProfile }) {
  const categories = ACHIEVEMENTS.reduce((acc: any, ach: any) => {
    const cat = ach.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ach);
    return acc;
  }, {});

  const unlockedCount = profile.achievements.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <div className="page-content">
      <h1 className="section-title">🏆 Achievements</h1>
      <p className="section-subtitle">
        {unlockedCount} of {totalCount} achievements unlocked
      </p>

      <div className="xp-bar" style={{ width: '100%', height: '8px', marginBottom: '32px' }}>
        <div
          className="xp-bar-fill"
          style={{
            width: `${totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0}%`,
            background: 'var(--gradient-gold)',
          }}
        />
      </div>

      {Object.entries(categories).map(([category, achs]: [string, any]) => (
        <div key={category} style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
            {category}
          </h2>
          <div className="achievements-grid">
            {achs.map((ach: any) => {
              const isUnlocked = profile.achievements.includes(ach.id);
              return (
                <div key={ach.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  <div className="achievement-icon">{ach.icon}</div>
                  <div className="achievement-info">
                    <h3>{ach.title}</h3>
                    <p>{ach.description}</p>
                  </div>
                  <span className="achievement-badge">
                    {isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

APP.AchievementsPage = AchievementsPage;
