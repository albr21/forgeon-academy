var APP = (window as any).APP;

var {
  PAGE,
  useApp,
  // Components
  Sidebar,
  Header,
  Footer,
  ToastContainer,
  Confetti,
  OnboardingModal,
  // Pages
  DashboardPage,
  TopicPage,
  LessonPage,
  ProfilePage,
  AchievementsPage,
  SettingsPage,
} = APP;

function App() {
  const app = useApp();

  const renderPage = () => {
    switch (app.currentPage) {
      case PAGE.HOME:
        return <DashboardPage profile={app.profile} onNavigate={app.navigate} />;

      case PAGE.TOPIC:
        return app.currentTopicId ? (
          <TopicPage
            topicId={app.currentTopicId}
            profile={app.profile}
            onNavigate={app.navigate}
            onBack={() => app.navigate(PAGE.HOME)}
          />
        ) : null;

      case PAGE.LESSON:
        return app.currentTopicId && app.currentLessonId ? (
          <LessonPage
            topicId={app.currentTopicId}
            lessonId={app.currentLessonId}
            profile={app.profile}
            onComplete={app.handleCompleteLesson}
            onCodeRun={app.handleCodeRun}
            onBack={() => app.navigate(PAGE.TOPIC, app.currentTopicId!)}
            onNavigateLesson={(id: string) => app.navigate(PAGE.LESSON, app.currentTopicId!, id)}
          />
        ) : null;

      case PAGE.PROFILE:
        return <ProfilePage profile={app.profile} />;

      case PAGE.ACHIEVEMENTS:
        return <AchievementsPage profile={app.profile} />;

      case PAGE.SETTINGS:
        return (
          <SettingsPage
            profile={app.profile}
            onUpdateProfile={app.handleUpdateProfile}
            onExport={app.handleExport}
            onImport={app.handleImport}
            onReset={app.handleReset}
          />
        );

      default:
        return <DashboardPage profile={app.profile} onNavigate={app.navigate} />;
    }
  };

  return (
    <>
      <div className="app-layout">
        {app.sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => app.setSidebarOpen(false)}
          />
        )}
        <Sidebar
          currentPage={app.currentPage}
          currentTopicId={app.currentTopicId}
          profile={app.profile}
          onNavigate={app.navigate}
          isOpen={app.sidebarOpen}
          onClose={() => app.setSidebarOpen(false)}
        />
        <main className="main-content">
          <Header
            profile={app.profile}
            currentPage={app.currentPage}
            currentTopic={app.currentTopic}
            currentLesson={app.currentLesson}
            onMenuToggle={() => app.setSidebarOpen((prev: boolean) => !prev)}
            theme={app.theme}
            onToggleTheme={app.toggleTheme}
          />
          {renderPage()}
          <Footer />
        </main>
      </div>
      <ToastContainer toasts={app.toasts} onRemove={app.removeToast} />
      <Confetti active={app.showConfetti} />
      {app.showOnboarding && <OnboardingModal onComplete={app.handleOnboardingComplete} />}
    </>
  );
}

var rootElement = document.getElementById('root');
var root = (ReactDOM as any).createRoot(rootElement);
root.render(<App />);
