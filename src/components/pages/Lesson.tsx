var APP = (window as any).APP;
var { TOPICS, CodeSandbox, Quiz } = APP;

const COPY_ICON_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
const CHECK_ICON_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  });
}

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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    container.querySelectorAll('pre').forEach((pre) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.title = 'Copy code';
      btn.innerHTML = COPY_ICON_SVG;
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code');
        const text = (code as HTMLElement)?.innerText ?? pre.innerText;
        copyToClipboard(text).then(() => {
          btn.innerHTML = CHECK_ICON_SVG;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = COPY_ICON_SVG;
            btn.classList.remove('copied');
          }, 1500);
        });
      });
      pre.appendChild(btn);
    });
  }, [lesson?.id]);

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
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
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

        <div className="lesson-content" ref={contentRef} dangerouslySetInnerHTML={{ __html: lesson.content }} />

        {lesson.code && (
          <CodeSandbox key={lesson.id} code={lesson.code} onCodeRun={onCodeRun} />
        )}

        {lesson.quiz && lesson.quiz.length > 0 && (
          <Quiz
            questions={lesson.quiz}
            onPass={() => {
              if (!isCompleted) onComplete(lesson.id, lesson.xpReward);
            }}
          />
        )}

        <div className="lesson-actions">
          <div style={{ display: 'flex', gap: '8px' }}>
            {prevLesson && (
              <button className="btn btn-ghost" onClick={() => onNavigateLesson(prevLesson.id)}>
                ← Previous
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
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
