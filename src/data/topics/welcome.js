window.TOPICS = window.TOPICS || [];
window.TOPICS.push({
  id: "welcome",
  title: "Welcome to Forgeon Academy",
  description: "Get started with Forgeon Academy! Learn how to navigate the platform, track your progress, and make the most out of your learning journey.",
  icon: "🚀",
  difficulty: "Beginner",
  lessons: [
    {
      id: "welcome-overview",
      title: "Overview",
      type: "reading",
      xpReward: 25,
      content: `
        <h2>Welcome to Forgeon Academy! 🎉</h2>
        <p>Forgeon Academy is an interactive platform for learning technical computer science concepts. Whether you're a beginner or an experienced developer looking to expand your knowledge, you'll find structured courses designed to take you from fundamentals to advanced topics.</p>

        <h3>How It Works</h3>
        <p>The platform is organized around <strong>Topics</strong>, each covering a major area of technology. Inside each topic, you'll find multiple <strong>Lessons</strong> of three types:</p>
        <ul>
          <li><strong>📖 Reading</strong> - Theoretical content with explanations and examples</li>
          <li><strong>🧩 Exercise</strong> - Practice questions and challenges to test your understanding</li>
          <li><strong>🧪 Sandbox</strong> - Interactive code playgrounds where you can write and run Python code directly in your browser</li>
        </ul>

        <h3>Progress</h3>
        <p>Forgeon Academy uses a gamification system to keep you motivated:</p>
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
        <h2>Navigating Forgeon Academy</h2>
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
        <p>Forgeon Academy includes an interactive Python sandbox powered by <strong>Skulpt</strong>, allowing you to write and execute Python code directly in your browser.</p>

        <div class="info-box">
          <div class="info-title">💡 About the Sandbox</div>
          <p>The sandbox supports standard Python syntax including variables, loops, functions, classes, and most built-in functions. Some advanced libraries (like numpy) are not available in the browser environment, but essential Python features work great for learning.</p>
        </div>

        <h3>Try It Out</h3>
        <p>Below you'll find a code sandbox pre-loaded with a simple Python script. Click the <strong>▶ Run</strong> button to execute it. Feel free to modify the code and experiment!</p>


      `,
      code: {
        language: "python",
        starterCode: `# Welcome to Forgeon Academy! 🚀
# This is your first Python sandbox.
# Click "Run" to execute this code.

def greet(name):
    return f"Hello, {name}! Welcome to Forgeon Academy!"

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
        <p>Let's make sure you understood the basics of Forgeon Academy. Answer the following questions:</p>

        <h3>Question 1</h3>
        <p>What are the three types of lessons available on Forgeon Academy?</p>
        <blockquote>Reading, Exercise, and Sandbox</blockquote>

        <h3>Question 2</h3>
        <p>How is your progress saved?</p>
        <blockquote>Progress is saved automatically in your browser's local storage. You can export it as JSON for backup.</blockquote>

        <h3>Question 3</h3>
        <p>What do you earn by completing lessons?</p>
        <blockquote>XP (Experience Points) that contribute to your level and can unlock achievements.</blockquote>

        <div class="info-box">
          <div class="info-title">✅ Self-Assessment</div>
          <p>These are self-paced questions. Review the answers above and mark this lesson as complete when you're confident you understand the platform basics.</p>
        </div>
      `
    }
  ]
});
