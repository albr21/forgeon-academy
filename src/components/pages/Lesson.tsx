var APP = (window as any).APP;
var { TOPICS, CodeSandbox } = APP;

interface UserProfile {
  completedLessons: string[];
}

function LessonPage({
  topicId,
  lessonId,
  profile,
  onComplete,
  onCodeRun,
  onBack,
  onNavigateLesson,
}: {
  topicId: string;
  lessonId: string;
  profile: UserProfile;
  onComplete: (lessonId: string, xp: number) => void;
  onCodeRun: () => void;
  onBack: () => void;
  onNavigateLesson: (lessonId: string) => void;
}) {
  const topic = TOPICS.find((t: any) => t.id === topicId);
  const lesson = topic?.lessons.find((l: any) => l.id === lessonId);

  if (!topic || !lesson) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">Lesson not found</div>
        </div>
      </div>
    );
  }

  const isCompleted = profile.completedLessons.includes(lesson.id);
  const lessonIndex = topic.lessons.findIndex((l: any) => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? topic.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < topic.lessons.length - 1 ? topic.lessons[lessonIndex + 1] : null;

  return (
    <div className="page-content">
      <div className="lesson-view">
        <div className="lesson-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to {topic.title}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span className={`lesson-type-badge ${lesson.type}`} style={{ fontSize: '12px' }}>
              {lesson.type === 'reading' && '📖 '}
              {lesson.type === 'exercise' && '🧩 '}
              {lesson.type === 'sandbox' && '🧪 '}
              {lesson.type}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--accent-gold)' }}>⭐ {lesson.xpReward} XP</span>
            {isCompleted && (
              <span style={{
                fontSize: '12px',
                color: 'var(--accent-teal)',
                background: 'rgba(0,212,170,0.1)',
                padding: '2px 10px',
                borderRadius: '999px',
              }}>
                ✓ Completed
              </span>
            )}
          </div>
          <h1>{lesson.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Lesson {lessonIndex + 1} of {topic.lessons.length} in {topic.title}
          </p>
        </div>

        <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />

        {lesson.code && (
          <CodeSandbox code={lesson.code} onCodeRun={onCodeRun} />
        )}

        <div className="lesson-actions">
          <div style={{ display: 'flex', gap: '8px' }}>
            {prevLesson && (
              <button className="btn btn-ghost" onClick={() => onNavigateLesson(prevLesson.id)}>
                ← Previous
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {!isCompleted ? (
              <button
                className="btn btn-success"
                onClick={() => onComplete(lesson.id, lesson.xpReward)}
              >
                ✓ Mark as Complete (+{lesson.xpReward} XP)
              </button>
            ) : (
              <span style={{ color: 'var(--accent-teal)', fontWeight: 600, fontSize: '14px' }}>
                ✓ Completed
              </span>
            )}
            {nextLesson ? (
              <button className="btn btn-primary" onClick={() => onNavigateLesson(nextLesson.id)}>
                Next →
              </button>
            ) : (
              <button className="btn btn-outline" onClick={onBack}>
                ↩ Back to {topic.title}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

APP.LessonPage = LessonPage;
