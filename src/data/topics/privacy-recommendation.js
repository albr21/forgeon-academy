window.TOPICS = window.TOPICS || [];

(function () {
  const appCard = ({ logo, name, tagline, privacy, drawbacks, link }) => {
    const privacyPoints = Array.isArray(privacy) ? privacy : [privacy];
    return `
        <div class="app-card">
          <div class="app-card-header">
            <img class="app-logo" src="${logo}" alt="${name} logo" loading="lazy" />
            <div class="app-name">${name}</div>
          </div>
          <p class="app-desc">${tagline}</p>
          <ul class="app-privacy">
            ${privacyPoints.map((p) => `<li>🔒 ${p}</li>`).join('')}
          </ul>
          <ul class="app-drawbacks">
            ${drawbacks.map((d) => `<li>⚠️ ${d}</li>`).join('')}
          </ul>
          <a class="app-link" href="${link}" target="_blank" rel="noopener noreferrer">🔗 Visit official site</a>
        </div>`;
  };

  const appGrid = (cards) => `<div class="app-grid">${cards.join('')}</div>`;

  window.TOPICS.push({
    id: "privacy-recommendation",
    title: "Privacy Recommendation",
    description: "Learn about privacy best practices and get hands-picked, honest recommendations of tools and services to protect your personal information online.",
    icon: "🛡️",
    difficulty: "Beginner",
    lessons: [
      {
        id: "privacy-intro",
        title: "Why Privacy Matters",
        type: "reading",
        xpReward: 25,
        content: `
          <h2>Your Data, Your Choice 🕵️</h2>
          <p>Every day, the apps and services you use quietly collect data about you: what you search, watch, buy, and even where you are. This topic is a hands-on, opinionated guide to reclaiming some of that privacy - one tool at a time.</p>

          <h3>What You'll Find Here</h3>
          <p>Each lesson focuses on a category of tool or service you probably already use (browser, email, VPN, password manager...) and gives you:</p>
          <ul>
            <li>A quick explanation of what that category of tool is <em>for</em>, in general</li>
            <li>One or more <strong>recommended apps</strong>, with an official link</li>
            <li>Concrete <strong>privacy benefits</strong> 🔒 of that recommendation</li>
            <li>Honest <strong>drawbacks</strong> ⚠️ - nothing is perfect, and pretending otherwise wouldn't help you make a good decision</li>
          </ul>

          <h3>Our Selection Criteria</h3>
          <p>The recommendations across this topic tend to favor:</p>
          <ul>
            <li><strong>Open source</strong> software whenever possible, so the code can be independently audited</li>
            <li>Providers with a proven <strong>no-logs</strong> policy or <strong>end-to-end encryption</strong></li>
            <li>Tools that work well <strong>without an account</strong>, or with minimal personal information required</li>
          </ul>

          <div class="info-box">
            <div class="info-title">💡 No tool is magic</div>
            <p>Improving your privacy is about layering good habits and good tools together - not finding one app that "solves" privacy for good. Pick what's realistic for your own threat model and go from there.</p>
          </div>
        `
      },
      {
        id: "privacy-browsers",
        title: "Browsers",
        type: "reading",
        xpReward: 35,
        content: `
          <h2>Your Window to the Web 🌐</h2>
          <p>The browser is the single piece of software that sees the most of your online life: every site you visit, every form you fill in, every search you type. Choosing a privacy-respecting browser - and configuring it well - is one of the highest-impact changes you can make.</p>

          <h3>What a Browser Does (and Why It Matters for Privacy)</h3>
          <p>Beyond rendering web pages, your browser decides which trackers are allowed to run, how much of your "fingerprint" (screen size, fonts, installed plugins...) is exposed to sites, and who gets to read your browsing history. Not all browsers make the same choices here.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/firefox.svg",
              name: "Mozilla Firefox",
              tagline: "A general-purpose, independent web browser built on Mozilla's own Gecko engine - not another Chromium skin.",
              privacy: [
                "Blocks third-party tracking cookies and fingerprinting by default (Enhanced Tracking Protection)",
                "Fully open source - anyone can audit the code",
              ],
              drawbacks: [
                "Ships with some telemetry enabled by default (can be turned off manually)",
                "Mozilla's main revenue comes from a default search-engine deal with Google, which is a bit of a conflict of interest",
              ],
              link: "https://www.mozilla.org/firefox/",
            }),
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/brave.svg",
              name: "Brave",
              tagline: "A Chromium-based browser with built-in ad and tracker blocking, plus a one-click Tor private window.",
              privacy: [
                "Blocks ads/trackers at the network level out of the box, no extension needed",
                "Randomizes parts of your device fingerprint to make cross-site tracking harder",
              ],
              drawbacks: [
                "Built on Chromium, so it still reinforces Google's dominance over the web-engine ecosystem",
                "Ships with crypto/rewards features (BAT, ads program) that some consider unnecessary feature creep",
              ],
              link: "https://brave.com/",
            }),
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/tor-browser.svg",
              name: "Tor Browser",
              tagline: "A hardened Firefox build that routes all traffic through the Tor network for strong anonymity.",
              privacy: [
                "Bounces your connection through 3 relays, so no single party knows both who you are and what you visit",
                "Isolates cookies/state per site and resists fingerprinting by design",
              ],
              drawbacks: [
                "Noticeably slower than a normal browser due to the multi-hop routing",
                "Many sites throw extra CAPTCHAs at Tor traffic, or block exit nodes outright",
              ],
              link: "https://www.torproject.org/",
            }),
          ])}
        `
      },
      {
        id: "privacy-email",
        title: "Email",
        type: "reading",
        xpReward: 25,
        content: `
          <h2>Email: Still the Backbone of Your Identity 📧</h2>
          <p>Your email address is usually the key that resets every other account you own. A mainstream provider can scan and profile your inbox to serve ads or improve products; a privacy-focused provider is built specifically to not be able to do that.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/proton-mail.svg",
              name: "Proton Mail",
              tagline: "End-to-end encrypted email hosted in Switzerland, built by the team behind Proton VPN.",
              privacy: [
                "Messages between Proton Mail users are end-to-end encrypted, and Proton itself can't read them (zero-access encryption)",
                "Supports PGP for encrypted mail with non-Proton addresses",
              ],
              drawbacks: [
                "Full encryption only applies between Proton addresses (or with manual PGP setup) for outside contacts",
                "Free tier storage and features are more limited than Gmail or Outlook",
              ],
              link: "https://proton.me/mail",
            }),
          ])}
        `
      },
      {
        id: "privacy-vpn",
        title: "VPN",
        type: "reading",
        xpReward: 35,
        content: `
          <h2>VPNs: Hiding Your Traffic From Your Network 🛡️</h2>
          <p>A VPN (Virtual Private Network) encrypts your traffic between your device and the VPN provider's servers, and hides your real IP address from the sites you visit. It shifts trust from your ISP/local network to the VPN provider - so <em>who</em> you trust matters a lot.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/proton-vpn.svg",
              name: "Proton VPN",
              tagline: "A VPN service with an independently audited no-logs policy and a genuinely usable free tier.",
              privacy: [
                "Published, court-tested no-logs policy that has been independently audited",
                '"Secure Core" routes traffic through privacy-friendly countries before it exits the VPN network',
              ],
              drawbacks: [
                "Free tier is limited to a handful of server locations and capped speed",
                "The full server list and advanced features require a paid plan",
              ],
              link: "https://protonvpn.com/",
            }),
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/mullvad.svg",
              name: "Mullvad VPN",
              tagline: '"Mullvad" is Swedish for "mole" - fitting, for a VPN that barely wants to know who you are.',
              privacy: [
                "No account creation info required at all (no email, no username) - cash payments are even accepted",
                "Independently audited no-logs policy, fully open source apps",
              ],
              drawbacks: [
                "No free tier - flat fee regardless of usage",
                "Minimal app with no streaming-unblock focus or extra bells and whistles",
              ],
              link: "https://mullvad.net/",
            }),
          ])}
        `
      },
      {
        id: "privacy-drive",
        title: "Cloud Storage",
        type: "reading",
        xpReward: 25,
        content: `
          <h2>Cloud Storage Without Handing Over Your Files ☁️</h2>
          <p>Cloud drives are convenient for backups and sharing, but mainstream providers can technically read - and sometimes scan - whatever you upload. End-to-end encrypted storage keeps that key out of the provider's hands entirely.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/proton-drive.svg",
              name: "Proton Drive",
              tagline: "End-to-end encrypted cloud storage for your files, from the same Swiss-based privacy company.",
              privacy: [
                "Files, file names, and folder structure are all end-to-end encrypted before they leave your device",
                "Zero-access architecture: Proton itself cannot see your files",
              ],
              drawbacks: [
                "Smaller ecosystem of third-party integrations than Google Drive or Dropbox",
                "Free tier storage is more limited than some mainstream competitors",
              ],
              link: "https://proton.me/drive",
            }),
          ])}
        `
      },
      {
        id: "privacy-password-manager",
        title: "Password Manager",
        type: "reading",
        xpReward: 30,
        content: `
          <h2>Password Managers: Stop Reusing Passwords 🔑</h2>
          <p>A password manager generates and stores a unique, strong password for every account, so a breach on one site doesn't cascade into every other account you own. The best ones also encrypt your vault so even the provider can't read it.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/proton-pass.svg",
              name: "Proton Pass",
              tagline: "An end-to-end encrypted password manager with built-in email aliases to avoid giving out your real address.",
              privacy: [
                "Vault data (passwords, notes, 2FA secrets) is end-to-end encrypted",
                "Hide-my-email aliases let you sign up for services without leaking your real inbox",
              ],
              drawbacks: [
                "Younger product than established players like Bitwarden, so some platform integrations are less mature",
                "Free plan is limited to a single vault",
              ],
              link: "https://proton.me/pass",
            }),
          ])}
        `
      },
      {
        id: "privacy-2fa",
        title: "Two-Factor Authentication",
        type: "reading",
        xpReward: 25,
        content: `
          <h2>Two-Factor Authentication: A Second Lock on the Door 🔐</h2>
          <p>2FA (or MFA) adds a second, time-based code on top of your password, so a leaked password alone isn't enough to break into your account. A dedicated authenticator app is a big step up from SMS codes, which can be intercepted via SIM-swapping.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/proton-authenticator.svg",
              name: "Proton Authenticator",
              tagline: "A free, open-source TOTP authenticator app for your 2FA codes, with optional encrypted backup/sync.",
              privacy: [
                "2FA secrets can be backed up end-to-end encrypted if you enable sync",
                "No ads, no tracking, fully usable without a Proton account",
              ],
              drawbacks: [
                "Much newer product than established apps like Aegis, so the feature set is still catching up",
                "No hardware security key (FIDO2/WebAuthn) support - TOTP codes only",
              ],
              link: "https://proton.me/authenticator",
            }),
          ])}
        `
      },
      {
        id: "privacy-ai-chat",
        title: "AI Chat",
        type: "reading",
        xpReward: 25,
        content: `
          <h2>AI Chat Assistants: Convenience vs. Your Prompts 🤖</h2>
          <p>Every message you send to a chatbot can potentially be logged, reviewed, or used to improve the underlying model - unless the provider explicitly says otherwise. If you use AI assistants regularly, it's worth knowing what happens to what you type.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/lumo.svg",
              name: "Lumo",
              tagline: "Proton's privacy-focused AI chat assistant, built to answer questions without building an advertising profile on you.",
              privacy: [
                "Conversations are not used to train models and are encrypted",
                "No conversation logs kept tied to your identity for ad-targeting purposes",
              ],
              drawbacks: [
                "Newer and less battle-tested than mainstream assistants, so answer quality can lag on some tasks",
                "Still requires trusting Proton's infrastructure and the underlying models it relies on",
              ],
              link: "https://lumo.proton.me/",
            }),
          ])}
        `
      },
      {
        id: "privacy-mobile-apps",
        title: "Mobile Apps",
        type: "reading",
        xpReward: 40,
        content: `
          <h2>Mobile Apps Worth Switching To 📱</h2>
          <p>Official apps from big platforms usually come bundled with analytics SDKs, ads, and sometimes a mandatory account. These open-source alternatives cover some of the most commonly used app categories with a much lighter footprint.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/newpipe.svg",
              name: "NewPipe",
              tagline: "A lightweight YouTube (and PeerTube/SoundCloud) client for Android that doesn't need a Google account or the YouTube API.",
              privacy: [
                "No Google account, no ads, no tracking - it talks directly to YouTube's public pages instead of Google's tracking APIs",
                "Built-in SponsorBlock support to skip sponsor segments automatically",
              ],
              drawbacks: [
                "Not distributed on the Google Play Store due to Google's policies - install from F-Droid/GitHub instead",
                "YouTube changes occasionally break it until the app is updated",
              ],
              link: "https://newpipe.net/",
            }),
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/xtra.svg",
              name: "Xtra",
              tagline: "An open-source, ad-free Twitch client for Android for watching streams, VODs and clips.",
              privacy: [
                "No ads or analytics SDKs bundled in",
                "Fully open source, so the whole app can be audited",
              ],
              drawbacks: [
                "Not on the Play Store, sideloading from GitHub is required",
                "Being unofficial, it can break temporarily when Twitch changes its API",
              ],
              link: "https://github.com/crackededed/Xtra",
            }),
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/binaryeye.svg",
              name: "BinaryEye",
              tagline: "An open-source QR-code and barcode scanner for Android.",
              privacy: [
                "Scans are processed entirely on-device - nothing is sent to a server",
                "Doesn't request internet permission just to scan a code",
              ],
              drawbacks: [
                "Android only",
                "Interface is basic and functional rather than polished",
              ],
              link: "https://github.com/markusfisch/BinaryEye",
            }),
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/oss-document-scanner.svg",
              name: "OSS Document Scanner",
              tagline: "An open-source document scanning app that turns your camera into a scanner and exports clean PDFs.",
              privacy: [
                "Processes and stores scans locally on your device by default",
                "No account and no cloud upload required to use it",
              ],
              drawbacks: [
                "Fewer advanced OCR/auto-organization features than proprietary apps like Adobe Scan",
                "Smaller community and update cadence than mainstream alternatives",
              ],
              link: "https://f-droid.org/packages/",
            }),
          ])}
        `
      },
      {
        id: "privacy-cli-tools",
        title: "Command-Line Tools",
        type: "reading",
        xpReward: 35,
        content: `
          <h2>Command-Line Tools: Do It Locally 💻</h2>
          <p>For downloading media or converting files, it's tempting to paste a link into a random "free online converter" website - which then sees, and can log, exactly what you're processing. These two command-line tools do the same job entirely on your own machine.</p>

          ${appGrid([
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/yt-dlp.svg",
              name: "yt-dlp",
              tagline: "A command-line tool to download video/audio from YouTube and thousands of other sites - an actively maintained fork of youtube-dl.",
              privacy: [
                'Downloads happen directly from your machine - no need to paste links into a random "online downloader" site that logs what you watch',
                "Fully open source, no telemetry",
              ],
              drawbacks: [
                "Command-line only by default (GUIs exist as separate wrapper projects)",
                "Extraction logic can break when a site changes and needs an update - always check your local jurisdiction/ToS before downloading content",
              ],
              link: "https://github.com/yt-dlp/yt-dlp",
            }),
            appCard({
              logo: "src/data/assets/privacy-recommendation/logos/ffmpeg.svg",
              name: "FFmpeg",
              tagline: "The Swiss-army knife for encoding, decoding, and converting audio/video, used under the hood by countless other apps.",
              privacy: [
                "Strip metadata (GPS location, device info, timestamps) from photos/videos locally before sharing them, instead of uploading to an online converter that keeps a copy",
                "Runs fully offline - nothing leaves your machine",
              ],
              drawbacks: [
                "Steep learning curve - entirely command-line driven with a huge number of flags",
                "No official GUI (third-party front-ends like HandBrake or Shutter Encoder exist)",
              ],
              link: "https://ffmpeg.org/",
            }),
          ])}
        `
      },
      {
        id: "privacy-recap-quiz",
        title: "Privacy Recap",
        type: "exercise",
        xpReward: 40,
        content: `
          <h2>Privacy Recap 📝</h2>
          <p>Let's check what stuck. Pick the best answer for each question.</p>
        `,
        quiz: [
          {
            question: "What do most of the recommendations in this topic have in common?",
            choices: [
              "They're all made by the same company",
              "They favor open source software, audited no-logs policies, and end-to-end encryption",
              "They are all completely free with no drawbacks",
              "They require a Google account to work",
            ],
            correct: 1,
            explanation: "The selection criteria favor open source, independently audited no-logs policies, and end-to-end encryption wherever possible - not a single vendor or price point.",
          },
          {
            question: "Why is a password manager recommended over reusing passwords?",
            choices: [
              "It looks more professional",
              "A single leaked password can't be reused to break into your other accounts",
              "It automatically enables 2FA everywhere",
              "It replaces the need for email entirely",
            ],
            correct: 1,
            explanation: "Unique passwords per account mean a breach on one site doesn't cascade into every other account you own.",
          },
          {
            question: "What's a key privacy advantage of running yt-dlp or FFmpeg locally instead of using an online converter website?",
            choices: [
              "They are always faster than any website",
              "The files you process never have to leave your own machine",
              "They automatically remove viruses",
              "They require a Proton account",
            ],
            correct: 1,
            explanation: "Running these tools locally means no third-party website ever sees or logs the files you're downloading or converting.",
          },
          {
            question: "Why does Tor Browser feel slower than a regular browser?",
            choices: [
              "It's built on an outdated version of Firefox",
              "Traffic is routed through multiple relays for anonymity, which adds latency",
              "It scans every page for ads before loading it",
              "It uses more RAM than other browsers",
            ],
            correct: 1,
            explanation: "Tor routes your connection through 3 relays to protect your anonymity, and that extra hopping adds latency compared to a direct connection.",
          },
          {
            question: "What is one honest drawback mentioned about Mullvad VPN?",
            choices: [
              "It logs all of your traffic",
              "It has no free tier and a minimal feature set",
              "It requires your real name to sign up",
              "It only works inside Sweden",
            ],
            correct: 1,
            explanation: "Mullvad trades a free tier and flashy features for extreme account anonymity (no email required) and a strict no-logs policy.",
          },
        ],
      },
    ]
  });
})();