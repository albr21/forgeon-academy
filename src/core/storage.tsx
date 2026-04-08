var APP = (window as any).APP;
var STORAGE_KEY = APP.CONFIG.storageKey;
APP.STORAGE_KEY = STORAGE_KEY;

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

function getDefaultProfile(): UserProfile {
  return {
    username: 'Learner',
    xp: 0,
    level: 1,
    completedLessons: [],
    achievements: [],
    codeRunCount: 0,
    topicsCompleted: 0,
    hasExported: false,
    joinDate: new Date().toISOString(),
  };
}

function loadProfile(): UserProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return { ...getDefaultProfile(), ...parsed };
    }
  } catch (e) {
    console.error('Failed to load profile:', e);
  }
  return getDefaultProfile();
}

function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile:', e);
  }
}

function exportProfile(profile: UserProfile): string {
  return JSON.stringify(profile, null, 2);
}

function importProfile(json: string): UserProfile | null {
  try {
    const data = JSON.parse(json);
    if (data && typeof data.username === 'string') {
      return { ...getDefaultProfile(), ...data };
    }
  } catch (e) {
    console.error('Invalid import data:', e);
  }
  return null;
}

APP.getDefaultProfile = getDefaultProfile;
APP.loadProfile = loadProfile;
APP.saveProfile = saveProfile;
APP.exportProfile = exportProfile;
APP.importProfile = importProfile;
