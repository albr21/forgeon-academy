window.TOPICS = window.TOPICS || [];
window.TOPICS.push({
  id: "proxy-certs",
  title: "Proxies & Certificates",
  description: "Understand how network proxies work, the role of SSL/TLS certificates, and how to configure common developer tools to work behind a corporate proxy.",
  icon: "🔐",
  difficulty: "Intermediate",
  lessons: [
    {
      id: "proxy-what-is",
      title: "What is a Proxy?",
      type: "reading",
      xpReward: 30,
      content: `
        <h2>What is a Proxy Server?</h2>
        <p>A <strong>proxy server</strong> is an intermediary server that sits between a client (like your web browser) and the destination server. When you send a request through a proxy, the request goes to the proxy first, which then forwards it to the destination.</p>

        <h3>How Does It Work?</h3>
        <p>Instead of connecting directly to a website, your traffic first passes through the proxy, which can inspect, modify, cache, or filter it:</p>

        <figure class="diagram-figure">
          <img src="src/data/assets/proxy-certs/diagrams/svg/proxy-basic-flow.svg" alt="Sequence diagram showing a client sending a request to a proxy server, the proxy forwarding it to the destination server, and the response following the same path back" />
          <figcaption>A request and its response both travel through the proxy</figcaption>
        </figure>

        <h3>Why Use a Proxy?</h3>
        <ul>
          <li><strong>Privacy</strong> - Your real IP address is hidden from the destination server</li>
          <li><strong>Security</strong> - Proxies can filter malicious content and enforce security policies</li>
          <li><strong>Performance</strong> - Caching proxies store frequently requested resources to speed up access</li>
          <li><strong>Access Control</strong> - Organizations use proxies to restrict which websites employees can visit</li>
          <li><strong>Monitoring</strong> - Network administrators can log and analyze traffic passing through the proxy</li>
        </ul>

        <h3>Real-World Analogy</h3>
        <p>Think of a proxy like a receptionist in an office building. Instead of visitors going directly to any office, they first go through the receptionist who can:</p>
        <ul>
          <li>Verify if the visitor is allowed in (authentication)</li>
          <li>Direct them to the right place (routing)</li>
          <li>Keep a log of who visited (logging)</li>
          <li>Turn away unwanted visitors (filtering)</li>
        </ul>

        <div class="info-box">
          <div class="info-title">💡 Good to know</div>
          <p>Most corporate networks route all outgoing traffic through a proxy. This is transparent for browsing, but it can break command-line tools (git, package managers, ...) that don't automatically pick up your system's proxy settings - more on that later in this topic.</p>
        </div>
      `
    },
    {
      id: "proxy-types",
      title: "Types of Proxies",
      type: "reading",
      xpReward: 35,
      content: `
        <h2>Types of Proxy Servers</h2>
        <p>Not all proxies are created equal. Let's explore the main types you'll encounter.</p>

        <h3>1. Forward Proxy</h3>
        <p>A forward proxy sits in front of <strong>clients</strong> and forwards requests to the internet on their behalf. This is the most common type of proxy, and the one you'll configure on your own machine in a corporate environment.</p>

        <figure class="diagram-figure">
          <img src="src/data/assets/proxy-certs/diagrams/svg/proxy-forward.svg" alt="Diagram showing several clients connecting to a forward proxy, which connects them to the internet" />
          <figcaption>Several clients sharing a single forward proxy to reach the internet</figcaption>
        </figure>

        <p><strong>Use cases:</strong> Corporate networks, school networks, bypassing geo-restrictions.</p>

        <h3>2. Reverse Proxy</h3>
        <p>A reverse proxy sits in front of <strong>servers</strong> and handles incoming requests from the internet. Clients don't know they're talking to a proxy.</p>

        <figure class="diagram-figure">
          <img src="src/data/assets/proxy-certs/diagrams/svg/proxy-reverse.svg" alt="Diagram showing the internet connecting to a reverse proxy, which dispatches requests to several backend servers" />
          <figcaption>A reverse proxy dispatching incoming traffic to several backend servers</figcaption>
        </figure>

        <p><strong>Use cases:</strong> Load balancing, SSL termination, DDoS protection. Popular tools: <code>Nginx</code>, <code>HAProxy</code>, <code>Cloudflare</code>.</p>

        <h3>3. Transparent Proxy</h3>
        <p>A transparent proxy intercepts traffic without the client knowing. The client doesn't need any special configuration.</p>
        <p><strong>Use cases:</strong> ISP caching, content filtering in public networks, parental controls.</p>

        <h3>4. SOCKS Proxy</h3>
        <p>A SOCKS proxy operates at a lower level (Layer 5 of the OSI model) and can handle any type of traffic - not just HTTP. <code>SOCKS5</code> also supports authentication and UDP.</p>
        <p><strong>Use cases:</strong> Torrenting, gaming, general-purpose proxying.</p>

        <h3>5. HTTP/HTTPS Proxy</h3>
        <p>These proxies specifically handle web traffic. An HTTPS proxy can perform <strong>SSL/TLS interception</strong> (also called "MITM proxy") to decrypt and inspect encrypted traffic.</p>

        <div class="warning-box">
          <div class="warning-title">⚠️ Security Note</div>
          <p>SSL-intercepting proxies break the end-to-end encryption model. They require installing a custom root certificate on client devices. This is common in corporate environments but raises privacy concerns.</p>
        </div>
      `
    },
    {
      id: "proxy-ssl-tls",
      title: "Understanding SSL/TLS",
      type: "reading",
      xpReward: 35,
      content: `
        <h2>SSL/TLS: Securing Internet Communications</h2>
        <p><strong>SSL</strong> (Secure Sockets Layer) and its successor <strong>TLS</strong> (Transport Layer Security) are cryptographic protocols that provide secure communication over a network. When you see the padlock icon 🔒 in your browser, TLS is at work.</p>

        <h3>The TLS Handshake</h3>
        <p>Before encrypted communication begins, the client and server perform a "handshake" to agree on encryption parameters:</p>

        <figure class="diagram-figure">
          <img src="src/data/assets/proxy-certs/diagrams/svg/tls-handshake.svg" alt="Sequence diagram of the TLS handshake: Client Hello, Server Hello with certificate, key exchange, then Finished on both sides before encrypted communication begins" />
          <figcaption>The TLS handshake, from Client Hello to encrypted communication</figcaption>
        </figure>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Symmetric Encryption</strong> - Same key encrypts and decrypts (fast, used for data transfer). Example: AES-256.</li>
          <li><strong>Asymmetric Encryption</strong> - Public/private key pair (slower, used during handshake). Example: RSA, ECDSA.</li>
          <li><strong>Perfect Forward Secrecy (PFS)</strong> - Even if the server's private key is compromised, past sessions can't be decrypted. Uses ephemeral keys (ECDHE).</li>
        </ul>

        <h3>SSL vs TLS Versions</h3>
        <table>
          <thead>
            <tr><th>Version</th><th>Year</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>SSL 2.0</td><td>1995</td><td>❌ Deprecated</td></tr>
            <tr><td>SSL 3.0</td><td>1996</td><td>❌ Deprecated (POODLE attack)</td></tr>
            <tr><td>TLS 1.0</td><td>1999</td><td>❌ Deprecated</td></tr>
            <tr><td>TLS 1.1</td><td>2006</td><td>❌ Deprecated</td></tr>
            <tr><td>TLS 1.2</td><td>2008</td><td>✅ Still widely used</td></tr>
            <tr><td>TLS 1.3</td><td>2018</td><td>✅ Current standard</td></tr>
          </tbody>
        </table>

        <div class="info-box">
          <div class="info-title">💡 Fun Fact</div>
          <p>TLS 1.3 reduced the handshake from 2 round-trips to just 1, significantly improving connection speed. It also removed support for older, insecure cipher suites.</p>
        </div>
      `
    },
    {
      id: "proxy-certificates",
      title: "Certificates Explained",
      type: "reading",
      xpReward: 35,
      content: `
        <h2>Digital Certificates</h2>
        <p>A <strong>digital certificate</strong> (X.509 certificate) is an electronic document that proves the ownership of a public key. It's like a digital passport for websites.</p>

        <h3>What's Inside a Certificate?</h3>
        <ul>
          <li><strong>Subject</strong> - The entity the certificate belongs to (e.g., <code>www.example.com</code>)</li>
          <li><strong>Issuer</strong> - The Certificate Authority (CA) that signed it</li>
          <li><strong>Public Key</strong> - The subject's public key</li>
          <li><strong>Validity Period</strong> - Start and expiration dates</li>
          <li><strong>Serial Number</strong> - Unique identifier</li>
          <li><strong>Signature</strong> - The CA's digital signature proving authenticity</li>
        </ul>

        <h3>Certificate Chain of Trust</h3>

        <figure class="diagram-figure">
          <img src="src/data/assets/proxy-certs/diagrams/svg/certificate-chain.svg" alt="Diagram showing a root CA certificate signing an intermediate CA certificate, which signs a server certificate issued to a website" />
          <figcaption>Root CA &rarr; Intermediate CA &rarr; Server certificate</figcaption>
        </figure>

        <p>Your browser trusts a certificate if it can build a chain back to a trusted Root CA. Operating systems and browsers come with a pre-installed set of trusted Root CA certificates.</p>

        <h3>Certificate Authorities (CAs)</h3>
        <p>Major trusted CAs include:</p>
        <ul>
          <li><strong>Let's Encrypt</strong> - Free, automated certificates (most popular)</li>
          <li><strong>DigiCert</strong> - Enterprise-grade certificates</li>
          <li><strong>Sectigo (Comodo)</strong> - Wide range of certificate products</li>
          <li><strong>GlobalSign</strong> - Enterprise and IoT certificates</li>
        </ul>

        <div class="warning-box">
          <div class="warning-title">⚠️ Self-Signed Certificates</div>
          <p>A self-signed certificate is not signed by any trusted CA. Browsers will show a security warning. They're fine for development but should never be used in production. A corporate SSL-intercepting proxy (see the previous lesson) also relies on a self-signed-style root certificate, which must be installed and trusted on every device that goes through it.</p>
        </div>
      `
    },
    {
      id: "proxy-quiz",
      title: "Quick Check",
      type: "exercise",
      xpReward: 40,
      content: `
        <h2>Quick Knowledge Check 📝</h2>
        <p>Let's make sure the core proxy and SSL/TLS concepts are clear. Select the correct answer for each question.</p>
      `,
      quiz: [
        {
          question: "What is the main difference between a forward proxy and a reverse proxy?",
          choices: [
            "A forward proxy sits in front of clients, a reverse proxy sits in front of servers",
            "A forward proxy only works with HTTPS, a reverse proxy only works with HTTP",
            "There is no difference, they are interchangeable terms",
            "A reverse proxy is only used for caching, never for load balancing"
          ],
          correct: 0,
          explanation: "A forward proxy forwards client requests to the internet on their behalf, while a reverse proxy sits in front of servers and dispatches incoming requests to them."
        },
        {
          question: "What does an SSL-intercepting (MITM) proxy require to work without browser warnings?",
          choices: [
            "Nothing, it works transparently with no configuration",
            "A custom root certificate installed and trusted on the client device",
            "A SOCKS5-only network configuration",
            "Disabling TLS entirely on the client"
          ],
          correct: 1,
          explanation: "SSL-intercepting proxies decrypt and re-encrypt traffic, so a custom root CA certificate must be installed and trusted on client devices to avoid certificate warnings."
        },
        {
          question: "During the TLS handshake, what is the purpose of asymmetric encryption?",
          choices: [
            "It encrypts all the data transferred during the entire session",
            "It's used to securely establish a shared key during the handshake, before switching to faster symmetric encryption",
            "It replaces the need for a certificate entirely",
            "It's only used by SOCKS proxies, not by TLS"
          ],
          correct: 1,
          explanation: "Asymmetric encryption (public/private key pairs) is used during the handshake to agree on parameters, then the faster symmetric encryption handles the actual data transfer."
        },
        {
          question: "What does a browser check to decide whether to trust a server certificate?",
          choices: [
            "Whether the certificate's expiration date is in the past",
            "Whether the certificate chain can be traced back to a trusted Root CA",
            "Whether the certificate is longer than 2048 bits",
            "Whether the server uses HTTP instead of HTTPS"
          ],
          correct: 1,
          explanation: "The browser walks up the certificate chain (server certificate, then intermediates) until it reaches a Root CA. If that root is in the trusted store, the certificate is trusted."
        },
        {
          question: "Which error message typically indicates a certificate trust problem rather than a proxy connectivity problem?",
          choices: [
            "Connection timed out",
            "x509: certificate signed by unknown authority",
            "Unable to resolve host",
            "Connection refused"
          ],
          correct: 1,
          explanation: "An 'unknown authority' error means the certificate's issuer isn't trusted - typically because the organization's root CA hasn't been installed - rather than a network reachability issue."
        }
      ]
    },
    {
      id: "proxy-hands-on",
      title: "Proxy Configuration Demo",
      type: "sandbox",
      xpReward: 50,
      content: `
        <h2>Hands-On: Understanding Proxy Headers</h2>
        <p>In this sandbox, we'll simulate how a proxy server modifies HTTP headers. When a request passes through a proxy, several headers are typically added or modified.</p>

        <h3>Common Proxy Headers</h3>
        <ul>
          <li><code>X-Forwarded-For</code> - Original client IP address</li>
          <li><code>X-Forwarded-Proto</code> - Original protocol (http/https)</li>
          <li><code>X-Forwarded-Host</code> - Original host requested</li>
          <li><code>Via</code> - Intermediate proxies in the chain</li>
        </ul>
        <p>Run the code below to see how a proxy processes and enriches HTTP request headers:</p>
      `,
      code: {
        language: "python",
        starterCode: `# Simulating Proxy Header Processing

class HTTPRequest:
    def __init__(self, method, url, headers=None):
        self.method = method
        self.url = url
        self.headers = headers or {}

    def __str__(self):
        lines = [f"{self.method} {self.url}"]
        for key, value in self.headers.items():
            lines.append(f"  {key}: {value}")
        return "\\n".join(lines)


class ProxyServer:
    def __init__(self, proxy_name, proxy_ip):
        self.proxy_name = proxy_name
        self.proxy_ip = proxy_ip

    def forward_request(self, request, client_ip):
        """Simulate how a proxy modifies request headers."""
        print(f"[{self.proxy_name}] Received request from {client_ip}")
        print(f"[{self.proxy_name}] Original request:")
        print(f"  {request}")
        print()

        # Add/modify proxy headers
        modified = HTTPRequest(request.method, request.url, dict(request.headers))

        # X-Forwarded-For: append client IP
        existing_xff = modified.headers.get("X-Forwarded-For", "")
        if existing_xff:
            modified.headers["X-Forwarded-For"] = f"{existing_xff}, {client_ip}"
        else:
            modified.headers["X-Forwarded-For"] = client_ip

        # X-Forwarded-Proto
        if "X-Forwarded-Proto" not in modified.headers:
            proto = "https" if request.url.startswith("https") else "http"
            modified.headers["X-Forwarded-Proto"] = proto

        # Via header
        existing_via = modified.headers.get("Via", "")
        via_entry = f"1.1 {self.proxy_name}"
        if existing_via:
            modified.headers["Via"] = f"{existing_via}, {via_entry}"
        else:
            modified.headers["Via"] = via_entry

        print(f"[{self.proxy_name}] Forwarded request:")
        print(f"  {modified}")
        print()
        return modified


# === Simulation ===
print("=" * 50)
print("  Proxy Header Processing Simulation")
print("=" * 50)
print()

# Create a client request
client_request = HTTPRequest(
    method="GET",
    url="https://api.example.com/data",
    headers={
        "Host": "api.example.com",
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }
)

# Pass through two proxy servers (common in enterprise networks)
proxy1 = ProxyServer("edge-proxy-01", "10.0.1.1")
proxy2 = ProxyServer("internal-proxy-02", "10.0.2.1")

# Client (192.168.1.100) → Proxy 1 → Proxy 2 → Server
print("--- Client sends request ---")
req = proxy1.forward_request(client_request, "192.168.1.100")
print("--- Forwarding through second proxy ---")
req = proxy2.forward_request(req, "10.0.1.1")
print("--- Final request reaching the server ---")
print(f"Final headers:")
print(f"  {req}")
`
      }
    },
    {
      id: "proxy-cert-verify",
      title: "Certificate Chain Verification",
      type: "sandbox",
      xpReward: 60,
      content: `
        <h2>Certificate Chain Verification 🔗</h2>
        <p>In this exercise, we'll simulate how a browser verifies a certificate chain. The verification process walks up the chain from the server certificate to the root CA, checking signatures at each step.</p>

        <p>Run the code to see the verification process in action:</p>
      `,
      code: {
        language: "python",
        starterCode: `# Certificate Chain Verification Simulation

def simple_fingerprint(text):
    """Tiny stand-in for a cryptographic hash"""
    digest = 0
    for char in text:
        digest = (digest * 31 + ord(char)) & 0xFFFFFFFFFFFFFFFF
    return format(digest, "016x")


class Certificate:
    def __init__(self, subject, issuer, is_ca=False, is_root=False):
        self.subject = subject
        self.issuer = issuer
        self.is_ca = is_ca
        self.is_root = is_root
        # Simplified: in reality, this would be a cryptographic signature
        self.fingerprint = simple_fingerprint(f"{subject}:{issuer}")

    def __str__(self):
        cert_type = "ROOT CA" if self.is_root else ("CA" if self.is_ca else "Server")
        return f"[{cert_type}] Subject: {self.subject}, Issuer: {self.issuer}"


def verify_chain(server_cert, cert_store, trusted_roots):
    """
    Verify a certificate chain.
    Returns (is_valid, chain, errors)
    """
    chain = [server_cert]
    errors = []
    current = server_cert

    print("🔍 Starting certificate chain verification...")
    print(f"   Server certificate: {current.subject}")
    print(f"   Issued by: {current.issuer}")
    print()

    # Walk up the chain
    step = 1
    while not current.is_root:
        issuer_name = current.issuer
        print(f"   Step {step}: Looking for issuer '{issuer_name}'...")

        # Find the issuer certificate
        issuer_cert = cert_store.get(issuer_name)
        if not issuer_cert:
            errors.append(f"Cannot find certificate for '{issuer_name}'")
            print(f"   ❌ Issuer certificate NOT FOUND!")
            break

        if not issuer_cert.is_ca:
            errors.append(f"'{issuer_name}' is not a CA certificate")
            print(f"   ❌ '{issuer_name}' is not a CA!")
            break

        print(f"   ✅ Found: {issuer_cert}")
        chain.append(issuer_cert)
        current = issuer_cert
        step += 1

    # Check if root is trusted
    if current.is_root:
        if current.subject in trusted_roots:
            print(f"\\n   Step {step}: Checking trust store...")
            print(f"   ✅ Root CA '{current.subject}' is TRUSTED")
        else:
            errors.append(f"Root CA '{current.subject}' is NOT in trust store")
            print(f"\\n   ❌ Root CA '{current.subject}' is NOT TRUSTED")

    return len(errors) == 0, chain, errors


# === Setup ===
print("=" * 55)
print("   Certificate Chain Verification Demo")
print("=" * 55)
print()

# Define certificates
root_ca = Certificate("GlobalTrust Root CA", "GlobalTrust Root CA", is_ca=True, is_root=True)
intermediate_ca = Certificate("GlobalTrust Intermediate G2", "GlobalTrust Root CA", is_ca=True)
server_cert = Certificate("www.example.com", "GlobalTrust Intermediate G2")

# Certificate store (simulates OS/browser cert store)
cert_store = {
    "GlobalTrust Root CA": root_ca,
    "GlobalTrust Intermediate G2": intermediate_ca,
}

# Trusted roots (pre-installed in OS)
trusted_roots = {"GlobalTrust Root CA"}

# === Test 1: Valid chain ===
print("📋 Test 1: Valid certificate chain")
print("-" * 40)
is_valid, chain, errors = verify_chain(server_cert, cert_store, trusted_roots)
print(f"\\n{'✅ VALID' if is_valid else '❌ INVALID'} - Chain length: {len(chain)}")
print()

# === Test 2: Unknown issuer ===
print("\\n📋 Test 2: Certificate with unknown issuer")
print("-" * 40)
bad_cert = Certificate("malicious-site.com", "Fake CA Authority")
is_valid, chain, errors = verify_chain(bad_cert, cert_store, trusted_roots)
print(f"\\n{'✅ VALID' if is_valid else '❌ INVALID'} - Errors: {errors}")
print()

# === Test 3: Untrusted root ===
print("\\n📋 Test 3: Untrusted root CA")
print("-" * 40)
untrusted_root = Certificate("ShadyCA Root", "ShadyCA Root", is_ca=True, is_root=True)
shady_cert = Certificate("suspicious.com", "ShadyCA Root")
cert_store["ShadyCA Root"] = untrusted_root
is_valid, chain, errors = verify_chain(shady_cert, cert_store, trusted_roots)
print(f"\\n{'✅ VALID' if is_valid else '❌ INVALID'} - Errors: {errors}")
`
      }
    },
    {
      id: "proxy-when-to-configure",
      title: "When Do You Need to Configure Something?",
      type: "reading",
      xpReward: 25,
      content: `
        <h2>Recognizing a Proxy or Certificate Issue</h2>
        <p>In a corporate environment, most outgoing traffic is routed through a proxy, and internal or intercepted traffic is signed with an internal Certificate Authority. Some tools pick this up automatically from the operating system, others need to be configured one by one.</p>

        <h3>Signs You Need to Configure a Proxy</h3>
        <ul>
          <li>You're unable to access the internet from a specific tool</li>
          <li>You encounter network connection errors or timeouts</li>
          <li>You're unable to download packages, dependencies, or updates</li>
          <li>You get an error saying a secure connection could not be established</li>
        </ul>

        <h3>Signs You Need to Configure Certificates</h3>
        <p>The most common symptom is an error message indicating that a secure connection could not be established, or that a certificate is not trusted. This can happen when browsing, downloading software, or calling an API. Typical error messages include:</p>
        <pre><code>x509: certificate signed by unknown authority
x509: certificate signed by unknown authority (possibly because of
  "x509: invalid signature: parent certificate cannot sign this kind of certificate"
  while trying to verify candidate authority certificate "my-ca")</code></pre>

        <div class="info-box">
          <div class="info-title">💡 Good to know</div>
          <p>Most of the time, installing your organization's root CA certificate once is enough. Only a few tools need their own separate certificate configuration - the next lessons cover them one by one.</p>
        </div>

        <h3>Getting Your Organization's Certificate</h3>
        <p>Your IT or security team usually provides the root CA certificate directly, but you can also export it yourself from a machine that already trusts it:</p>
        <ul>
          <li><strong>From Windows Certificate Manager:</strong> <code>Win + R</code> &rarr; <code>certmgr.msc</code> &rarr; select the certificate &rarr; right-click &rarr; <code>All Tasks &gt; Export</code> &rarr; choose <code>Base-64 encoded X.509 (.CER)</code> &rarr; save it</li>
          <li><strong>From Chrome:</strong> <code>Settings &gt; Privacy and security &gt; Security &gt; Manage certificates</code> &rarr; select the certificate &rarr; <code>Export</code> &rarr; choose <code>Base-64 encoded X.509 (.CER)</code> &rarr; save it</li>
        </ul>
      `
    },
    {
      id: "proxy-config-os",
      title: "Configuring the Operating System",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">Operating System (Linux) <img class="tool-logo" src="src/data/assets/proxy-certs/logos/ubuntu.svg" alt="Ubuntu logo" /></h2>
        <p>Many command-line tools read the proxy from environment variables. On Linux, they can be set system-wide:</p>
        <pre><code>sudo nano /etc/environment</code></pre>
        <pre><code>http_proxy="http://&lt;proxy_host&gt;:&lt;proxy_port&gt;"
https_proxy="http://&lt;proxy_host&gt;:&lt;proxy_port&gt;"
ftp_proxy="http://&lt;proxy_host&gt;:&lt;proxy_port&gt;"
no_proxy="localhost,127.0.0.1"</code></pre>
        <pre><code>source /etc/environment</code></pre>
        <ul>
          <li>You can also add these lines to your <code>~/.bashrc</code> (or equivalent) for a per-user configuration</li>
          <li>Certificates are configured once for the whole system - see below</li>
        </ul>

        <div class="warning-box">
          <div class="warning-title">⚠️ Only while on the corporate network</div>
          <p>A hardcoded proxy configuration will break your network connection once you're off the corporate network (home, mobile hotspot, ...). Remove or comment out these lines when you're not behind the proxy, or use a small script/alias to toggle them.</p>
        </div>

        <h3>Installing a Certificate on the System (Debian / Ubuntu)</h3>
        <pre><code>sudo apt-get install -y ca-certificates
sudo cp your-org-ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates</code></pre>
        <p>Tools that rely on the system trust store (like <code>apt-get</code>, most CLIs, and many programming languages) will pick this certificate up automatically afterwards.</p>
      `
    },
    {
      id: "proxy-config-apt-get",
      title: "Configuring apt-get",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">apt-get (Debian / Ubuntu) <img class="tool-logo" src="src/data/assets/proxy-certs/logos/apt-get.jpg" alt="apt-get logo" /></h2>
        <p><code>apt-get</code> does not read the system's proxy environment variables, so it needs its own configuration:</p>
        <pre><code>sudo nano /etc/apt/apt.conf.d/10proxy</code></pre>
        <pre><code>Acquire::http::Proxy "http://&lt;proxy_host&gt;:&lt;proxy_port&gt;";
Acquire::https::Proxy "http://&lt;proxy_host&gt;:&lt;proxy_port&gt;";</code></pre>
        <p><code>apt-get</code> does share the certificate trust store with the system, so no extra certificate configuration is needed - see the previous lesson for installing a certificate on the system.</p>
      `
    },
    {
      id: "proxy-config-dnf",
      title: "Configuring DNF",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">DNF (Fedora / RHEL) <img class="tool-logo" src="src/data/assets/proxy-certs/logos/dnf.png" alt="DNF logo" /></h2>
        <p><code>dnf</code> does not share the proxy or certificate configuration with the system, so both need an explicit configuration:</p>
        <pre><code>sudo nano /etc/dnf/dnf.conf</code></pre>
        <pre><code>[main]
proxy=http://&lt;proxy_host&gt;:&lt;proxy_port&gt;
sslcacert=&lt;path_to_certificate&gt;</code></pre>
        <p>The <code>sslcacert</code> line is only needed if repositories are served through a certificate that isn't already trusted by the system.</p>
      `
    },
    {
      id: "proxy-config-python",
      title: "Configuring Python",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">Python <img class="tool-logo" src="src/data/assets/proxy-certs/logos/python.svg" alt="Python logo" /></h2>
        <p>Python (and <code>pip</code>) shares the proxy and certificate configuration with the system. If you need to set it from within a script instead:</p>
        <pre><code>import os
os.environ["http_proxy"] = "http://&lt;proxy_host&gt;:&lt;proxy_port&gt;"
os.environ["https_proxy"] = "http://&lt;proxy_host&gt;:&lt;proxy_port&gt;"</code></pre>
      `
    },
    {
      id: "proxy-config-npm",
      title: "Configuring npm",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">npm <img class="tool-logo" src="src/data/assets/proxy-certs/logos/npm.png" alt="npm logo" /></h2>
        <p><code>npm</code> does not read the system proxy, and needs its own certificate configuration too:</p>
        <pre><code>npm config set proxy http://&lt;proxy_host&gt;:&lt;proxy_port&gt;
npm config set https-proxy http://&lt;proxy_host&gt;:&lt;proxy_port&gt;
npm config set cafile &lt;path_to_certificate&gt;</code></pre>
      `
    },
    {
      id: "proxy-config-ruby-gems",
      title: "Configuring RubyGems",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">RubyGems <img class="tool-logo" src="src/data/assets/proxy-certs/logos/ruby-gems.png" alt="RubyGems logo" /></h2>
        <p>RubyGems shares the proxy configuration with the system, but does not share the certificate trust store - a certificate has to be copied manually into its own certificate directory:</p>
        <pre><code># Locate the RubyGems certificates directory
gem which rubygems
# => .../lib/rubygems.rb -> certs live in .../lib/rubygems/ssl_certs/rubygems.org

# Copy the certificate there (Linux/macOS)
sudo cp your-org-ca.pem .../lib/rubygems/ssl_certs/rubygems.org/your-org-ca.pem</code></pre>
        <div class="warning-box">
          <div class="warning-title">⚠️ PEM format required</div>
          <p>The certificate must be in PEM format. If you only have a <code>.crt</code> file, renaming it to <code>.pem</code> works in most cases. Otherwise, convert it explicitly:</p>
          <pre><code>openssl x509 -in your-org-ca.crt -out your-org-ca.pem -outform PEM</code></pre>
        </div>
      `
    },
    {
      id: "proxy-config-maven",
      title: "Configuring Maven",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">Maven <img class="tool-logo" src="src/data/assets/proxy-certs/logos/maven.svg" alt="Maven logo" /></h2>
        <p>Maven reads its proxy configuration from <code>~/.m2/settings.xml</code>:</p>
        <pre><code>&lt;settings&gt;
  &lt;proxies&gt;
    &lt;proxy&gt;
      &lt;id&gt;corporate-proxy&lt;/id&gt;
      &lt;active&gt;true&lt;/active&gt;
      &lt;protocol&gt;http&lt;/protocol&gt;
      &lt;host&gt;&lt;proxy_host&gt;&lt;/host&gt;
      &lt;port&gt;&lt;proxy_port&gt;&lt;/port&gt;
      &lt;nonProxyHosts&gt;localhost|127.0.0.1&lt;/nonProxyHosts&gt;
    &lt;/proxy&gt;
  &lt;/proxies&gt;
&lt;/settings&gt;</code></pre>
        <p>Maven runs on the JVM, so certificates must be imported into the JVM's own trust store using <code>keytool</code>:</p>
        <pre><code>keytool -import -alias corporate-ca -file your-org-ca.crt \\
  -keystore "$JAVA_HOME/lib/security/cacerts" -storepass changeit</code></pre>
      `
    },
    {
      id: "proxy-config-docker",
      title: "Configuring Docker",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">Docker <img class="tool-logo" src="src/data/assets/proxy-certs/logos/docker.png" alt="Docker logo" /></h2>
        <p>The Docker daemon needs its proxy set through a systemd override, not through environment variables in your shell:</p>
        <pre><code>sudo mkdir -p /etc/systemd/system/docker.service.d
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf</code></pre>
        <pre><code>[Service]
Environment="HTTP_PROXY=http://&lt;proxy_host&gt;:&lt;proxy_port&gt;"
Environment="HTTPS_PROXY=http://&lt;proxy_host&gt;:&lt;proxy_port&gt;"
Environment="NO_PROXY=localhost,127.0.0.1"</code></pre>
        <pre><code>sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl show --property=Environment docker</code></pre>
        <p>Docker shares the certificate trust store with the host machine. Once a certificate is installed at the OS level (see the "Configuring the Operating System" lesson), just restart the daemon:</p>
        <pre><code>sudo systemctl restart docker</code></pre>
      `
    },
    {
      id: "proxy-config-docker-buildx",
      title: "Configuring Docker Buildx",
      type: "reading",
      xpReward: 20,
      content: `
        <h2 class="tool-heading">Docker Buildx <img class="tool-logo" src="src/data/assets/proxy-certs/logos/docker-buildx.png" alt="Docker Buildx logo" /></h2>
        <p>Buildx shares the proxy configuration with Docker (no separate setup needed), but it keeps its own certificate configuration:</p>
        <pre><code># Rootful mode
sudo nano /etc/buildkit/buildkitd.toml

# Rootless mode
nano ~/.config/buildkit/buildkitd.toml</code></pre>
        <pre><code>[registry."registry.example.com"]
  ca = ["/path/to/your-org-ca.cer"]</code></pre>
      `
    }
  ]
});
