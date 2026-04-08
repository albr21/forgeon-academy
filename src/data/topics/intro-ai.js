window.TOPICS = window.TOPICS || [];
window.TOPICS.push({
  id: "intro-ai",
  title: "Introduction to AI",
  description: "Explore the fundamentals of Artificial Intelligence, from basic concepts to machine learning, neural networks, and practical Python examples.",
  icon: "🤖",
  difficulty: "Intermediate",
  lessons: [
    {
      id: "ai-what-is",
      title: "What is Artificial Intelligence?",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>What is Artificial Intelligence?</h2>
        <p><strong>Artificial Intelligence (AI)</strong> is the simulation of human intelligence by computer systems. It encompasses a broad range of techniques that enable machines to perceive, learn, reason, and make decisions.</p>

        <h3>A Brief History</h3>
        <ul>
          <li><strong>1950</strong> — Alan Turing proposes the "Turing Test" to determine if a machine can think</li>
          <li><strong>1956</strong> — The term "Artificial Intelligence" is coined at the Dartmouth Conference</li>
          <li><strong>1997</strong> — IBM's Deep Blue defeats world chess champion Garry Kasparov</li>
          <li><strong>2012</strong> — Deep learning revolution begins with AlexNet (image recognition)</li>
          <li><strong>2016</strong> — Google's AlphaGo defeats world Go champion Lee Sedol</li>
          <li><strong>2022-2024</strong> — Large Language Models (ChatGPT, Claude, Gemini) bring AI to the mainstream</li>
        </ul>

        <h3>Types of AI</h3>
        <p>AI is often categorized into three levels:</p>
        <ul>
          <li><strong>Narrow AI (ANI)</strong> — Designed for specific tasks (e.g., image recognition, language translation). This is where we are today.</li>
          <li><strong>General AI (AGI)</strong> — Hypothetical AI that can perform any intellectual task a human can. Not yet achieved.</li>
          <li><strong>Super AI (ASI)</strong> — Hypothetical AI that surpasses human intelligence in all aspects. Science fiction territory (for now).</li>
        </ul>

        <h3>AI Subfields</h3>
        <pre><code>Artificial Intelligence
├── Machine Learning
│   ├── Supervised Learning
│   ├── Unsupervised Learning
│   └── Reinforcement Learning
├── Deep Learning
│   ├── CNNs (Computer Vision)
│   ├── RNNs/Transformers (NLP)
│   └── GANs (Generation)
├── Natural Language Processing
├── Computer Vision
├── Robotics
└── Expert Systems</code></pre>
      `
    },
    {
      id: "ai-ml-basics",
      title: "Machine Learning Basics",
      type: "reading",
      xpReward: 35,
      content: `
        <h2>Machine Learning Fundamentals</h2>
        <p><strong>Machine Learning (ML)</strong> is a subset of AI where systems learn from data instead of being explicitly programmed. The key idea: instead of writing rules, you provide examples and the algorithm finds patterns.</p>

        <h3>Traditional Programming vs. Machine Learning</h3>
        <pre><code>Traditional Programming:
  Input: Data + Rules → Output: Results

Machine Learning:
  Input: Data + Results → Output: Rules (Model)</code></pre>

        <h3>Three Main Types of Machine Learning</h3>

        <h3>1. Supervised Learning</h3>
        <p>The algorithm learns from <strong>labeled data</strong> — you provide both input and the correct output.</p>
        <ul>
          <li><strong>Classification</strong> — Predict a category (e.g., spam or not spam)</li>
          <li><strong>Regression</strong> — Predict a number (e.g., house price)</li>
        </ul>
        <p>Algorithms: Linear Regression, Decision Trees, Random Forest, SVM, Neural Networks</p>

        <h3>2. Unsupervised Learning</h3>
        <p>The algorithm finds patterns in <strong>unlabeled data</strong> — no correct answers are provided.</p>
        <ul>
          <li><strong>Clustering</strong> — Group similar items (e.g., customer segments)</li>
          <li><strong>Dimensionality Reduction</strong> — Simplify data while preserving key features</li>
        </ul>
        <p>Algorithms: K-Means, DBSCAN, PCA, Autoencoders</p>

        <h3>3. Reinforcement Learning</h3>
        <p>The algorithm learns by <strong>trial and error</strong>, receiving rewards or penalties for actions taken in an environment.</p>
        <p>Examples: Game-playing AI (AlphaGo), robotics, autonomous driving</p>

        <div class="info-box">
          <div class="info-title">💡 Key Terms</div>
          <p><strong>Feature</strong> — An input variable (e.g., house size, number of rooms)<br>
          <strong>Label</strong> — The output variable to predict (e.g., house price)<br>
          <strong>Training</strong> — The process of feeding data to the algorithm<br>
          <strong>Model</strong> — The result of training; used to make predictions<br>
          <strong>Overfitting</strong> — When a model memorizes training data but fails on new data</p>
        </div>
      `
    },
    {
      id: "ai-neural-networks",
      title: "Neural Networks",
      type: "reading",
      xpReward: 40,
      content: `
        <h2>Neural Networks</h2>
        <p>A <strong>neural network</strong> is a computing system inspired by biological neural networks in the brain. It consists of layers of interconnected nodes (neurons) that process information.</p>

        <h3>Structure of a Neural Network</h3>
        <pre><code>Input Layer      Hidden Layer(s)     Output Layer
  [x1] ──────┐
              ├──→ [h1] ──┐
  [x2] ──────┤            ├──→ [y1]
              ├──→ [h2] ──┤
  [x3] ──────┤            ├──→ [y2]
              └──→ [h3] ──┘
              
  Features     Processing          Predictions</code></pre>

        <h3>How a Neuron Works</h3>
        <p>Each neuron performs a simple computation:</p>
        <pre><code>1. Receive inputs: x1, x2, x3, ...
2. Multiply by weights: w1*x1 + w2*x2 + w3*x3 + ...
3. Add bias: sum + b
4. Apply activation function: f(sum + b)
5. Output the result</code></pre>

        <h3>Common Activation Functions</h3>
        <ul>
          <li><strong>ReLU</strong> — f(x) = max(0, x) — Most popular, simple and effective</li>
          <li><strong>Sigmoid</strong> — f(x) = 1/(1 + e^(-x)) — Outputs between 0 and 1</li>
          <li><strong>Tanh</strong> — f(x) = (e^x - e^(-x))/(e^x + e^(-x)) — Outputs between -1 and 1</li>
          <li><strong>Softmax</strong> — Outputs probability distribution (used for multi-class classification)</li>
        </ul>

        <h3>Training: Backpropagation</h3>
        <p>Neural networks learn through a process called <strong>backpropagation</strong>:</p>
        <ol>
          <li><strong>Forward Pass</strong> — Input flows through the network to produce an output</li>
          <li><strong>Loss Calculation</strong> — Compare output with expected result</li>
          <li><strong>Backward Pass</strong> — Calculate how much each weight contributed to the error</li>
          <li><strong>Weight Update</strong> — Adjust weights to reduce the error (using gradient descent)</li>
          <li><strong>Repeat</strong> — Do this thousands of times with different training examples</li>
        </ol>

        <div class="info-box">
          <div class="info-title">💡 Deep Learning</div>
          <p>"Deep Learning" simply means using neural networks with many layers (deep networks). Modern architectures like Transformers (used in GPT, BERT) use attention mechanisms instead of traditional layer connections.</p>
        </div>
      `
    },
    {
      id: "ai-python-basics",
      title: "Python for AI: Data Basics",
      type: "sandbox",
      xpReward: 50,
      content: `
        <h2>Python for AI: Working with Data 🐍</h2>
        <p>Python is the most popular language for AI and Machine Learning. Let's practice some fundamental data operations that are essential for any AI project.</p>

        <p>In this sandbox, we'll implement basic data operations from scratch — statistics, data manipulation, and a simple dataset analysis:</p>
      `,
      code: {
        language: "python",
        starterCode: `# Python for AI - Data Basics
# Since we're in a browser sandbox, we'll implement
# common data operations from scratch!

import math

# === Basic Statistics Functions ===

def mean(data):
    """Calculate the arithmetic mean."""
    return sum(data) / len(data)

def variance(data):
    """Calculate the variance."""
    avg = mean(data)
    return sum((x - avg) ** 2 for x in data) / len(data)

def std_dev(data):
    """Calculate standard deviation."""
    return math.sqrt(variance(data))

def normalize(data):
    """Min-Max normalization to [0, 1] range."""
    min_val = min(data)
    max_val = max(data)
    if max_val == min_val:
        return [0.5] * len(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

# === Sample Dataset ===
# Student data: [hours_studied, previous_score, passed (1/0)]
dataset = [
    [2, 50, 0],
    [4, 60, 0],
    [5, 65, 1],
    [3, 55, 0],
    [7, 80, 1],
    [6, 70, 1],
    [8, 85, 1],
    [1, 40, 0],
    [9, 90, 1],
    [5, 68, 1],
]

print("📊 Student Performance Dataset Analysis")
print("=" * 45)

# Extract features
hours = [row[0] for row in dataset]
scores = [row[1] for row in dataset]
passed = [row[2] for row in dataset]

print(f"\\nSample size: {len(dataset)} students")
print(f"\\nHours Studied:")
print(f"  Mean: {mean(hours):.1f}")
print(f"  Std Dev: {std_dev(hours):.1f}")
print(f"  Range: {min(hours)} - {max(hours)}")

print(f"\\nPrevious Scores:")
print(f"  Mean: {mean(scores):.1f}")
print(f"  Std Dev: {std_dev(scores):.1f}")

print(f"\\nPass Rate: {mean(passed)*100:.0f}%")

# === Simple correlation ===
def correlation(x, y):
    n = len(x)
    mean_x, mean_y = mean(x), mean(y)
    num = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    den = math.sqrt(
        sum((xi - mean_x)**2 for xi in x) *
        sum((yi - mean_y)**2 for yi in y)
    )
    return num / den if den != 0 else 0

corr = correlation(hours, scores)
print(f"\\n📈 Correlation (hours vs scores): {corr:.3f}")
if corr > 0.7:
    print("   → Strong positive correlation!")
elif corr > 0.4:
    print("   → Moderate positive correlation")

# === Normalize features ===
norm_hours = normalize(hours)
norm_scores = normalize(scores)
print(f"\\n🔄 Normalized hours: {[f'{x:.2f}' for x in norm_hours]}")
print(f"🔄 Normalized scores: {[f'{x:.2f}' for x in norm_scores]}")
`
      }
    },
    {
      id: "ai-simple-model",
      title: "Build a Simple Classifier",
      type: "sandbox",
      xpReward: 75,
      content: `
        <h2>Build Your First ML Model 🧠</h2>
        <p>Let's implement a simple <strong>K-Nearest Neighbors (KNN)</strong> classifier from scratch in Python! KNN is one of the simplest yet effective ML algorithms.</p>

        <h3>How KNN Works</h3>
        <ol>
          <li>Given a new data point, find the K closest points in the training data</li>
          <li>Look at the labels of those K neighbors</li>
          <li>The most common label becomes the prediction</li>
        </ol>

        <p>Try running the code and experiment with different values of K:</p>
      `,
      code: {
        language: "python",
        starterCode: `# K-Nearest Neighbors (KNN) Classifier from Scratch
import math
import random

def euclidean_distance(point1, point2):
    """Calculate Euclidean distance between two points."""
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(point1, point2)))

def knn_predict(training_data, training_labels, test_point, k=3):
    """
    Predict the class of a test point using KNN.
    """
    # Calculate distances to all training points
    distances = []
    for i, train_point in enumerate(training_data):
        dist = euclidean_distance(train_point, test_point)
        distances.append((dist, training_labels[i]))

    # Sort by distance and get K nearest
    distances.sort(key=lambda x: x[0])
    k_nearest = distances[:k]

    # Vote: most common label wins
    votes = {}
    for dist, label in k_nearest:
        votes[label] = votes.get(label, 0) + 1

    prediction = max(votes, key=votes.get)
    confidence = votes[prediction] / k * 100

    return prediction, confidence, k_nearest


# === Dataset: Fruit Classification ===
# Features: [weight (g), sweetness (1-10)]
# Labels: "apple" or "orange"

training_data = [
    [150, 7], [160, 8], [170, 6], [140, 7.5],  # Apples
    [130, 8], [155, 7], [145, 6.5], [165, 7],   # Apples
    [200, 9], [210, 8.5], [190, 9.5], [220, 8], # Oranges
    [195, 9], [215, 8], [205, 9.2], [185, 8.8], # Oranges
]

training_labels = [
    "🍎 apple", "🍎 apple", "🍎 apple", "🍎 apple",
    "🍎 apple", "🍎 apple", "🍎 apple", "🍎 apple",
    "🍊 orange", "🍊 orange", "🍊 orange", "🍊 orange",
    "🍊 orange", "🍊 orange", "🍊 orange", "🍊 orange",
]

print("🧠 K-Nearest Neighbors Classifier")
print("=" * 45)
print(f"Training samples: {len(training_data)}")
print(f"Features: weight (g), sweetness (1-10)")
print(f"Classes: apple, orange")
print()

# === Test with new fruits ===
test_fruits = [
    ([155, 7.2], "Mystery Fruit A"),
    ([205, 8.8], "Mystery Fruit B"),
    ([175, 8.0], "Mystery Fruit C (borderline!)"),
]

K = 3  # Try changing this to 1, 5, or 7!
print(f"Using K = {K}")
print("-" * 45)

for features, name in test_fruits:
    prediction, confidence, neighbors = knn_predict(
        training_data, training_labels, features, k=K
    )
    print(f"\\n{name}")
    print(f"  Features: weight={features[0]}g, sweetness={features[1]}")
    print(f"  Prediction: {prediction}")
    print(f"  Confidence: {confidence:.0f}%")
    print(f"  Nearest neighbors:")
    for dist, label in neighbors:
        print(f"    - {label} (distance: {dist:.1f})")

# === Accuracy Test ===
print(f"\\n{'=' * 45}")
print("📊 Leave-One-Out Cross-Validation")
print("-" * 45)

correct = 0
for i in range(len(training_data)):
    # Train on all except i
    train_x = training_data[:i] + training_data[i+1:]
    train_y = training_labels[:i] + training_labels[i+1:]
    test_x = training_data[i]
    true_label = training_labels[i]

    pred, _, _ = knn_predict(train_x, train_y, test_x, k=K)
    if pred == true_label:
        correct += 1

accuracy = correct / len(training_data) * 100
print(f"Accuracy: {correct}/{len(training_data)} = {accuracy:.1f}%")
`
      }
    },
    {
      id: "ai-exercise-quiz",
      title: "AI Concepts Quiz",
      type: "exercise",
      xpReward: 45,
      content: `
        <h2>AI Concepts Review 📝</h2>
        <p>Test your understanding of the AI concepts we've covered. Think about each question before revealing the answer.</p>

        <h3>Question 1: Supervised vs. Unsupervised</h3>
        <p>You have a dataset of customer purchases but no labels. You want to group customers with similar buying behavior. Which type of ML is this?</p>
        <blockquote><strong>Unsupervised Learning (Clustering)</strong> — Since there are no labels, you're finding natural groups in the data. K-Means or DBSCAN would be appropriate algorithms.</blockquote>

        <h3>Question 2: Overfitting</h3>
        <p>Your model achieves 99% accuracy on training data but only 55% on new, unseen data. What's happening and how would you fix it?</p>
        <blockquote><strong>Overfitting</strong> — The model memorized the training data instead of learning general patterns. Solutions: use more training data, add regularization, use dropout (for neural networks), reduce model complexity, or use cross-validation.</blockquote>

        <h3>Question 3: Neural Network Depth</h3>
        <p>What's the difference between a neural network with 2 hidden layers and one with 50 hidden layers?</p>
        <blockquote>The 50-layer network is a <strong>deep neural network</strong> (deep learning). Deeper networks can learn more complex features and hierarchical representations, but they require more data, more compute, and are harder to train (vanishing gradients). Techniques like residual connections (ResNet) and batch normalization help train very deep networks.</blockquote>

        <h3>Question 4: KNN Trade-offs</h3>
        <p>In KNN, what happens if K is too small (e.g., K=1) vs. too large (e.g., K=N)?</p>
        <blockquote><strong>K=1</strong>: Very sensitive to noise; overfitting. A single outlier can change the prediction.<br>
        <strong>K=N</strong>: Always predicts the majority class; underfitting. The model ignores the local structure of the data.<br>
        The best K is usually found through cross-validation, and odd values of K are preferred to avoid ties.</blockquote>

        <div class="info-box">
          <div class="info-title">🎓 Next Steps</div>
          <p>You now have a solid foundation in AI concepts! To go further, explore frameworks like TensorFlow, PyTorch, and scikit-learn in a local Python environment.</p>
        </div>
      `
    }
  ]
});
