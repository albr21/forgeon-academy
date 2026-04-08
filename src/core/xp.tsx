var APP = (window as any).APP;

function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(50 * Math.pow(level - 1, 1.8));
}

function calculateLevel(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

function xpProgress(xp: number): { current: number; needed: number; percentage: number } {
  const level = calculateLevel(xp);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const current = xp - currentLevelXP;
  const needed = nextLevelXP - currentLevelXP;
  const percentage = needed > 0 ? Math.min((current / needed) * 100, 100) : 100;
  return { current, needed, percentage };
}

APP.xpForLevel = xpForLevel;
APP.calculateLevel = calculateLevel;
APP.xpProgress = xpProgress;
