var _N = window.APP_CONFIG.appName;
window.TOPICS = window.TOPICS || [];
window.TOPICS.push({
  id: "welcome",
  title: `Welcome to ${_N}`,
  description: `Get started with ${_N}! Learn how to navigate the platform, track your progress, and make the most out of your learning journey.`,
  icon: "🚀",
  difficulty: "Beginner",
  lessons: [
    {
      id: "welcome-overview",
      title: "Overview",
      type: "reading",
      xpReward: 25,
      content: `
        <h2>Welcome to ${_N}! 🎉</h2>
        <p>${_N} is an interactive platform for learning technical computer science concepts. Whether you're a beginner or an experienced developer looking to expand your knowledge, you'll find structured courses designed to take you from fundamentals to advanced topics.</p>

        <h3>How It Works</h3>
        <p>The platform is organized around <strong>Topics</strong>, each covering a major area of technology. Inside each topic, you'll find multiple <strong>Lessons</strong> of three types:</p>
        <ul>
          <li><strong>📖 Reading</strong> - Theoretical content with explanations and examples</li>
          <li><strong>🧩 Exercise</strong> - Practice questions and challenges to test your understanding</li>
          <li><strong>🧪 Sandbox</strong> - Interactive code playgrounds where you can write and run Python code directly in your browser</li>
        </ul>

        <h3>Progress</h3>
        <p>${_N} uses a gamification system to keep you motivated:</p>
        <ul>
          <li><strong>⭐ XP (Experience Points)</strong> - Earn XP by completing lessons and exercises</li>
          <li><strong>📊 Levels</strong> - Level up as you accumulate XP</li>
          <li><strong>🏆 Achievements</strong> - Unlock badges for reaching milestones</li>
          <li><strong>📈 Progress Tracking</strong> - See your completion status for each topic</li>
        </ul>

        <div class="info-box">
          <div class="info-title">💡 Tip</div>
          <p>Your progress is saved automatically in your browser. You can also export your data as JSON from the Settings page to back it up or transfer it to another device.</p>
        </div>
      `
    },
    {
      id: "welcome-navigation",
      title: "Navigation",
      type: "reading",
      xpReward: 25,
      content: `
        <h2>Navigating ${_N}</h2>
        <p>Let's walk through the main sections of the interface so you know where everything is.</p>

        <h3>Sidebar</h3>
        <p>On the left side, you'll find the <strong>sidebar</strong> with all available topics. Each topic shows a progress indicator so you can quickly see how far you've come. The sidebar also has quick links to:</p>
        <ul>
          <li><strong>🏠 Dashboard</strong> - Your home page with an overview of stats and available topics</li>
          <li><strong>🏆 Achievements</strong> - Gallery of all available and unlocked achievements</li>
          <li><strong>⚙️ Settings</strong> - Change username, Upload profile picture, Export/import data, Reset all data</li>
        </ul>
        <p> At the bottom of the sidebar, you'll find your profile section with your avatar, username, and current level badge. Click on it to view your full profile and stats.</p>

        <h3>Main Content Area</h3>
        <p>The central area displays the current page content. When viewing a topic, you'll see a list of lessons. Click any lesson to dive into its content.</p>

        <h3>Header Bar</h3>
        <p>At the top, the header shows your current XP progress bar and level badge. This is always visible so you can track your progress at a glance.</p>

        <div class="info-box">
          <div class="info-title">💡 Tip</div>
          <p>When your screen is narrow, the sidebar will collapse to give you more space for content, use the hamburger menu (☰) in the top left to toggle it back open.
        </div>
      `
    },
    {
      id: "welcome-first-code",
      title: "Your First Code",
      type: "sandbox",
      xpReward: 50,
      content: `
        <h2>Run Your First Code! 🐍</h2>
        <p>${_N} includes an interactive Python sandbox powered by <strong>Skulpt</strong>, allowing you to write and execute Python code directly in your browser.</p>

        <div class="info-box">
          <div class="info-title">💡 About the Sandbox</div>
          <p>The sandbox supports standard Python syntax including variables, loops, functions, classes, and most built-in functions. Some advanced libraries (like numpy) are not available in the browser environment, but essential Python features work great for learning.</p>
        </div>

        <h3>Try It Out</h3>
        <p>Below you'll find a code sandbox pre-loaded with a simple Python script. Click the <strong>▶ Run</strong> button to execute it. Feel free to modify the code and experiment!</p>


      `,
      code: {
        language: "python",
        starterCode: `# Welcome to ${_N}! 🚀
# This is your first Python sandbox.
# Click "Run" to execute this code.

def greet(name):
    return f"Hello, {name}! Welcome to ${_N}!"

# Try changing the name below:
message = greet("Learner")
print(message)

# Let's do some math
for i in range(1, 6):
    print(f"  Level {i}: {i * 100} XP needed")

print("\\nHappy learning! 🎉")`
      }
    },
    {
      id: "welcome-quiz",
      title: "Quick Check",
      type: "exercise",
      xpReward: 40,
      content: `
        <h2>Quick Knowledge Check 📝</h2>
        <p>Let's make sure you understood the basics of ${_N}. Select the correct answer for each question.</p>
      `,
      quiz: [
        {
          question: "What are the three types of lessons available on " + _N + "?",
          choices: [
            "Video, Audio, and Text",
            "Reading, Exercise, and Sandbox",
            "Theory, Lab, and Exam",
            "Lecture, Tutorial, and Project"
          ],
          correct: 1,
          explanation: "The platform offers Reading lessons (theory), Exercise lessons (quizzes), and Sandbox lessons (interactive Python code)."
        },
        {
          question: "How is your progress saved?",
          choices: [
            "It's saved on a server with your account",
            "You must manually save after each lesson",
            "Automatically in your browser's localStorage",
            "Progress is not saved between sessions"
          ],
          correct: 2,
          explanation: "Progress is saved automatically in your browser's localStorage. You can also export it as JSON from the Settings page for backup."
        },
        {
          question: "What do you earn by completing lessons?",
          choices: [
            "Coins that can be spent in a shop",
            "Certificates signed by instructors",
            "XP (Experience Points) that contribute to your level",
            "Subscription credits"
          ],
          correct: 2,
          explanation: "You earn XP (Experience Points) for each completed lesson. XP accumulates to increase your level and unlock achievements."
        }
      ]
    }
  ]
});
