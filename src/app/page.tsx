"use client";
import { useCallback, useState } from "react";
import IntroAnimation from "@/app/components/IntroAnimation";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
      style={{ background: "#FFFBF0", borderBottom: "3px solid #0D0D0D" }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center font-black text-xl"
          style={{ background: "#FFD60A", border: "3px solid #0D0D0D", borderRadius: 10, boxShadow: "3px 3px 0 #0D0D0D" }}>
          🏆
        </div>
        <span className="font-black text-xl tracking-tight" style={{ fontFamily: "Impact, Arial Black, sans-serif", color: "#0D0D0D" }}>
          PAPAPARADIES
        </span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-bold">
        <a href="#" className="hover:underline">Challenges</a>
        <a href="#" className="hover:underline">Community</a>
        <a href="#" className="hover:underline">Produkte</a>
        <button className="brutal-btn px-5 py-2 text-sm" style={{ background: "#FFD60A" }}>
          Einloggen
        </button>
      </div>
    </nav>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ["🏆 1.247 Väter aktiv", "⚡ 38.500 XP vergeben", "🎯 142 Challenges heute", "🧷 Neue Windel-Challenge freigeschaltet", "👑 SuperPapa_Max ist #1 der Woche", "🚀 Community wächst täglich"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3" style={{ background: "#0D0D0D", borderBottom: "3px solid #0D0D0D" }}>
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marqueeTicker 22s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-bold shrink-0" style={{ color: "#FFD60A" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="min-h-screen pt-[73px] flex flex-col" style={{ background: "#FFFBF0" }}>
      <Ticker />

      <div className="flex-1 flex flex-col lg:flex-row items-center gap-12 px-6 md:px-12 py-16 max-w-7xl mx-auto w-full">

        {/* Links: Text */}
        <div className="flex-1 space-y-8" style={{ animation: "slideInLeft 0.7s ease-out both" }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 brutal-tag" style={{ background: "#FFD60A" }}>
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block pulse"/>
            <span>Papa-Paradies — jetzt kostenlos starten</span>
          </div>

          {/* Headline */}
          <h1 className="leading-[0.88] font-black"
            style={{ fontFamily: "Impact, Arial Black, sans-serif", fontSize: "clamp(4rem, 10vw, 7.5rem)", color: "#0D0D0D" }}>
            KEIN<br/>
            <span className="relative inline-block">
              PAPA
              <span style={{
                position: "absolute", bottom: -6, left: 0, right: 0, height: 8,
                background: "#FFD60A", zIndex: -1,
              }}/>
            </span>
            <br/>
            <span style={{ color: "#FF3B30", WebkitTextStroke: "2px #0D0D0D" }}>LAPAPP.</span>
          </h1>

          <p className="text-xl font-medium max-w-md" style={{ color: "#6B6B6B", lineHeight: 1.5 }}>
            Das einzige Papa-Netzwerk mit echtem Gamification. Level up dein Papa-Sein — Challenge by Challenge.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button className="brutal-btn px-8 py-4 text-lg font-black" style={{ background: "#FFD60A" }}>
              🎮 Jetzt starten — kostenlos
            </button>
            <button className="brutal-btn px-8 py-4 text-lg font-bold" style={{ background: "white" }}>
              Mehr erfahren →
            </button>
          </div>

          {/* Micro-stats */}
          <div className="flex gap-8 pt-4">
            {[["1.247", "Aktive Väter"], ["4.8★", "Bewertung"], ["100%", "Kostenlos"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-black">{v}</div>
                <div className="text-sm font-medium" style={{ color: "#6B6B6B" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rechts: Gamification Card */}
        <div className="flex-1 flex justify-center" style={{ animation: "slideInRight 0.7s 0.15s ease-out both", opacity: 0 }}>
          <div className="w-full max-w-sm space-y-4">

            {/* Level Card */}
            <div className="brutal-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6B6B6B" }}>Dein Papa-Level</p>
                  <p className="text-2xl font-black mt-1">🧢 ROOKIE</p>
                </div>
                <div className="w-16 h-16 flex items-center justify-center text-3xl float"
                  style={{ background: "#FFD60A", border: "3px solid #0D0D0D", borderRadius: 12, boxShadow: "3px 3px 0 #0D0D0D" }}>
                  🏆
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>340 XP</span><span style={{ color: "#6B6B6B" }}>Ziel: 500 XP</span>
                </div>
                <div className="h-4 rounded-full overflow-hidden" style={{ background: "#F0F0F0", border: "2px solid #0D0D0D" }}>
                  <div className="h-full rounded-full xp-bar" style={{ background: "#FFD60A", width: 0 }}/>
                </div>
                <p className="text-xs font-medium" style={{ color: "#6B6B6B" }}>Noch 160 XP → PRO-PAPA 💪</p>
              </div>
            </div>

            {/* Tages-Challenge */}
            <div className="brutal-card p-5" style={{ background: "#0D0D0D", color: "white" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#FFD60A" }}>Tages-Challenge</p>
                  <p className="font-bold mt-0.5">Lies einen Ratgeber-Artikel</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Belohnung</span>
                <span className="font-black" style={{ color: "#FFD60A" }}>+50 XP</span>
              </div>
            </div>

            {/* Mini-Leaderboard */}
            <div className="brutal-card p-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#6B6B6B" }}>🏅 Top Väter</p>
              {[["🥇", "SuperPapa_Max", "4.820"], ["🥈", "DadOfThree", "4.210"], ["🥉", "KletterPapa", "3.950"]].map(([m, n, x]) => (
                <div key={n} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "#F0F0F0" }}>
                  <span>{m}</span>
                  <span className="flex-1 text-sm font-semibold">{n}</span>
                  <span className="text-sm font-black">{x} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GAMIFICATION SECTION ─────────────────────────────────────────────────────
function GamificationSection() {
  const levels = [
    { icon: "🧢", name: "Rookie",   xp: "0–500",   color: "#F0F0F0", textColor: "#0D0D0D" },
    { icon: "🎖️", name: "Pro-Papa", xp: "500–2k",  color: "#FFD60A", textColor: "#0D0D0D" },
    { icon: "⭐", name: "Champion", xp: "2k–5k",  color: "#FF3B30", textColor: "white" },
    { icon: "👑", name: "Legende",  xp: "5k+",     color: "#0D0D0D", textColor: "#FFD60A" },
  ];

  const challenges = [
    { icon: "📖", title: "Artikel lesen",               xp: 50,  cat: "Wissen",  done: true },
    { icon: "🌳", title: "Outdoor mit Kind",             xp: 200, cat: "Aktiv",   done: false },
    { icon: "🧸", title: "Spielzeug selber basteln",     xp: 150, cat: "Kreativ", done: false },
    { icon: "💬", title: "Community-Beitrag schreiben",  xp: 75,  cat: "Community",done: false },
    { icon: "🍳", title: "Gemeinsam kochen",             xp: 100, cat: "Alltag",  done: false },
    { icon: "📸", title: "Papa-Moment teilen",           xp: 60,  cat: "Community",done: false },
  ];

  return (
    <section className="py-24 px-6 md:px-12" style={{ background: "#F4F4F4", borderTop: "3px solid #0D0D0D" }}>
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="brutal-tag" style={{ background: "#FFD60A" }}>Gamification</span>
            <h2 className="mt-4 font-black leading-none"
              style={{ fontFamily: "Impact, Arial Black, sans-serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#0D0D0D" }}>
              LEVEL UP.<br/>PAPA SEIN.
            </h2>
          </div>
          <p className="text-lg font-medium max-w-xs" style={{ color: "#6B6B6B" }}>
            Jede Aktion bringt XP. Jeder XP bringt dich näher zur Legende.
          </p>
        </div>

        {/* Level-System */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {levels.map((l) => (
            <div key={l.name} className="brutal-card p-5 text-center"
              style={{ background: l.color, color: l.textColor }}>
              <div className="text-4xl mb-3 float">{l.icon}</div>
              <div className="font-black text-lg">{l.name}</div>
              <div className="text-sm font-semibold mt-1 opacity-70">{l.xp} XP</div>
            </div>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((c, i) => (
            <div key={i} className="brutal-card p-5 flex items-start gap-4"
              style={{ background: c.done ? "#F8F8F8" : "white", opacity: c.done ? 0.7 : 1 }}>
              <div className="w-12 h-12 flex items-center justify-center text-2xl shrink-0"
                style={{ background: c.done ? "#F0F0F0" : "#FFD60A", border: "2px solid #0D0D0D", borderRadius: 10 }}>
                {c.done ? "✓" : c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold ${c.done ? "line-through" : ""}`} style={{ color: c.done ? "#6B6B6B" : "#0D0D0D" }}>
                  {c.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="brutal-tag text-xs" style={{ background: "#F0F0F0" }}>{c.cat}</span>
                  <span className="font-black text-sm" style={{ color: c.done ? "#6B6B6B" : "#FF3B30" }}>+{c.xp} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="brutal-btn px-10 py-4 font-bold text-lg" style={{ background: "#FFD60A" }}>
            Alle Challenges ansehen →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── AFFILIATE ────────────────────────────────────────────────────────────────
function AffiliateSection() {
  const products = [
    { emoji: "🎒", name: "Deuter Kid Comfort Rucksack", cat: "Outdoor",     price: "149€", xp: 80,  tag: "Bestseller", tagBg: "#FFD60A", reviews: 1240, desc: "Wandern mit Kind — der Community-Favorit." },
    { emoji: "🔧", name: "Victorinox Taschenmesser",    cat: "Gadgets",     price: "39€",  xp: 50,  tag: "Top-Rated",  tagBg: "#FF3B30", reviews: 3800, desc: "Immer dabei. Immer nützlich." },
    { emoji: "📚", name: "Papa sein — Buch Bundle",     cat: "Ratgeber",    price: "24€",  xp: 150, tag: "+150 XP",    tagBg: "#0057FF", reviews: 580,  desc: "Wissen kaufen — XP kassieren." },
    { emoji: "⚽", name: "Hudora Fußball Set",           cat: "Sport",       price: "29€",  xp: 100, tag: "Deal",       tagBg: "#22c55e", reviews: 920,  desc: "Raus aus dem Haus. Tor schießen." },
  ];

  return (
    <section className="py-24 px-6 md:px-12" style={{ background: "#FFFBF0", borderTop: "3px solid #0D0D0D" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="brutal-tag" style={{ background: "#FF3B30", color: "white" }}>Papa-Equipment</span>
            <h2 className="mt-4 font-black leading-none"
              style={{ fontFamily: "Impact, Arial Black, sans-serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "#0D0D0D" }}>
              VON VÄTERN<br/>EMPFOHLEN.
            </h2>
          </div>
          <p className="text-lg font-medium max-w-xs" style={{ color: "#6B6B6B" }}>
            Kaufen & XP kassieren. So macht Shopping Sinn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <div key={i} className="brutal-card flex flex-col overflow-hidden">
              {/* Produkt-Header */}
              <div className="p-5 flex items-start justify-between" style={{ background: "#F8F8F8", borderBottom: "3px solid #0D0D0D" }}>
                <span className="text-5xl">{p.emoji}</span>
                <span className="brutal-tag text-xs font-black" style={{ background: p.tagBg, color: p.tagBg === "#FFD60A" ? "#0D0D0D" : "white" }}>{p.tag}</span>
              </div>
              {/* Produkt-Body */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#6B6B6B" }}>{p.cat}</p>
                <h3 className="font-black text-base leading-snug">{p.name}</h3>
                <p className="text-sm mt-2 flex-1" style={{ color: "#6B6B6B" }}>{p.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: "#6B6B6B" }}>
                  <span style={{ color: "#FFD60A" }}>★★★★★</span>
                  <span>({p.reviews.toLocaleString()})</span>
                </div>
                <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "2px solid #F0F0F0" }}>
                  <div>
                    <span className="font-black text-lg">{p.price}</span>
                    <span className="block text-xs font-bold" style={{ color: "#FF3B30" }}>+{p.xp} XP</span>
                  </div>
                  <button className="brutal-btn px-4 py-2 text-sm font-black" style={{ background: "#FFD60A" }}>
                    Kaufen →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="brutal-btn px-10 py-4 font-bold text-lg" style={{ background: "white" }}>
            Alle Produkte →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── COMMUNITY STRIP ─────────────────────────────────────────────────────────
function CommunityStrip() {
  const stats = [
    { v: "1.247", l: "Aktive Väter",         i: "👨‍👧‍👦" },
    { v: "38.500", l: "XP vergeben",          i: "⚡" },
    { v: "142",   l: "Challenges heute",      i: "🎯" },
    { v: "4.8★",  l: "Community-Bewertung",  i: "🏆" },
  ];
  return (
    <section style={{ background: "#0D0D0D", borderTop: "3px solid #0D0D0D", borderBottom: "3px solid #0D0D0D" }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-3xl mb-2">{s.i}</div>
            <div className="text-3xl font-black" style={{ color: "#FFD60A" }}>{s.v}</div>
            <div className="text-sm font-medium mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="py-24 px-6" style={{ background: "#FFD60A", borderTop: "3px solid #0D0D0D" }}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="font-black leading-none"
          style={{ fontFamily: "Impact, Arial Black, sans-serif", fontSize: "clamp(3rem,9vw,6rem)", color: "#0D0D0D" }}>
          BEREIT FÜR DAS<br/>PAPAPARADIES?
        </h2>
        <p className="text-xl font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>
          Kostenlos starten. Level steigen. Legende werden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="brutal-btn px-10 py-5 text-xl font-black" style={{ background: "#0D0D0D", color: "#FFD60A" }}>
            🚀 Jetzt kostenlos starten
          </button>
          <button className="brutal-btn px-10 py-5 text-xl font-bold" style={{ background: "white" }}>
            Community ansehen →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 py-12" style={{ background: "#0D0D0D", borderTop: "3px solid #0D0D0D" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center font-black text-xl"
            style={{ background: "#FFD60A", border: "3px solid rgba(255,255,255,0.2)", borderRadius: 10 }}>
            🏆
          </div>
          <span className="font-black text-xl" style={{ fontFamily: "Impact, Arial Black, sans-serif", color: "white" }}>
            PAPAPARADIES.DE
          </span>
        </div>
        <div className="flex gap-6 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
          <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-white transition-colors">Impressum</a>
          <a href="#" className="hover:text-white transition-colors">Affiliate-Info</a>
          <a href="#" className="hover:text-white transition-colors">Kontakt</a>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 Papaparadies · Kein Papalapapp.
        </p>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const handleDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {!introDone && <IntroAnimation onDone={handleDone} />}
      <div style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Navbar />
        <HeroSection />
        <CommunityStrip />
        <GamificationSection />
        <AffiliateSection />
        <CtaBanner />
        <Footer />
      </div>
    </>
  );
}
