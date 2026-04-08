// ============================================
// Forgeon Academy - Achievements Data
// ============================================
// To add a new achievement, add an object to the array below.
// The `condition` function receives the user profile and returns true/false.
// ============================================

window.ACHIEVEMENTS_DATA = [
  // === Getting Started ===
  {
    id: "first-steps",
    title: "First Steps",
    description: "Complete your very first lesson",
    icon: "👣",
    category: "Getting Started",
    condition: function(profile) {
      return profile.completedLessons.length >= 1;
    }
  },
  {
    id: "curious-mind",
    title: "Curious Mind",
    description: "Complete 5 lessons",
    icon: "🧠",
    category: "Getting Started",
    condition: function(profile) {
      return profile.completedLessons.length >= 5;
    }
  },
  {
    id: "knowledge-seeker",
    title: "Knowledge Seeker",
    description: "Complete 10 lessons",
    icon: "📚",
    category: "Getting Started",
    condition: function(profile) {
      return profile.completedLessons.length >= 10;
    }
  },
  {
    id: "dedicated-learner",
    title: "Dedicated Learner",
    description: "Complete 20 lessons",
    icon: "🎓",
    category: "Getting Started",
    condition: function(profile) {
      return profile.completedLessons.length >= 20;
    }
  },

  // === XP & Levels ===
  {
    id: "xp-100",
    title: "Getting Warmed Up",
    description: "Earn 100 XP",
    icon: "⭐",
    category: "XP & Levels",
    condition: function(profile) {
      return profile.xp >= 100;
    }
  },
  {
    id: "xp-500",
    title: "Rising Star",
    description: "Earn 500 XP",
    icon: "🌟",
    category: "XP & Levels",
    condition: function(profile) {
      return profile.xp >= 500;
    }
  },
  {
    id: "xp-1000",
    title: "XP Machine",
    description: "Earn 1,000 XP",
    icon: "💫",
    category: "XP & Levels",
    condition: function(profile) {
      return profile.xp >= 1000;
    }
  },
  {
    id: "level-5",
    title: "Level 5 Apprentice",
    description: "Reach Level 5",
    icon: "🔥",
    category: "XP & Levels",
    condition: function(profile) {
      return profile.level >= 5;
    }
  },
  {
    id: "level-10",
    title: "Level 10 Scholar",
    description: "Reach Level 10",
    icon: "🏅",
    category: "XP & Levels",
    condition: function(profile) {
      return profile.level >= 10;
    }
  },

  // === Code & Sandbox ===
  {
    id: "code-runner",
    title: "Code Runner",
    description: "Run code in the sandbox for the first time",
    icon: "▶️",
    category: "Coding",
    condition: function(profile) {
      return (profile.codeRunCount || 0) >= 1;
    }
  },
  {
    id: "code-enthusiast",
    title: "Code Enthusiast",
    description: "Run code 10 times in the sandbox",
    icon: "💻",
    category: "Coding",
    condition: function(profile) {
      return (profile.codeRunCount || 0) >= 10;
    }
  },
  {
    id: "code-ninja",
    title: "Code Ninja",
    description: "Run code 50 times in the sandbox",
    icon: "🥷",
    category: "Coding",
    condition: function(profile) {
      return (profile.codeRunCount || 0) >= 50;
    }
  },

  // === Topic Mastery ===
  {
    id: "topic-master-first",
    title: "Topic Master",
    description: "Complete all lessons in any topic",
    icon: "🏆",
    category: "Mastery",
    condition: function(profile) {
      return (profile.topicsCompleted || 0) >= 1;
    }
  },
  {
    id: "multi-disciplinary",
    title: "Multi-Disciplinary",
    description: "Complete all lessons in 2 different topics",
    icon: "🎯",
    category: "Mastery",
    condition: function(profile) {
      return (profile.topicsCompleted || 0) >= 2;
    }
  },
  {
    id: "completionist",
    title: "Completionist",
    description: "Complete all lessons in all available topics",
    icon: "👑",
    category: "Mastery",
    condition: function(profile) {
      var totalTopics = (window.TOPICS_DATA || []).length;
      return totalTopics > 0 && (profile.topicsCompleted || 0) >= totalTopics;
    }
  },

  // === Special ===
  {
    id: "data-backup",
    title: "Safety First",
    description: "Export your data for the first time",
    icon: "💾",
    category: "Special",
    condition: function(profile) {
      return profile.hasExported === true;
    }
  },
  {
    id: "customizer",
    title: "Make It Yours",
    description: "Change your username from the default",
    icon: "✏️",
    category: "Special",
    condition: function(profile) {
      return profile.username !== "Learner" && profile.username !== "";
    }
  },
  {
    id: "early-adopter",
    title: "Early Adopter",
    description: "Join Forgeon Academy (automatic!)",
    icon: "🚀",
    category: "Special",
    condition: function(profile) {
      return true; // Everyone gets this one!
    }
  }
];
