var APP = (window as any).APP;
var { PAGE, TOPICS } = APP;
var { ProgressRing } = APP;

interface UserProfile {
  completedLessons: string[];
}

function TopicPage({
  topicId,
  profile,
  onNavigate,
  onBack,
}: {
  topicId: string;
  profile: UserProfile;
  onNavigate: (page: string, topicId?: string, lessonId?: string) => void;
  onBack: () => void;
}) {
  const topic = TOPICS.find((t: any) => t.id === topicId);
  if (!topic) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">Topic not found</div>
        </div>
      </div>
    );
  }

  const completedInTopic = topic.lessons.filter((l: any) =>
    profile.completedLessons.includes(l.id)
  ).length;
  const totalXP = topic.lessons.reduce((sum: number, l: any) => sum + l.xpReward, 0);
  const earnedXP = topic.lessons
    .filter((l: any) => profile.completedLessons.includes(l.id))
    .reduce((sum: number, l: any) => sum + l.xpReward, 0);

  return (
    <div className="page-content">
      <div className="topic-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1>
          <span>{topic.icon}</span>
          {topic.title}
        </h1>
        <p>{topic.description}</p>

        <div className="topic-stats-bar">
          <div className="topic-stat">
            <span className="label">Progress:</span>
            <span className="value teal">{completedInTopic}/{topic.lessons.length} lessons</span>
          </div>
          <div className="topic-stat">
            <span className="label">XP Earned:</span>
            <span className="value gold">{earnedXP}/{totalXP} XP</span>
          </div>
          <div className="topic-stat">
            <span className="label">Difficulty:</span>
            <span className="value">{topic.difficulty}</span>
          </div>
          <ProgressRing
            percentage={topic.lessons.length > 0 ? (completedInTopic / topic.lessons.length) * 100 : 0}
            size={44}
            strokeWidth={4}
          />
        </div>
      </div>

      <div className="lesson-list">
        {topic.lessons.map((lesson: any, index: number) => {
          const isCompleted = profile.completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className={`lesson-item ${isCompleted ? 'completed' : ''}`}
              onClick={() => onNavigate(PAGE.LESSON, topicId, lesson.id)}
            >
              <div className="lesson-number">
                {isCompleted ? '✓' : index + 1}
              </div>
              <div className="lesson-info">
                <div className="lesson-title">{lesson.title}</div>
                <div className="lesson-meta">
                  <span className={`lesson-type-badge ${lesson.type}`}>
                    {lesson.type === 'reading' && '📖 '}
                    {lesson.type === 'exercise' && '🧩 '}
                    {lesson.type === 'sandbox' && '🧪 '}
                    {lesson.type}
                  </span>
                  <span>⭐ {lesson.xpReward} XP</span>
                </div>
              </div>
              <div className="lesson-check">
                {isCompleted && '✓'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

APP.TopicPage = TopicPage;
