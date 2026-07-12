import './App.css';

const codeSend = `import { send } from 'expo-push-easy';

// Expo Push token
await send({
  token: 'ExponentPushToken[xxx]',
  title: 'Hello!',
  body: 'Works everywhere.',
});

// FCM v1 token (auto-detected)
await send({
  token: 'fcm-device-token',
  title: 'Hi Android!',
  body: 'Same function, different transport.',
});`;

const codeInstall = `# Step 1: Install
npm install expo-push-easy

# Step 2: Send a push notification
import { send } from 'expo-push-easy';

await send({
  token: 'ExponentPushToken[xxxxxxxxx]',
  title: 'Hello from expo-push-easy!',
  body: 'This works in any JavaScript runtime.',
});

# Step 3: FCM v1 (optional, no googleapis needed)
import { send } from 'expo-push-easy';

await send({
  token: 'fcm-device-token-here',
  title: 'FCM works too',
  body: 'Zero config, just a service account JSON.',
  fcm: {
    serviceAccount: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  },
});`;

const features = [
  { name: 'send()', desc: 'Universal push: Expo Push & FCM tokens auto-detected.' },
  { name: 'sendBatch()', desc: 'Send thousands of notifications in a single call.' },
  { name: 'sendExpoPush()', desc: 'Direct Expo Push API call when you know the token type.' },
  { name: 'sendFcm()', desc: 'Direct FCM v1 HTTP API call with baked-in auth.' },
  { name: 'Client Helpers', desc: 'registerForPushNotifications & onTokenRefresh for Expo apps.' },
  { name: 'Scheduling', desc: 'Delay or schedule push notifications with ease.' },
  { name: 'Adapters', desc: 'First-class adapters for Convex, Supabase, and Firebase.' },
  { name: 'FCM Auth', desc: 'Auto-generated JWT from service account. No googleapis dependency.' },
];

const compatRows = [
  { runtime: 'Node.js', send: 'Yes', sched: 'Yes', adapters: 'Yes' },
  { runtime: 'Convex', send: 'Yes', sched: 'Yes', adapters: 'Yes' },
  { runtime: 'Cloudflare Workers', send: 'Yes', sched: '-', adapters: '-' },
  { runtime: 'Bun', send: 'Yes', sched: 'Yes', adapters: 'Yes' },
  { runtime: 'Deno', send: 'Yes', sched: 'Yes', adapters: 'Yes' },
];

const headers = ['Runtime', 'send()', 'Scheduling', 'Adapters'];

const comparisonHeaders = ['', 'expo-push-easy', 'expo-server-sdk', 'firebase-admin'];
const comparisonRows = [
  { feature: 'Expo Push', a: 'Yes', b: 'Yes', c: 'No' },
  { feature: 'FCM v1', a: 'Yes', b: 'No', c: 'Yes' },
  { feature: 'Edge runtime', a: 'Yes', b: 'No', c: 'No' },
  { feature: 'Token auto-detect', a: 'Yes', b: 'No', c: 'No' },
  { feature: 'Batch send', a: 'Yes', b: 'Yes', c: 'Yes' },
  { feature: 'Scheduling', a: 'Yes', b: 'No', c: 'No' },
];

function App() {
  return (
    <main className="app" role="main">
      <Hero />
      <WhySection />
      <QuickStart />
      <FeaturesGrid />
      <CompatibilityTable />
      <ComparisonTable />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <header className="hero" aria-label="Hero banner">
      <nav className="nav" aria-label="Main navigation">
        <span className="logo" aria-hidden="true">expo-push-easy</span>
        <div className="nav-links">
          <a href="https://github.com/yohanbcn/expo-push-easy" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.npmjs.com/package/expo-push-easy" target="_blank" rel="noopener noreferrer">npm</a>
        </div>
      </nav>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-badge" aria-label="Version 2.0.0">v2.0.0</p>
          <h1 className="hero-tagline">One API.<br />Any runtime.<br />Push notifications <span className="highlight">without the pain.</span></h1>
          <p className="hero-subtitle">Send notifications from <strong>Node.js</strong>, <strong>Convex</strong>, <strong>Cloudflare Workers</strong>, <strong>Bun</strong>, and <strong>Deno</strong> with a single <code>send()</code> function.</p>
          <div className="hero-actions">
            <a href="#quickstart" className="btn btn-primary" aria-label="Get started with expo-push-easy">Get Started</a>
            <a href="https://github.com/yohanbcn/expo-push-easy" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" aria-label="View on GitHub">GitHub</a>
            <span className="npm-badge">
              <a href="https://www.npmjs.com/package/expo-push-easy" target="_blank" rel="noopener noreferrer" aria-label="View on npm">
                <img src="https://img.shields.io/npm/v/expo-push-easy?color=06b6d4&label=npm" alt="expo-push-easy npm version" width="90" height="22" loading="lazy" />
              </a>
            </span>
          </div>
        </div>
        <div className="hero-code" aria-label="Code example">
          <pre><code>{codeSend}</code></pre>
        </div>
      </div>
    </header>
  );
}

function WhySection() {
  const reasons = [
    { title: 'Universal Runtime', desc: 'Write once, push anywhere. Node, Convex, Cloudflare Workers, Deno, Bun with zero platform lock-in.' },
    { title: 'Unified API', desc: 'Same send() function for Expo Push and FCM tokens. Auto-detection means you never think about transport.' },
    { title: 'Zero Config FCM', desc: 'No googleapis. No jsonwebtoken. Just point at a service account JSON and go.' },
  ];

  return (
    <section className="section why" aria-label="Why expo-push-easy">
      <h2 className="section-title">Why expo-push-easy?</h2>
      <div className="why-grid" role="list">
        {reasons.map((r) => (
          <article key={r.title} className="why-card" role="listitem">
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section id="quickstart" className="section quickstart" aria-label="Quick start guide">
      <h2 className="section-title">Quick Start</h2>
      <p className="section-desc">Get up and running in under a minute. No accounts. No API keys needed for Expo Push.</p>
      <pre className="code-block"><code>{codeInstall}</code></pre>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section className="section features" aria-label="Feature overview">
      <h2 className="section-title">Everything you need</h2>
      <p className="section-desc">Eight composable exports covering the full push notification lifecycle.</p>
      <div className="features-grid" role="list">
        {features.map((f) => (
          <article key={f.name} className="feature-card" role="listitem">
            <h3>{f.name}</h3>
            <p>{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompatibilityTable() {
  return (
    <section className="section compat" aria-label="Runtime compatibility table">
      <h2 className="section-title">Runtime Compatibility</h2>
      <p className="section-desc">Use expo-push-easy in any modern JavaScript environment: serverless, edge, or traditional servers.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {compatRows.map((r) => (
              <tr key={r.runtime}>
                <td className="runtime-name">{r.runtime}</td>
                <td>{r.send}</td>
                <td>{r.sched}</td>
                <td>{r.adapters}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="section comparison" aria-label="Comparison with alternatives">
      <h2 className="section-title">How it stacks up</h2>
      <p className="section-desc">See how expo-push-easy compares to expo-server-sdk and firebase-admin across key features.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{comparisonHeaders.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {comparisonRows.map((r) => (
              <tr key={r.feature}>
                <td className="runtime-name">{r.feature}</td>
                <td className="col-a">{r.a}</td>
                <td>{r.b}</td>
                <td>{r.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-links">
        <a href="https://github.com/yohanbcn/expo-push-easy" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.npmjs.com/package/expo-push-easy" target="_blank" rel="noopener noreferrer">npm</a>
        <a href="https://github.com/yohanbcn/expo-push-easy/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
      </div>
      <p className="footer-note">Push from any runtime. Built for the edge.</p>
    </footer>
  );
}

export default App;
