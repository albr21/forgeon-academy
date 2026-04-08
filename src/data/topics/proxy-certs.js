window.TOPICS = window.TOPICS || [];
window.TOPICS.push({
  id: "proxy-certs",
  title: "Proxies & Certificates",
  description: "Understand how network proxies work, the role of SSL/TLS certificates, and how they secure internet communications.",
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
        <p>The basic flow looks like this:</p>
        <pre><code>Client → Proxy Server → Destination Server
Client ← Proxy Server ← Destination Server</code></pre>
        <p>Instead of connecting directly to a website, your traffic first passes through the proxy, which can inspect, modify, cache, or filter the traffic.</p>

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
        <p>A forward proxy sits in front of <strong>clients</strong> and forwards requests to the internet on their behalf. This is the most common type of proxy.</p>
        <pre><code>[Client A] ──┐
[Client B] ──┤──→ [Forward Proxy] ──→ [Internet]
[Client C] ──┘</code></pre>
        <p><strong>Use cases:</strong> Corporate networks, school networks, bypassing geo-restrictions.</p>

        <h3>2. Reverse Proxy</h3>
        <p>A reverse proxy sits in front of <strong>servers</strong> and handles incoming requests from the internet. Clients don't know they're talking to a proxy.</p>
        <pre><code>[Internet] ──→ [Reverse Proxy] ──┬──→ [Server A]
                                 ├──→ [Server B]
                                 └──→ [Server C]</code></pre>
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
        <pre><code>1. Client Hello    → Client sends supported cipher suites & TLS version
2. Server Hello    → Server picks cipher suite, sends its certificate
3. Key Exchange    → Both parties derive shared encryption keys
4. Finished        → Encrypted communication begins</code></pre>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Symmetric Encryption</strong> - Same key encrypts and decrypts (fast, used for data transfer). Example: AES-256.</li>
          <li><strong>Asymmetric Encryption</strong> - Public/private key pair (slower, used during handshake). Example: RSA, ECDSA.</li>
          <li><strong>Perfect Forward Secrecy (PFS)</strong> - Even if the server's private key is compromised, past sessions can't be decrypted. Uses ephemeral keys (ECDHE).</li>
        </ul>

        <h3>SSL vs TLS Versions</h3>
        <pre><code>SSL 2.0 (1995) - Deprecated ❌
SSL 3.0 (1996) - Deprecated ❌ (POODLE attack)
TLS 1.0 (1999) - Deprecated ❌
TLS 1.1 (2006) - Deprecated ❌
TLS 1.2 (2008) - Still widely used ✅
TLS 1.3 (2018) - Current standard ✅ (faster, more secure)</code></pre>

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
        <pre><code>Root CA Certificate (self-signed, pre-installed in OS/browser)
  └── Intermediate CA Certificate (signed by Root CA)
        └── Server Certificate (signed by Intermediate CA)
              └── Your website: www.example.com</code></pre>
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
          <p>A self-signed certificate is not signed by any trusted CA. Browsers will show a security warning. They're fine for development but should never be used in production.</p>
        </div>
      `
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
import hashlib

class Certificate:
    def __init__(self, subject, issuer, is_ca=False, is_root=False):
        self.subject = subject
        self.issuer = issuer
        self.is_ca = is_ca
        self.is_root = is_root
        # Simplified: in reality, this would be a cryptographic signature
        self.fingerprint = hashlib.md5(
            f"{subject}:{issuer}".encode()
        ).hexdigest()[:16]

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
    }
  ]
});
