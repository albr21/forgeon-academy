var APP = (window as any).APP;
var { TOPICS } = APP;

function useNavigation() {
  const [currentPage, setCurrentPage] = useState(APP.PAGE.HOME);
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useCallback((page: string, topicId?: string, lessonId?: string) => {
    setCurrentPage(page);
    setCurrentTopicId(topicId || null);
    setCurrentLessonId(lessonId || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentTopic = currentTopicId ? TOPICS.find((t: any) => t.id === currentTopicId) : null;
  const currentLesson = currentTopic && currentLessonId
    ? currentTopic.lessons.find((l: any) => l.id === currentLessonId)
    : null;

  return {
    currentPage,
    currentTopicId,
    currentLessonId,
    currentTopic,
    currentLesson,
    sidebarOpen,
    setSidebarOpen,
    navigate,
  };
}

APP.useNavigation = useNavigation;
