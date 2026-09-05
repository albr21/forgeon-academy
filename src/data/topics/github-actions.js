window.TOPICS = window.TOPICS || [];
window.TOPICS.push({
  id: "github-actions",
  title: "GitHub Actions",
  description: "Learn what GitHub Actions is, how workflows, jobs, and runners fit together, and the good practices to build reliable CI/CD pipelines.",
  icon: "⚙️",
  difficulty: "Intermediate",
  lessons: [
    {
      id: "ga-introduction",
      title: "Introduction",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>What is GitHub Actions?</h2>
        <p><strong>GitHub Actions</strong> is a tool integrated directly into the GitHub platform, enabling automation of tasks within your software development workflow. This includes processes such as continuous integration (CI), continuous deployment (CD), automated testing, version management, and more. Whether for open-source projects or enterprise applications, it optimizes workflows and accelerates the development cycle.</p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Custom Automation</strong> - Define custom workflows using YAML syntax, tailored to your project's needs</li>
          <li><strong>Seamless Integration</strong> - As a native part of GitHub, it reacts to events such as pushes, pull requests, issue updates, and more</li>
          <li><strong>CI/CD</strong> - Build comprehensive pipelines covering build, test, package, and deployment, all from your repository</li>
          <li><strong>Flexibility &amp; Extensibility</strong> - Use a wide range of pre-built actions from the GitHub Marketplace, or create your own</li>
          <li><strong>Workflow Optimization</strong> - Automate repetitive tasks, freeing up time for development and code quality</li>
          <li><strong>Security and Compliance</strong> - Benefit from secret management and access controls to protect sensitive information</li>
        </ul>

        <h3>Core Concepts</h3>
        <p>A few terms come back constantly when talking about GitHub Actions:</p>
        <ul>
          <li><strong>Workflow</strong> - A configurable automated process made up of one or more jobs, defined in a YAML file within the <code>.github/workflows</code> directory of a repository. It is triggered by specific events and can run on runners.</li>
          <li><strong>Job</strong> - A set of steps that execute on the same runner. Jobs can run sequentially or in parallel, depending on the workflow configuration.</li>
          <li><strong>Step</strong> - An individual task within a job, which can be an action or a shell command. Steps run in the order they are defined.</li>
          <li><strong>Action</strong> - A reusable unit of code that performs a specific task. Actions can be built by anyone and shared through the GitHub Marketplace, or created locally in a repository.</li>
          <li><strong>Runner</strong> - A server (virtual or physical) that executes the jobs defined in a workflow.</li>
          <li><strong>Secret</strong> - An encrypted variable used to store sensitive information (API keys, credentials, ...), accessible by workflows at runtime but never exposed in logs.</li>
          <li><strong>Variable</strong> - A non-sensitive value reused across steps or workflows (configuration data, feature flags, ...).</li>
          <li><strong>Event</strong> - A specific activity that triggers a workflow, such as a push to a branch, the creation of a pull request, or a scheduled time.</li>
        </ul>

        <figure class="diagram-figure">
          <img src="src/data/assets/github-actions/diagrams/svg/concepts-overview.svg" alt="Diagram showing how an event triggers a workflow, which contains jobs, made of steps, which use actions and run on a runner" />
          <figcaption>From an event to a running job: event &rarr; workflow &rarr; jobs &rarr; steps &rarr; actions / runner</figcaption>
        </figure>

        <div class="info-box">
          <div class="info-title">💡 Good to know</div>
          <p>The full official documentation is available at <a href="https://docs.github.com/en/actions" target="_blank" rel="noopener noreferrer">docs.github.com/en/actions</a>.</p>
        </div>
      `
    },
    {
      id: "ga-dashboard-pull-requests",
      title: "Dashboard & Pull Requests",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>The GitHub Actions Dashboard</h2>
        <p>The GitHub Actions dashboard provides an overview of all workflows, their status, and recent runs for a repository. It allows developers to monitor the health of their CI/CD pipelines, identify issues, and track the progress of automated tasks. It can be accessed from the <strong>Actions</strong> tab of a GitHub repository.</p>

        <figure class="screenshot-figure">
          <img src="src/data/assets/github-actions/screenshots/github-actions-dashboard.png" alt="Placeholder screenshot of the GitHub Actions tab, listing recent workflow runs" />
          <figcaption>The Actions tab, listing recent workflow runs and their status</figcaption>
        </figure>

        <h3>Workflow Runs on Pull Requests</h3>
        <p>When a repository is configured to run workflows on pull requests, the status of each run is displayed directly at the bottom of the pull request. This lets reviewers see CI checks, open logs, and spot issues before merging. Checks are attached to the last commit of the pull request and update automatically on every new commit.</p>

        <figure class="diagram-figure">
          <img src="src/data/assets/github-actions/diagrams/svg/workflow-trigger-flow.svg" alt="Sequence diagram showing a developer pushing code, GitHub triggering a workflow, a runner executing the job, and the pull request being updated with the result" />
          <figcaption>From a push / pull request event to the status check shown on the pull request</figcaption>
        </figure>

        <div class="warning-box">
          <div class="warning-title">⚠️ Logs are not always instant</div>
          <p>The GitHub Actions log system is not strictly real-time: there can be a short delay between a step executing and its logs appearing in the interface. If a log seems stuck, wait a moment and refresh the page. Even if nothing new appears immediately, complete logs are always available once the run has finished.</p>
        </div>

        <div class="info-box">
          <div class="info-title">💡 Curious how it's built?</div>
          <p>All of this comes from a workflow file living in the repository. The next lesson shows how to write one.</p>
        </div>
      `
    },
    {
      id: "ga-writing-a-workflow",
      title: "Your First Workflow",
      type: "reading",
      xpReward: 40,
      content: `
        <h2>Where Do Workflows Live?</h2>
        <p>A workflow is just a YAML file. To create your first one:</p>
        <ol>
          <li>Create a <code>.github/workflows/</code> folder at the root of your repository (if it doesn't already exist)</li>
          <li>Add a <code>.yml</code> file inside it, e.g. <code>build-and-test.yml</code></li>
          <li>Commit and push it to GitHub</li>
          <li>Open the <strong>Actions</strong> tab of the repository: the workflow is picked up automatically and runs on the next matching event</li>
        </ol>

        <h2>Anatomy of a Workflow File</h2>
        <p>Here is a minimal example that builds and tests a project on every push and pull request:</p>

        <pre><code>name: build-and-test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up runtime
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test</code></pre>

        <p>Breaking it down:</p>
        <ul>
          <li><code>name</code> - the display name of the workflow</li>
          <li><code>on</code> - the event(s) that trigger the workflow</li>
          <li><code>jobs</code> - one or more jobs, each with a <code>runs-on</code> (the runner) and a list of <code>steps</code></li>
          <li><code>uses</code> - runs a reusable action (here, official GitHub actions)</li>
          <li><code>run</code> - runs a shell command directly</li>
        </ul>

        <h3>Events & Triggers</h3>
        <p>The <code>on</code> key is not limited to <code>push</code> and <code>pull_request</code>. A few other common triggers:</p>
        <pre><code>on:
  push:
    branches: [main]
  workflow_dispatch:      # adds a "Run workflow" button in the Actions tab
  schedule:
    - cron: "0 6 * * 1"   # every Monday at 06:00 UTC</code></pre>
        <ul>
          <li><code>workflow_dispatch</code> - lets you trigger the workflow manually from the Actions tab, handy while testing a workflow</li>
          <li><code>schedule</code> - runs the workflow on a cron schedule, useful for nightly builds or periodic checks</li>
          <li><code>release</code>, <code>issues</code>, <code>workflow_call</code>, ... - many other events exist, see the <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows" target="_blank" rel="noopener noreferrer">full list of events</a></li>
        </ul>
        <p>Multiple triggers can be combined, and a workflow runs whenever any of them matches.</p>

        <h3>A Typical CI/CD Pipeline</h3>
        <p>Most pipelines chain the same handful of stages, regardless of the language or stack:</p>

        <figure class="diagram-figure">
          <img src="src/data/assets/github-actions/diagrams/svg/cicd-pipeline.svg" alt="Diagram showing the typical CI/CD pipeline stages: checkout, build, test, package, deploy" />
          <figcaption>Checkout &rarr; Build &rarr; Test &rarr; Package &rarr; Deploy</figcaption>
        </figure>

        <p>Each stage can be its own job, allowing them to run in parallel when there is no dependency between them, or sequentially using the <code>needs</code> keyword when a stage depends on the previous one's output.</p>

        <div class="info-box">
          <div class="info-title">💡 Try it</div>
          <p>Add the example above to a test repository, push it, and open the <strong>Actions</strong> tab you saw earlier to watch it run.</p>
        </div>
      `
    },
    {
      id: "ga-secrets-variables",
      title: "Secrets & Variables",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>Secrets and Variables</h2>
        <p>Workflows often need sensitive information (tokens, passwords, API keys) or reusable configuration values. GitHub Actions provides two dedicated mechanisms for that:</p>
        <ul>
          <li><strong>Secrets</strong> - Encrypted values that can only be consumed by workflows at runtime. Their values are always masked in logs.</li>
          <li><strong>Variables</strong> - Plain values, not encrypted, meant for non-sensitive configuration that can be reused across steps or workflows.</li>
        </ul>
        <p>Both can be defined at different levels: repository, environment, or organization, giving you fine-grained control over what is shared and where.</p>

        <p>They are managed under <strong>Settings &gt; Secrets and variables</strong>, at the repository or organization level.</p>

        <figure class="screenshot-figure">
          <img src="src/data/assets/github-actions/screenshots/github-actions-secrets-and-variables.png" alt="Placeholder screenshot of the Secrets and variables settings page" />
          <figcaption>Settings &gt; Secrets and variables &gt; Actions</figcaption>
        </figure>

        <h3>Using Them in a Workflow</h3>
        <pre><code>steps:
  - name: Call an API
    env:
      API_TOKEN: \${{ secrets.API_TOKEN }}
      API_URL: \${{ vars.API_URL }}
    run: curl -H "Authorization: Bearer $API_TOKEN" "$API_URL"</code></pre>

        <div class="info-box">
          <div class="info-title">💡 Why it matters</div>
          <p>Never hardcode credentials in a workflow file: it is committed to the repository history and visible to anyone with read access. Always go through secrets, and use variables for everything else that may need to change without touching the workflow file.</p>
        </div>

        <p>Official references: <a href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets" target="_blank" rel="noopener noreferrer">Secrets documentation</a> and <a href="https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables" target="_blank" rel="noopener noreferrer">Variables documentation</a>.</p>
      `
    },
    {
      id: "ga-runners",
      title: "Runners",
      type: "reading",
      xpReward: 35,
      content: `
        <h2>GitHub Actions Runners</h2>
        <p>A <strong>runner</strong> is the server that actually executes the jobs defined in a workflow. Runners can be hosted by GitHub, or hosted by yourself, and they can be configured to run on different operating systems and environments.</p>

        <h3>Types of Runners</h3>
        <ul>
          <li><strong>GitHub-Hosted Runners</strong> - Fully managed by GitHub. A fresh virtual machine (Ubuntu, Windows, or macOS) is provisioned for each job and destroyed right after. Zero maintenance, but less control over the environment.</li>
          <li><strong>Self-Hosted Runners</strong> - You provide and maintain the machine (a laptop, a Raspberry Pi, a server, a container, ...). This gives full control over hardware, OS, and installed tools, but also full responsibility for security and maintenance.</li>
          <li><strong>Ephemeral Self-Hosted Runners</strong> - Same idea as self-hosted runners, except each runner is destroyed and recreated after every job. This limits the blast radius of a compromised job and avoids state leaking between runs, which is the recommended way to operate self-hosted runners at scale.</li>
        </ul>

        <figure class="diagram-figure">
          <img src="src/data/assets/github-actions/diagrams/svg/runners-types.svg" alt="Diagram comparing GitHub-hosted runners, self-hosted runners, and ephemeral self-hosted runners" />
          <figcaption>GitHub-hosted vs self-hosted vs ephemeral self-hosted runners</figcaption>
        </figure>

        <figure class="screenshot-figure">
          <img src="src/data/assets/github-actions/screenshots/github-actions-runners-settings.png" alt="Placeholder screenshot of the self-hosted runners settings page" />
          <figcaption>Settings &gt; Actions &gt; Runners - where self-hosted runners are registered and managed</figcaption>
        </figure>

        <div class="warning-box">
          <div class="warning-title">⚠️ Security first</div>
          <p>Self-hosted runners execute arbitrary workflow code on your infrastructure. Be especially careful when enabling them on public repositories or repositories that accept pull requests from forks, and read the official <a href="https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners" target="_blank" rel="noopener noreferrer">self-hosted runners security guidance</a> before enabling them.</p>
        </div>

        <p>Larger organizations often centralize self-hosted runners behind a "Runner as a Service" style offering, so individual teams don't each have to manage their own runner infrastructure.</p>
      `
    },
    {
      id: "ga-going-further",
      title: "Going Further",
      type: "reading",
      xpReward: 40,
      content: `
        <h2>Going Further</h2>
        <p>Once the basics feel comfortable, a handful of features come up in almost every real-world pipeline.</p>

        <h3>Caching Dependencies</h3>
        <p>Re-downloading dependencies on every run wastes time. <code>actions/cache</code> stores a folder between runs and restores it based on a key (often derived from a lock file):</p>
        <pre><code>- name: Cache dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-\${{ hashFiles('package-lock.json') }}</code></pre>

        <h3>Uploading Artifacts</h3>
        <p>Artifacts let you keep files produced by a job (build output, test reports, coverage, ...) and download them from the run's summary page, or pass them to another job:</p>
        <pre><code>- name: Upload build output
  uses: actions/upload-artifact@v4
  with:
    name: dist
    path: dist/</code></pre>

        <h3>Matrix Builds</h3>
        <p>A matrix runs the same job multiple times with different variable combinations, in parallel, which is useful to test several versions or operating systems at once:</p>
        <pre><code>strategy:
  matrix:
    node-version: [18, 20, 22]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}</code></pre>

        <h3>Conditional Steps</h3>
        <p>The <code>if</code> key skips a step or a job unless a condition is met, for example only running a step when a previous one failed:</p>
        <pre><code>- name: Notify on failure
  if: failure()
  run: echo "Something went wrong"</code></pre>

        <h3>Status Badge</h3>
        <p>A badge in the repository's README gives an at-a-glance view of the pipeline's health:</p>
        <pre><code>![build-and-test](https://github.com/OWNER/REPO/actions/workflows/build-and-test.yml/badge.svg)</code></pre>

        <div class="info-box">
          <div class="info-title">💡 One step at a time</div>
          <p>You don't need all of this on day one. Start with a simple workflow, and reach for caching, artifacts, or a matrix only once the pipeline actually needs them.</p>
        </div>
      `
    },
    {
      id: "ga-best-practices",
      title: "Good Practices",
      type: "reading",
      xpReward: 40,
      content: `
        <h2>Good Practices for CI/CD Pipelines</h2>
        <p>These practices help keep workflows consistent, secure, and easy to maintain as a project and its team grow.</p>

        <h3>1. Use Consistent Naming</h3>
        <p>Use kebab-case for workflow files, jobs, steps, custom actions, and variables:</p>
        <pre><code>.github/workflows/build-and-test.yml</code></pre>

        <h3>2. Reuse Instead of Reinventing</h3>
        <p>Prefer existing, well-maintained actions from the GitHub Marketplace over writing custom scripts for common tasks (checkout, caching, setting up a language runtime, publishing artifacts, ...). If the same third-party action is used across many repositories, consider wrapping it in your own proxy action so a version bump only has to happen in one place.</p>

        <h3>3. Never Hardcode Sensitive Data</h3>
        <p>Always use secrets and variables (see the <strong>Secrets &amp; Variables</strong> lesson) instead of embedding credentials or environment-specific values directly in workflow files.</p>

        <h3>4. Prefer Containers for Reproducibility</h3>
        <p>Running jobs in containers keeps the execution environment consistent across runners and avoids "works on my machine" issues caused by differing dependencies or tool versions. Prefer small, minimal images (for example Alpine-based) to speed up job startup and reduce the attack surface.</p>

        <h3>5. Apply the Principle of Least Privilege</h3>
        <p>By default, the token GitHub injects into a workflow (<code>GITHUB_TOKEN</code>) can have broad permissions. Restrict it explicitly with a <code>permissions</code> block, granting only what each job actually needs:</p>
        <pre><code>permissions:
  contents: read
  pull-requests: write</code></pre>

        <h3>6. Pin Third-Party Actions</h3>
        <p>A tag like <code>@v4</code> can be moved to point to a different commit. For third-party actions handling sensitive operations, pin to a full commit SHA instead of a tag, and let a bot (like Dependabot) open pull requests to bump the pinned version:</p>
        <pre><code>- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2</code></pre>

        <div class="info-box">
          <div class="info-title">💡 Takeaway</div>
          <p>None of these rules are enforced by GitHub itself - they are conventions a team agrees on to keep a growing set of workflows understandable and maintainable over time.</p>
        </div>
      `
    },
    {
      id: "ga-quiz",
      title: "Quick Check",
      type: "exercise",
      xpReward: 40,
      content: `
        <h2>Quick Knowledge Check 📝</h2>
        <p>Let's make sure the core GitHub Actions concepts are clear. Select the correct answer for each question.</p>
      `,
      quiz: [
        {
          question: "What triggers a GitHub Actions workflow?",
          choices: [
            "A manual click on a 'Run' button only",
            "An event, such as a push, a pull request, or a schedule",
            "A change to the repository's README file only",
            "Workflows always run continuously in the background"
          ],
          correct: 1,
          explanation: "Workflows are triggered by events defined in the `on:` section, such as `push`, `pull_request`, or `schedule`."
        },
        {
          question: "What is the relationship between a job and a step?",
          choices: [
            "A step contains multiple jobs",
            "A job is made of one or more steps that run on the same runner",
            "Jobs and steps are the same thing",
            "Steps run on a different runner than the job they belong to"
          ],
          correct: 1,
          explanation: "A job is a set of steps that execute sequentially on the same runner. Different jobs can run in parallel."
        },
        {
          question: "Which statement about secrets and variables is correct?",
          choices: [
            "Secrets are encrypted and masked in logs; variables are plain, non-sensitive values",
            "Variables are encrypted and secrets are not",
            "Secrets and variables can only be set at the repository level",
            "Secrets should be hardcoded directly in the workflow YAML for simplicity"
          ],
          correct: 0,
          explanation: "Secrets store sensitive data and are always masked in logs. Variables store non-sensitive, reusable configuration values."
        },
        {
          question: "What is the main advantage of ephemeral self-hosted runners over regular self-hosted runners?",
          choices: [
            "They are cheaper to operate",
            "They don't require any maintenance at all",
            "They are destroyed and recreated after each job, limiting state leakage and security risks",
            "They can only run on GitHub's own infrastructure"
          ],
          correct: 2,
          explanation: "Ephemeral self-hosted runners are torn down after every job, which prevents state from leaking between runs and reduces the impact of a compromised job."
        },
        {
          question: "Why is it recommended to pin third-party actions to a full commit SHA instead of a tag?",
          choices: [
            "It makes the workflow file shorter",
            "Tags are not supported by GitHub Actions",
            "A tag can be moved to point to a different, potentially malicious commit, while a commit SHA is immutable",
            "It is required for the workflow to trigger on pull requests"
          ],
          correct: 2,
          explanation: "Unlike a tag, a commit SHA always points to the exact same code, protecting against a compromised or re-tagged action version."
        },
        {
          question: "What does the `workflow_dispatch` trigger allow you to do?",
          choices: [
            "Automatically run the workflow on every commit",
            "Manually trigger the workflow from the Actions tab",
            "Delete old workflow runs automatically",
            "Dispatch the job to multiple repositories at once"
          ],
          correct: 1,
          explanation: "`workflow_dispatch` adds a 'Run workflow' button in the Actions tab, letting you trigger a run manually without pushing a commit."
        },
        {
          question: "What is the purpose of a matrix strategy in a job?",
          choices: [
            "It encrypts secrets used by the job",
            "It runs the same job multiple times in parallel with different variable combinations, such as OS or language versions",
            "It merges several jobs into a single step",
            "It is required to use the `if` conditional keyword"
          ],
          correct: 1,
          explanation: "A matrix runs multiple copies of a job in parallel, one per combination of the defined variables, which is useful to test across versions or operating systems."
        }
      ]
    }
  ]
});
