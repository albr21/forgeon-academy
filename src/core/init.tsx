var APP_CONFIG = (window as any).APP_CONFIG;
(window as any).APP = {};
var APP = (window as any).APP;
APP.CONFIG = APP_CONFIG;

var { useState, useEffect, useCallback, useRef, useMemo } = React;

var PAGE = {
  HOME: 'home',
  TOPIC: 'topic',
  LESSON: 'lesson',
  PROFILE: 'profile',
  ACHIEVEMENTS: 'achievements',
  SETTINGS: 'settings',
} as const;

APP.PAGE = PAGE;

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

interface ToastData {
  id: number;
  type: 'xp' | 'achievement' | 'success' | 'error';
  title: string;
  description?: string;
  icon: string;
}

APP.TOPICS = (window as any).TOPICS_DATA || [];
APP.ACHIEVEMENTS = (window as any).ACHIEVEMENTS_DATA || [];

APP.toastIdCounter = 0;
