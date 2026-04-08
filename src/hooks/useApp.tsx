var APP = (window as any).APP;

function useApp() {
  const { toasts, addToast, removeToast } = APP.useToasts();
  const { theme, toggleTheme } = APP.useTheme();
  const {
    currentPage, currentTopicId, currentLessonId,
    currentTopic, currentLesson,
    sidebarOpen, setSidebarOpen, navigate,
  } = APP.useNavigation();
  const {
    profile, showConfetti, showOnboarding,
    handleCompleteLesson, handleCodeRun, handleUpdateProfile,
    handleExport, handleImport, handleReset, handleOnboardingComplete,
  } = APP.useProfile(addToast, navigate);

  return {
    // State
    profile,
    currentPage,
    currentTopicId,
    currentLessonId,
    currentTopic,
    currentLesson,
    toasts,
    showConfetti,
    sidebarOpen,
    showOnboarding,
    theme,
    // Actions
    navigate,
    toggleTheme,
    setSidebarOpen,
    removeToast,
    handleCompleteLesson,
    handleCodeRun,
    handleUpdateProfile,
    handleExport,
    handleImport,
    handleReset,
    handleOnboardingComplete,
  };
}

APP.useApp = useApp;
