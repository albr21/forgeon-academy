var APP = (window as any).APP;

var {
  TOPICS,
  ACHIEVEMENTS,
  STORAGE_KEY,
  calculateLevel,
  getDefaultProfile,
  loadProfile,
  saveProfile,
  exportProfile,
  importProfile,
} = APP;

interface UserProfile {
  username: string;
  xp: number;
  level: number;
  completedLessons: string[];
  achievements: string[];
  codeRunCount: number;
  topicsCompleted: number;
  hasExported: boolean;
  joinDate: string;
  profileImage?: string;
}

function useProfile(addToast: Function, navigate: Function) {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setShowOnboarding(true);
  }, []);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const checkAchievements = useCallback((newProfile: UserProfile) => {
    const newAchievements: string[] = [];
    ACHIEVEMENTS.forEach((ach: any) => {
      if (!newProfile.achievements.includes(ach.id)) {
        try {
          if (ach.condition(newProfile)) newAchievements.push(ach.id);
        } catch (e) { /* skip */ }
      }
    });
    if (newAchievements.length > 0) {
      const updatedProfile = {
        ...newProfile,
        achievements: [...newProfile.achievements, ...newAchievements],
      };
      newAchievements.forEach(achId => {
        const ach = ACHIEVEMENTS.find((a: any) => a.id === achId);
        if (ach) {
          addToast({
            type: 'achievement',
            title: '🏆 Achievement Unlocked!',
            description: `${ach.icon} ${ach.title}`,
            icon: '🏆',
          });
        }
      });
      return updatedProfile;
    }
    return newProfile;
  }, [addToast]);

  const countCompletedTopics = useCallback((completedLessons: string[]) => {
    let count = 0;
    TOPICS.forEach((topic: any) => {
      const allDone = topic.lessons.every((l: any) => completedLessons.includes(l.id));
      if (allDone && topic.lessons.length > 0) count++;
    });
    return count;
  }, []);

  const handleCompleteLesson = useCallback((lessonId: string, xpReward: number) => {
    setProfile(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const oldLevel = prev.level;
      const newXP = prev.xp + xpReward;
      const newLevel = calculateLevel(newXP);
      const newCompletedLessons = [...prev.completedLessons, lessonId];
      const newTopicsCompleted = countCompletedTopics(newCompletedLessons);

      let newProfile: UserProfile = {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedLessons: newCompletedLessons,
        topicsCompleted: newTopicsCompleted,
      };

      addToast({ type: 'xp', title: `+${xpReward} XP`, description: 'Lesson completed!', icon: '⭐' });

      if (newLevel > oldLevel) {
        setTimeout(() => {
          addToast({ type: 'achievement', title: '🎉 Level Up!', description: `You reached Level ${newLevel}!`, icon: '🆙' });
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }, 500);
      }

      if (newTopicsCompleted > prev.topicsCompleted) {
        setTimeout(() => {
          addToast({ type: 'success', title: 'Topic Completed! 🎯', description: 'All lessons in this topic are done!', icon: '✅' });
        }, 1000);
      }

      return checkAchievements(newProfile);
    });
  }, [addToast, checkAchievements, countCompletedTopics]);

  const handleCodeRun = useCallback(() => {
    setProfile(prev => {
      const newProfile = { ...prev, codeRunCount: (prev.codeRunCount || 0) + 1 };
      return checkAchievements(newProfile);
    });
  }, [checkAchievements]);

  const handleUpdateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const checked = checkAchievements({ ...prev, ...updates });
      addToast({ type: 'success', title: 'Profile Updated', icon: '✅' });
      return checked;
    });
  }, [addToast, checkAchievements]);

  const handleExport = useCallback(() => {
    const json = exportProfile(profile);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${APP.CONFIG.exportPrefix}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setProfile(prev => checkAchievements({ ...prev, hasExported: true }));
    addToast({ type: 'success', title: 'Data Exported', description: 'JSON file downloaded', icon: '💾' });
  }, [profile, addToast, checkAchievements]);

  const handleImport = useCallback((json: string) => {
    const imported = importProfile(json);
    if (imported) {
      setProfile(imported);
      addToast({ type: 'success', title: 'Data Imported', description: 'Your progress has been restored', icon: '📤' });
    }
  }, [addToast]);

  const handleReset = useCallback(() => {
    const fresh = getDefaultProfile();
    setProfile(fresh);
    saveProfile(fresh);
    navigate(APP.PAGE.HOME);
    addToast({ type: 'success', title: 'Data Reset', description: 'All progress has been cleared', icon: '🗑️' });
  }, [addToast, navigate]);

  const handleOnboardingComplete = useCallback((username: string) => {
    const newProfile = { ...getDefaultProfile(), username };
    setProfile(newProfile);
    saveProfile(newProfile);
    setShowOnboarding(false);
    setTimeout(() => setProfile(prev => checkAchievements(prev)), 500);
  }, [checkAchievements]);

  return {
    profile,
    showConfetti,
    showOnboarding,
    handleCompleteLesson,
    handleCodeRun,
    handleUpdateProfile,
    handleExport,
    handleImport,
    handleReset,
    handleOnboardingComplete,
  };
}

APP.useProfile = useProfile;
