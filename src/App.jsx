import { useState } from 'react';
import './App.css';

const codeSend = `import { send } from 'expo-push-easy';

await send({
  token: 'ExponentPushToken[xxx]',
  title: 'Hello!',
  body: 'Works everywhere.',
});`;

const codeInstall = `# Step 1: Install
npm install expo-push-easy

# Step 2: Send a push
import { send } from 'expo-push-easy';
await send({
  token: 'ExponentPushToken[xxx]',
  title: 'Hello!',
  body: 'From any runtime.',
});

# Step 3: FCM (optional)
import { send } from 'expo-push-easy';
await send({
  token: 'fcm-device-token',
  title: 'FCM works too!',
  body: 'No googleapis needed.',
  fcm: { serviceAccount: JSON.parse(process.env.GOOGLE_CREDENTIALS) },
});`;

const features = [
  { name: 'send()', desc: 'Universal push — Expo Push & FCM tokens auto-detected.' },
  { name: 'sendBatch()', desc: 'Send thousands of notifications in a single call.' },
  { name: 'sendExpoPush()', desc: 'Direct Expo Push API call when you know the token type.' },
  { name: 'sendFcm()', desc: 'Direct FCM v1 HTTP API call with baked-in auth.' },
  { name: 'Client Helpers', desc: 'registerForPushNotifications & onTokenRefresh for Expo apps.' },
  { name: 'Scheduling', desc: 'Delay or schedule push notifications with ease.' },
  { name: 'Adapters', desc: 'First-class adapters for Convex, Supabase, and Firebase.' },
  { name: 'FCM Auth', desc: 'Auto-generated JWT from service account. No googleapis dependency.' },
];

const compatRows = [
  { runtime: 'Node.js', send: '✅', sched: '✅', adapters: '✅' },
  { runtime: 'Convex', send: '✅', sched: '✅', adapters: '✅' },
  { runtime: 'Cloudflare Workers', send: '✅', sched: '—', adapters: '—' },
  { runtime: 'Bun', send: '✅', sched: '✅', adapters: '✅' },
  { runtime: 'Deno', send: '✅', sched: '✅', adapters: '✅' },
];

const headers = ['Runtime', 'send()', 'Scheduling', 'Adapters'];

const comparisonHeaders = ['', 'expo-push-easy', 'expo-server-sdk', 'firebase-admin'];
const comparisonRows = [
  { feature: 'Expo Push', a: '✅', b: '✅', c: '❌' },
  { feature: 'FCM v1', a: '✅', b: '❌', c: '✅' },
  { feature: 'Edge runtime', a: '✅', b: '❌', c: '❌' },
  { feature: 'Token auto-detect', a: '✅', b: '❌', c: '❌' },
  { feature: 'Batch send', a: '✅', b: '✅', c: '✅' },
  { feature: 'Scheduling', a: '✅', b: '❌', c: '❌' },
];

function App() {
  return (
    <div className="app">
      <Hero />
      <WhySection />
      <QuickStart />
      <FeaturesGrid />
      <CompatibilityTable />
      <ComparisonTable />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <nav className="nav">
        <span className="logo">expo-push-easy</span>
        <div className="nav-links">
          <a href="https://github.com/yohanbcn/expo-push-easy" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.npmjs.com/package/expo-push-easy" target="_blank" rel="noopener noreferrer">npm</a>
        </div>
      </nav>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-badge">📨 v2.0.0</p>
          <h1 className="hero-tagline">One API.<br />Any runtime.<br />Push notifications <span className="highlight">without the pain.</span></h1>
          <div className="hero-actions">
            <a href="#quickstart" className="btn btn-primary">Get Started</a>
            <a href="https://github.com/yohanbcn/expo-push-easy" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">GitHub →</a>
            <span className="npm-badge">
              <a href="https://www.npmjs.com/package/expo-push-easy" target="_blank" rel="noopener noreferrer">
                <img src="https://img.shields.io/npm/v/expo-push-easy?color=06b6d4&label=npm" alt="npm version" />
              </a>
            </span>
          </div>
        </div>
        <div className="hero-code">
          <pre><code>{codeSend}</code></pre>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    { icon: '⚡', title: 'Universal Runtime', desc: 'Write once, push anywhere. Node, Convex, Cloudflare Workers, Deno, Bun — zero platform lock-in.' },
    { icon: '🔌', title: 'Unified API', desc: 'Same send() function for Expo Push and FCM tokens. Auto-detection means you never think about transport.' },
    { icon: '🔐', title: 'Zero Config FCM', desc: 'No googleapis. No jsonwebtoken. Just point at a service account JSON and go.' },
  ];

  return (
    <section className="section why">
      <h2 className="section-title">Why expo-push-easy?</h2>
      <div className="why-grid">
        {reasons.map((r) => (
          <div key={r.title} className="why-card">
            <span className="why-icon">{r.icon}</span>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section id="quickstart" className="section quickstart">
      <h2 className="section-title">Quick Start</h2>
      <pre className="code-block"><code>{codeInstall}</code></pre>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section className="section features">
      <h2 className="section-title">Everything you need</h2>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.name} className="feature-card">
            <h3>{f.name}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CompatibilityTable() {
  return (
    <section className="section compat">
      <h2 className="section-title">Runtime Compatibility</h2>
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
    <section className="section comparison">
      <h2 className="section-title">How it stacks up</h2>
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
    <footer className="footer">
      <div className="footer-links">
        <a href="https://github.com/yohanbcn/expo-push-easy" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.npmjs.com/package/expo-push-easy" target="_blank" rel="noopener noreferrer">npm</a>
        <span>MIT License</span>
      </div>
      <p className="footer-note">Built for the edge. Push from anywhere.</p>
    </footer>
  );
}

export default App;
