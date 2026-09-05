window.TOPICS = window.TOPICS || [];
window.TOPICS.push({
  id: "containerization-docker",
  title: "Containerization with Docker",
  description: "Learn containerization from scratch: the generic concepts behind any container engine, then hands-on with Docker to build, run, and compose your own containers.",
  icon: "🐳",
  difficulty: "Beginner",
  lessons: [
    {
      id: "containers-what-is",
      title: "What is Containerization?",
      type: "reading",
      xpReward: 25,
      content: `
        <h2>What Is Containerization?</h2>
        <p>Containerization packages an application together with everything it needs to run - code, dependencies, configuration - into a single, portable unit called a <strong>container</strong>. The same container runs identically on your laptop, a colleague's machine, or in production.</p>

        <h3>Containers vs Virtual Machines</h3>
        <figure class="diagram-figure">
          <img src="src/data/assets/containerization-docker/diagrams/svg/containers-vs-vms.svg" alt="Diagram comparing virtual machines, which each need a full guest OS on top of a hypervisor, with containers, which share the host OS through a container engine" />
          <figcaption>Virtual machines virtualize a whole machine; containers share the host's kernel</figcaption>
        </figure>

        <ul>
          <li><strong>Lightweight</strong> - Containers share the host OS kernel, so they start in seconds and use far less disk and memory than a VM</li>
          <li><strong>Portable</strong> - "Works on my machine" becomes "works everywhere a container engine runs"</li>
          <li><strong>Isolated</strong> - Each container has its own filesystem, processes, and network, independent of other containers</li>
          <li><strong>Reproducible</strong> - The exact same image is used from development to production</li>
        </ul>

        <div class="info-box">
          <div class="info-title">💡 Good to know</div>
          <p>Containerization is a concept, not a single product. The next lesson covers the standard and tools behind it, before we get hands-on with the most popular one: Docker.</p>
        </div>
      `
    },
    {
      id: "containers-ecosystem",
      title: "The Container Ecosystem",
      type: "reading",
      xpReward: 25,
      content: `
        <h2>How Containers Work, and Who Builds Them</h2>
        <h3>The Linux Mechanisms Behind Containers</h3>
        <p>On Linux, containers are not a special kind of process - they are regular processes, made to look isolated using two kernel features:</p>
        <ul>
          <li><strong>Namespaces</strong> - Give a process its own view of resources (filesystem, network, process list, hostname, ...), isolated from the rest of the system</li>
          <li><strong>cgroups (control groups)</strong> - Limit and measure how much CPU, memory, and I/O a process (or group of processes) can use</li>
        </ul>
        <p>Every container engine is ultimately built on top of these same mechanisms.</p>

        <h3>The OCI Standard</h3>
        <p>The <strong>Open Container Initiative (OCI)</strong> defines open standards so that images and runtimes built by different vendors stay compatible with each other:</p>
        <ul>
          <li><strong>Image spec</strong> - How a container image is packaged and structured</li>
          <li><strong>Runtime spec</strong> - How a compliant runtime should run a container from an image</li>
        </ul>
        <p>Thanks to this standard, an image built with one tool can generally be run by any other OCI-compliant tool.</p>

        <h3>Popular Container Tools</h3>
        <ul>
          <li><strong>Docker</strong> - The most widely used option: a daemon, a CLI, and an ecosystem (Compose, Hub, ...). What we'll use for the rest of this topic.</li>
          <li><strong>Podman</strong> - Daemonless and rootless by default, with a CLI compatible with Docker's</li>
          <li><strong>containerd</strong> - A lower-level runtime, often used under the hood by Docker and Kubernetes</li>
          <li><strong>LXC / LXD</strong> - System containers, closer to lightweight virtual machines than to single-application containers</li>
        </ul>

        <div class="info-box">
          <div class="info-title">💡 Good to know</div>
          <p><strong>Kubernetes</strong> orchestrates containers across many machines, regardless of which OCI-compliant engine runs them underneath.</p>
        </div>
      `
    },
    {
      id: "containers-docker-basics",
      title: "Docker Core Concepts",
      type: "reading",
      xpReward: 25,
      content: `
        <h2>Docker Core Concepts</h2>
        <p>From here on, we'll use <strong>Docker</strong> as our hands-on tool - the concepts transfer directly to any other container engine.</p>
        <figure class="diagram-figure">
          <img src="src/data/assets/containerization-docker/diagrams/svg/docker-architecture.svg" alt="Diagram showing the Docker client sending commands to the Docker daemon, which builds images, runs containers, and pulls or pushes images to a registry" />
          <figcaption>The Docker client talks to the daemon, which manages images, containers, and registries</figcaption>
        </figure>

        <h3>Key Vocabulary</h3>
        <ul>
          <li><strong>Image</strong> - A read-only template containing an application and its dependencies</li>
          <li><strong>Container</strong> - A running instance of an image</li>
          <li><strong>Dockerfile</strong> - A text file with instructions to build an image</li>
          <li><strong>Registry</strong> - A place to store and share images (e.g. Docker Hub)</li>
          <li><strong>Docker Daemon</strong> - The background service that builds images and runs containers</li>
          <li><strong>Docker Client</strong> - The <code>docker</code> command-line tool you interact with</li>
        </ul>

        <div class="info-box">
          <div class="info-title">💡 Analogy</div>
          <p>An image is like a recipe, and a container is a dish cooked from it. You can cook the same recipe as many times as you want, each time getting an independent dish.</p>
        </div>
      `
    },
    {
      id: "containers-installing",
      title: "Installing Docker",
      type: "reading",
      xpReward: 15,
      content: `
        <h2>Installing Docker</h2>
        <p>Docker Desktop provides everything you need on Windows and macOS. On Linux, you install the Docker Engine directly.</p>
        <ul>
          <li><strong>Windows / macOS</strong>: Download and install <a href="https://www.docker.com/products/docker-desktop" target="_blank">Docker Desktop</a></li>
          <li><strong>Linux</strong>: Follow your distribution's instructions on <a href="https://docs.docker.com/engine/install/" target="_blank">docs.docker.com</a> (e.g. <code>apt-get install docker-ce</code> on Ubuntu)</li>
        </ul>

        <p>Once installed, verify everything works:</p>
        <pre><code>docker --version
docker run hello-world</code></pre>

        <div class="warning-box">
          <div class="warning-title">⚠️ Behind a corporate proxy?</div>
          <p>See the "Proxies & Certificates" topic to configure Docker's proxy and certificates before pulling images.</p>
        </div>
      `
    },
    {
      id: "containers-dockerfile",
      title: "Writing Your First Dockerfile",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>Writing Your First Dockerfile</h2>
        <p>A <code>Dockerfile</code> is a set of instructions used to build an image:</p>
        <pre><code>FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]</code></pre>

        <h3>Key Instructions</h3>
        <ul>
          <li><code>FROM</code> - Base image to start from</li>
          <li><code>WORKDIR</code> - Sets the working directory inside the container</li>
          <li><code>COPY</code> - Copies files from your machine into the image</li>
          <li><code>RUN</code> - Executes a command while building the image (e.g. installing dependencies)</li>
          <li><code>CMD</code> - The default command executed when the container starts</li>
        </ul>

        <p>Build and run it:</p>
        <pre><code>docker build -t my-app .
docker run my-app</code></pre>

        <div class="info-box">
          <div class="info-title">💡 Layer caching</div>
          <p>Docker builds images in layers, one per instruction, and caches them. Ordering instructions from least to most frequently changed (dependencies before source code) speeds up rebuilds.</p>
        </div>
      `
    },
    {
      id: "containers-cli",
      title: "Essential Docker CLI Commands",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>Essential Docker CLI Commands</h2>
        <table>
          <thead>
            <tr><th>Command</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>docker build -t &lt;name&gt; .</code></td><td>Build an image from a Dockerfile</td></tr>
            <tr><td><code>docker run &lt;image&gt;</code></td><td>Create and start a container from an image</td></tr>
            <tr><td><code>docker ps</code></td><td>List running containers</td></tr>
            <tr><td><code>docker ps -a</code></td><td>List all containers, including stopped ones</td></tr>
            <tr><td><code>docker images</code></td><td>List downloaded or built images</td></tr>
            <tr><td><code>docker stop &lt;container&gt;</code></td><td>Stop a running container</td></tr>
            <tr><td><code>docker rm &lt;container&gt;</code></td><td>Remove a stopped container</td></tr>
            <tr><td><code>docker logs &lt;container&gt;</code></td><td>View a container's output</td></tr>
            <tr><td><code>docker exec -it &lt;container&gt; sh</code></td><td>Open a shell inside a running container</td></tr>
          </tbody>
        </table>

        <h3>Common <code>docker run</code> Flags</h3>
        <ul>
          <li><code>-d</code> - Run in the background (detached)</li>
          <li><code>-p 8080:80</code> - Map host port 8080 to container port 80</li>
          <li><code>--name my-container</code> - Give the container a friendly name</li>
          <li><code>-e KEY=value</code> - Set an environment variable</li>
        </ul>
      `
    },
    {
      id: "containers-volumes-networking",
      title: "Data & Networking",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>Data &amp; Networking</h2>
        <h3>Volumes</h3>
        <p>Containers are ephemeral: data written inside a container is lost when it's removed. <strong>Volumes</strong> persist data outside the container's lifecycle:</p>
        <pre><code>docker run -v my-data:/app/data my-app</code></pre>
        <p>You can also mount a folder from your machine directly (a "bind mount"), which is handy for local development:</p>
        <pre><code>docker run -v $(pwd):/app my-app</code></pre>

        <h3>Networking</h3>
        <p>By default, containers are isolated from the host network. Publish a port to make a container reachable:</p>
        <pre><code>docker run -p 8080:80 my-app</code></pre>
        <p>Containers on the same custom network can reach each other by name:</p>
        <pre><code>docker network create my-network
docker run --network my-network --name db postgres
docker run --network my-network my-app  # can reach "db" by name</code></pre>
      `
    },
    {
      id: "containers-compose",
      title: "Docker Compose in a Nutshell",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>Docker Compose in a Nutshell</h2>
        <p>Real applications usually need several containers (app, database, cache, ...). <strong>Docker Compose</strong> lets you define and run them all with a single YAML file:</p>
        <pre><code>services:
  app:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:</code></pre>
        <pre><code>docker compose up -d
docker compose down</code></pre>

        <div class="info-box">
          <div class="info-title">💡 Good to know</div>
          <p>Compose automatically creates a shared network for all services, so <code>app</code> can reach <code>db</code> simply by its service name.</p>
        </div>
      `
    },
    {
      id: "containers-hands-on",
      title: "Image Layers & Container Lifecycle",
      type: "sandbox",
      xpReward: 50,
      content: `
        <h2>Hands-On: Image Layers &amp; Container Lifecycle</h2>
        <p>In this sandbox, we'll simulate two core Docker mechanics: how image layers get cached during a build, and how independent containers are started from the same image.</p>
        <p>Run the code below to see it in action:</p>
      `,
      code: {
        language: "python",
        starterCode: `# Simulating Docker Image Layers & Container Lifecycle

class Image:
    def __init__(self, name, layers):
        self.name = name
        self.layers = layers

    def __str__(self):
        return f"Image '{self.name}' ({len(self.layers)} layers)"


class Container:
    def __init__(self, name, image):
        self.name = name
        self.image = image
        self.state = "created"

    def start(self):
        self.state = "running"
        print(f"[{self.name}] started from {self.image.name} -> state: {self.state}")

    def stop(self):
        self.state = "stopped"
        print(f"[{self.name}] stopped -> state: {self.state}")

    def remove(self):
        self.state = "removed"
        print(f"[{self.name}] removed -> state: {self.state}")


def build_image(name, instructions, cache):
    """Simulate Docker's layer caching: unchanged instructions reuse a cached layer."""
    layers = []
    print(f"Building image '{name}'...")
    for instruction in instructions:
        if instruction in cache:
            print(f"  CACHED  {instruction}")
        else:
            print(f"  RUN     {instruction}")
            cache.add(instruction)
        layers.append(instruction)
    return Image(name, layers)


# === Simulation ===
print("=" * 50)
print("  Docker Image & Container Lifecycle Simulation")
print("=" * 50)
print()

cache = set()

instructions = [
    "FROM node:20-alpine",
    "WORKDIR /app",
    "COPY package*.json ./",
    "RUN npm install",
    "COPY . .",
]

print("--- First build ---")
image_v1 = build_image("my-app:v1", instructions, cache)
print(image_v1)
print()

print("--- Rebuild (dependencies unchanged, only source files changed) ---")
image_v2 = build_image("my-app:v2", instructions, cache)
print(image_v2)
print()

print("--- Running independent containers from the same image ---")
container1 = Container("web-1", image_v2)
container2 = Container("web-2", image_v2)

container1.start()
container2.start()
container1.stop()
container2.remove()
`
      }
    },
    {
      id: "containers-best-practices",
      title: "Best Practices",
      type: "reading",
      xpReward: 20,
      content: `
        <h2>Best Practices</h2>
        <ol>
          <li><strong>Use small base images</strong> - prefer <code>alpine</code> or <code>slim</code> variants to reduce size and attack surface</li>
          <li><strong>Add a <code>.dockerignore</code></strong> - exclude <code>node_modules</code>, <code>.git</code>, and other files you don't want copied into the image</li>
          <li><strong>Order instructions from least to most frequently changed</strong> - to make the most of layer caching</li>
          <li><strong>Run as a non-root user</strong> - add a <code>USER</code> instruction instead of running as root</li>
          <li><strong>One process per container</strong> - keep containers focused and easy to scale or replace independently</li>
          <li><strong>Pin image versions</strong> - use a specific tag (e.g. <code>node:20-alpine</code>) instead of <code>latest</code>, for reproducible builds</li>
          <li><strong>Never bake secrets into an image</strong> - pass them at runtime via environment variables or a secrets manager</li>
        </ol>
      `
    },
    {
      id: "containers-quiz",
      title: "Quick Check",
      type: "exercise",
      xpReward: 40,
      content: `
        <h2>Quick Knowledge Check 📝</h2>
        <p>Let's make sure the core containerization concepts are clear. Select the correct answer for each question.</p>
      `,
      quiz: [
        {
          question: "What is the main difference between a container and a virtual machine?",
          choices: [
            "Containers share the host OS kernel, while VMs virtualize a full machine including a guest OS",
            "Containers include a full guest operating system, VMs don't",
            "There is no real difference, they are the same technology",
            "Containers can only run one process ever, VMs can run many"
          ],
          correct: 0,
          explanation: "Containers share the host's kernel through a container engine, making them much lighter and faster to start than VMs, which each need a full guest OS."
        },
        {
          question: "What is the OCI standard for, and what does it enable?",
          choices: [
            "It's a Docker-only feature for managing volumes",
            "It's a certification required to install Docker",
            "It defines open image and runtime specs, so different tools stay compatible with each other",
            "It only applies to Kubernetes clusters"
          ],
          correct: 2,
          explanation: "The Open Container Initiative defines image and runtime specifications, so an image built by one tool can be run by any other OCI-compliant engine (Docker, Podman, containerd, ...)."
        },
        {
          question: "What is the relationship between a Docker image and a container?",
          choices: [
            "An image is a running instance of a container",
            "A container is a running instance of an image",
            "Images and containers are the exact same thing",
            "A container can exist without ever being based on an image"
          ],
          correct: 1,
          explanation: "An image is a read-only template. A container is created by running that image, and many independent containers can be started from the same image."
        },
        {
          question: "In a Dockerfile, what does the `CMD` instruction do?",
          choices: [
            "It sets an environment variable available at build time only",
            "It copies files from the host into the image",
            "It is only used to add comments to the Dockerfile",
            "It defines the default command executed when the container starts"
          ],
          correct: 3,
          explanation: "`CMD` specifies the default command that runs when a container is started from the image."
        },
        {
          question: "Why use a Docker volume instead of writing data directly inside the container's filesystem?",
          choices: [
            "Data inside a container is lost when the container is removed; a volume persists it independently",
            "Volumes make the container image smaller",
            "Volumes are required for a container to start",
            "Volumes are only useful for networking, not storage"
          ],
          correct: 0,
          explanation: "Containers are ephemeral. A volume stores data outside of the container's own lifecycle, so it survives container removal."
        },
        {
          question: "What problem does Docker Compose solve?",
          choices: [
            "It replaces the need for a Dockerfile entirely",
            "It is a registry for storing Docker images",
            "It lets you define and run multiple related containers (app, database, ...) from a single YAML file",
            "It only works for a single container at a time, like `docker run`"
          ],
          correct: 2,
          explanation: "Compose describes a multi-container application in a `docker-compose.yml` file, and starts/stops all of its services together."
        },
        {
          question: "Which of these is a recommended Docker best practice?",
          choices: [
            "Always use the `latest` tag so you automatically get the newest version",
            "Pin a specific image version and run as a non-root user",
            "Run every container process as root for simplicity",
            "Bake API keys and passwords directly into the image for convenience"
          ],
          correct: 1,
          explanation: "Pinning versions keeps builds reproducible, and running as a non-root user reduces the impact of a compromised container. Secrets should never be baked into an image."
        }
      ]
    }
  ]
});
