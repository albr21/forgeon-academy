// This file is the auto-loader for topics.
// Individual topic files in data/topics/*.js push into
// window.TOPICS, and this file finalizes
// the array into window.TOPICS_DATA for the app.
//
// HOW TO ADD A NEW TOPIC:
//   1. Create a new file in data/topics/  (e.g. my-topic.js)
//   2. Use this template:
//
//      window.TOPICS = window.TOPICS || [];
//      window.TOPICS.push({
//        id: "my-topic",
//        title: "My Topic",
//        description: "...",
//        icon: "🔧",
//        difficulty: "Beginner",
//        lessons: [ ... ]
//      });
//
//   3. Add a <script> tag in index.html BEFORE topics.js:
//      <script src="data/topics/my-topic.js"></script>
//
// ============================================

window.TOPICS_DATA = window.TOPICS || [];
