"use client";
import { useEffect, useState, useCallback } from "react";

type Phase = "walking" | "objects" | "bubble" | "zoom" | "door" | "paradise" | "done";

const DROP_OBJECTS = [
  { emoji: "🧷", fromRight: true,  left: "17%", bottom: "19%", bang: "CRASH!", bx: "6%",  by: "38%" },
  { emoji: "🍼", fromRight: false, left: "65%", bottom: "17%", bang: "BOOM!",  bx: "70%", by: "32%" },
  { emoji: "🧦", fromRight: true,  left: "27%", bottom: "15%", bang: "POW!",   bx: "4%",  by: "62%" },
  { emoji: "🍳", fromRight: false, left: "61%", bottom: "20%", bang: "WHAM!",  bx: "66%", by: "58%" },
  { emoji: "🧸", fromRight: true,  left: "35%", bottom: "16%", bang: "ZACK!",  bx: "5%",  by: "18%" },
  { emoji: "👟", fromRight: false, left: "72%", bottom: "18%", bang: "BAM!",   bx: "68%", by: "18%" },
  { emoji: "🎀", fromRight: true,  left: "14%", bottom: "22%", bang: "PUFF!",  bx: "3%",  by: "74%" },
];

// ─── STERNBURST (Comic Explosion Shape) ──────────────────────────────────────
function StarBurst({ color = "#FFD60A", size = 90 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0 }}>
      <path
        d="M50 2 L54 38 L72 14 L62 44 L92 36 L70 54 L95 68 L64 66 L72 96 L52 76 L42 98 L40 68 L10 80 L28 58 L2 50 L30 42 L14 16 L38 34Z"
        fill={color} stroke="#0D0D0D" strokeWidth="3" strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── COMIC BANG TEXT ──────────────────────────────────────────────────────────
const BANG_COLORS: Record<string, { bg: string; text: string }> = {
  "CRASH!": { bg: "#FF3B30", text: "white" },
  "BOOM!":  { bg: "#FFD60A", text: "#0D0D0D" },
  "POW!":   { bg: "#0057FF", text: "white" },
  "WHAM!":  { bg: "#FF3B30", text: "white" },
  "ZACK!":  { bg: "#FFD60A", text: "#0D0D0D" },
  "BAM!":   { bg: "#0057FF", text: "white" },
  "PUFF!":  { bg: "#FF3B30", text: "white" },
};

function ComicBang({ text, x, y }: { text: string; x: string; y: string }) {
  const c = BANG_COLORS[text] ?? { bg: "#FFD60A", text: "#0D0D0D" };
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      transform: `rotate(${Math.random() > 0.5 ? -12 : 10}deg)`,
      animation: "bangPop 0.25s cubic-bezier(0.16,1,0.3,1) forwards",
      zIndex: 20,
    }}>
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <StarBurst color={c.bg} size={90} />
        <span style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "Impact, Arial Black, sans-serif",
          fontSize: "0.95rem", fontWeight: 900,
          color: c.text,
          WebkitTextStroke: c.text === "white" ? "0" : "1px #0D0D0D",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}>
          {text}
        </span>
      </div>
    </div>
  );
}

// ─── STRESSED COMIC DAD ───────────────────────────────────────────────────────
function StressedComicDad() {
  return (
    <svg width="160" height="250" viewBox="0 0 160 250" fill="none">
      {/* Haar */}
      <path d="M42 45 Q48 18 62 26 Q68 12 80 18 Q92 12 98 26 Q112 18 118 45"
        fill="#2D1A00" stroke="#0D0D0D" strokeWidth="2"/>
      {/* Kopf */}
      <circle cx="80" cy="60" r="42" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="4"/>
      {/* Sorgen-Brauen */}
      <path d="M55 46 Q63 39 72 46" stroke="#0D0D0D" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M88 46 Q97 39 105 46" stroke="#0D0D0D" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Augen (weit aufgerissen) */}
      <ellipse cx="64" cy="58" rx="9" ry="10" fill="white" stroke="#0D0D0D" strokeWidth="2.5"/>
      <ellipse cx="96" cy="58" rx="9" ry="10" fill="white" stroke="#0D0D0D" strokeWidth="2.5"/>
      <circle cx="66" cy="60" r="5.5" fill="#0D0D0D"/>
      <circle cx="98" cy="60" r="5.5" fill="#0D0D0D"/>
      <circle cx="67" cy="58" r="2" fill="white"/>
      <circle cx="99" cy="58" r="2" fill="white"/>
      {/* Mund (Grimasse) */}
      <path d="M66 78 Q80 73 94 78" stroke="#0D0D0D" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Schweißtropfen */}
      <ellipse cx="118" cy="44" rx="5" ry="9" fill="#60a5fa" stroke="#0D0D0D" strokeWidth="2.5"/>
      <ellipse cx="126" cy="58" rx="4" ry="7" fill="#60a5fa" stroke="#0D0D0D" strokeWidth="2"/>
      {/* Körper (roter Anzug) */}
      <path d="M30 110 Q22 125 24 175 Q26 215 80 218 Q134 215 136 175 Q138 125 130 110 Q116 96 80 96 Q44 96 30 110Z"
        fill="#FF3B30" stroke="#0D0D0D" strokeWidth="4"/>
      {/* Schild */}
      <path d="M65 112 L80 103 L95 112 L95 138 L80 147 L65 138Z" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="3"/>
      <text x="72" y="136" fontFamily="Impact, Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#FF3B30">P</text>
      {/* Linker Arm (hochgerissen) – Outline zuerst */}
      <path d="M34 118 Q10 100 4 78" stroke="#0D0D0D" strokeWidth="30" strokeLinecap="round" fill="none"/>
      <path d="M34 118 Q10 100 4 78" stroke="#FF3B30" strokeWidth="24" strokeLinecap="round" fill="none"/>
      <circle cx="4"   cy="78" r="17" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="3"/>
      {/* Rechter Arm (hochgerissen) */}
      <path d="M126 118 Q150 100 156 78" stroke="#0D0D0D" strokeWidth="30" strokeLinecap="round" fill="none"/>
      <path d="M126 118 Q150 100 156 78" stroke="#FF3B30" strokeWidth="24" strokeLinecap="round" fill="none"/>
      <circle cx="156" cy="78" r="17" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="3"/>
      {/* Beine */}
      <rect x="33" y="208" width="36" height="58" rx="18" fill="#FF3B30" stroke="#0D0D0D" strokeWidth="4"/>
      <rect x="91" y="208" width="36" height="58" rx="18" fill="#FF3B30" stroke="#0D0D0D" strokeWidth="4"/>
      {/* Stiefel */}
      <ellipse cx="51"  cy="265" rx="26" ry="11" fill="#8B0000" stroke="#0D0D0D" strokeWidth="3"/>
      <ellipse cx="109" cy="265" rx="26" ry="11" fill="#8B0000" stroke="#0D0D0D" strokeWidth="3"/>
    </svg>
  );
}

// ─── HERO COMIC DAD (mit Pokal + Cape) ───────────────────────────────────────
function HeroComicDad() {
  return (
    <svg width="180" height="270" viewBox="0 0 180 270" fill="none">
      {/* Cape – hinter Körper */}
      <path d="M40 108 Q12 130 8 200 Q6 240 32 252 Q52 260 56 235 Q60 212 80 205 Q100 212 104 235 Q108 260 128 252 Q154 240 152 200 Q148 130 120 108"
        fill="#0057FF" stroke="#0D0D0D" strokeWidth="3"/>
      {/* Cape Highlight */}
      <path d="M50 115 Q28 140 24 195" stroke="rgba(255,255,255,0.2)" strokeWidth="8" strokeLinecap="round" fill="none"/>
      {/* Haar */}
      <path d="M48 52 Q54 26 66 34 Q72 18 80 24 Q88 18 94 34 Q106 26 112 52"
        fill="#2D1A00" stroke="#0D0D0D" strokeWidth="2"/>
      {/* Schnurrbart */}
      <path d="M66 82 Q72 76 80 78 Q88 76 94 82" fill="#2D1A00" stroke="#0D0D0D" strokeWidth="2"/>
      {/* Kopf */}
      <circle cx="80" cy="65" r="42" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="4"/>
      {/* Zugekniffene Augen (Freude) */}
      <path d="M55 55 Q64 48 73 55" stroke="#0D0D0D" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <path d="M87 55 Q96 48 105 55" stroke="#0D0D0D" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* Wangen-Rouge */}
      <ellipse cx="60" cy="68" rx="10" ry="6" fill="#FF3B30" opacity="0.22"/>
      <ellipse cx="100" cy="68" rx="10" ry="6" fill="#FF3B30" opacity="0.22"/>
      {/* Breites Lächeln */}
      <path d="M58 80 Q80 98 102 80" stroke="#0D0D0D" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      {/* Körper (roter Anzug) */}
      <path d="M30 112 Q22 128 24 178 Q26 218 80 221 Q134 218 136 178 Q138 128 130 112 Q116 98 80 98 Q44 98 30 112Z"
        fill="#FF3B30" stroke="#0D0D0D" strokeWidth="4"/>
      {/* Schild */}
      <path d="M65 115 L80 106 L95 115 L95 140 L80 150 L65 140Z" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="3"/>
      <text x="72" y="139" fontFamily="Impact, Arial Black, sans-serif" fontSize="22" fontWeight="900" fill="#FF3B30">P</text>
      {/* Linker Arm (locker seitlich) */}
      <path d="M34 120 Q12 135 6 155" stroke="#0D0D0D" strokeWidth="28" strokeLinecap="round" fill="none"/>
      <path d="M34 120 Q12 135 6 155" stroke="#FF3B30" strokeWidth="22" strokeLinecap="round" fill="none"/>
      <circle cx="6" cy="155" r="15" fill="#FFD60A" stroke="#0D0D0D" strokeWidth="3"/>
      {/* Rechter Arm (hochgereckt – hält Pokal) */}
      <path d="M126 118 Q148 90 155 60" stroke="#0D0D0D" strokeWidth="28" strokeLinecap="round" fill="none"/>
      <path d="M126 118 Q148 90 155 60" stroke="#FF3B30" strokeWidth="22" strokeLinecap="round" fill="none"/>
      {/* Pokal in erhobener Hand */}
      <g transform="translate(138, 5)">
        {/* Griff links */}
        <path d="M6 24 Q0 24 0 32 Q0 40 6 40" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Griff rechts */}
        <path d="M34 24 Q40 24 40 32 Q40 40 34 40" stroke="#0D0D0D" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Pokalschale */}
        <path d="M6 22 Q4 6 12 2 L28 2 Q36 6 34 22 Q34 36 20 42 Q6 36 6 22Z"
          fill="#FFD60A" stroke="#0D0D0D" strokeWidth="3"/>
        {/* Stern auf Pokal */}
        <path d="M20 12 L22 8 L24 12 L28 12 L25 15 L26 19 L20 16 L14 19 L15 15 L12 12Z" fill="white" opacity="0.9"/>
        {/* Sockel */}
        <rect x="16" y="42" width="8" height="8" rx="2" fill="#0D0D0D"/>
        <rect x="11" y="50" width="18" height="5" rx="2.5" fill="#0D0D0D"/>
      </g>
      {/* Beine */}
      <rect x="33" y="210" width="36" height="58" rx="18" fill="#FF3B30" stroke="#0D0D0D" strokeWidth="4"/>
      <rect x="91" y="210" width="36" height="58" rx="18" fill="#FF3B30" stroke="#0D0D0D" strokeWidth="4"/>
      {/* Stiefel */}
      <ellipse cx="51"  cy="267" rx="28" ry="11" fill="#8B0000" stroke="#0D0D0D" strokeWidth="3"/>
      <ellipse cx="109" cy="267" rx="28" ry="11" fill="#8B0000" stroke="#0D0D0D" strokeWidth="3"/>
    </svg>
  );
}

// ─── COMIC SPRECHBLASE ────────────────────────────────────────────────────────
function ComicBubble() {
  return (
    <div style={{ animation: "bubblePop 0.35s cubic-bezier(0.16,1,0.3,1) forwards", position: "relative" }}>
      {/* Äußere Kontur */}
      <div style={{
        background: "#0D0D0D",
        borderRadius: 24,
        padding: 5,
        boxShadow: "6px 6px 0 #0D0D0D",
      }}>
        <div style={{
          background: "white",
          borderRadius: 20,
          padding: "16px 32px",
          fontFamily: "Impact, Arial Black, sans-serif",
          position: "relative",
        }}>
          <span style={{
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            fontWeight: 900,
            color: "#FF3B30",
            WebkitTextStroke: "2px #0D0D0D",
            letterSpacing: "4px",
            display: "block",
          }}>
            PAPALAPAPP
          </span>
          {/* Wellige Comic-Kontur Andeutung */}
          <div style={{ position: "absolute", top: -6, left: -6, right: -6, bottom: -6, border: "3px solid #FFD60A", borderRadius: 24, pointerEvents: "none" }}/>
        </div>
      </div>
      {/* Schwanz */}
      <div style={{ position: "absolute", bottom: -26, left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderTop: "28px solid #0D0D0D" }}/>
      </div>
      <div style={{ position: "absolute", bottom: -19, left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "22px solid white" }}/>
      </div>
    </div>
  );
}

// ─── TÜR MIT SCHATTEN/KNICK-EFFEKT ───────────────────────────────────────────
function ComicDoor({ onDone }: { onDone: () => void }) {
  const [dp, setDp] = useState<"flat" | "crease" | "partial" | "open" | "hero">("flat");

  useEffect(() => {
    const t1 = setTimeout(() => setDp("crease"),  500);
    const t2 = setTimeout(() => setDp("partial"), 1000);
    const t3 = setTimeout(() => setDp("open"),    1700);
    const t4 = setTimeout(() => setDp("hero"),    2000);
    const t5 = setTimeout(() => onDone(),         2600);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onDone]);

  const W = 220, H = 365;
  const borderR = "50% 50% 0 0 / 20% 20% 0 0";

  const doorAngle   = dp === "partial" ? -42 : (dp === "open" || dp === "hero") ? -87 : 0;
  const shadowWidth = dp === "crease"  ? 10  : dp === "partial" ? 48 : (dp === "open" || dp === "hero") ? 88 : 0;
  // Tür-Panel bekommt einen dunklen Rand-Gradient (zeigt Tiefe / Knick)
  const doorBg = dp === "flat"
    ? "#FFD60A"
    : `linear-gradient(to right, #FFD60A 75%, #C8920A 92%, #8A6100 100%)`;

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#FFD60A" }}>
      {/* Halbtone-Punkte auf der Wand */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
      }}/>

      {/* Dunkle Öffnung hinter Tür */}
      <div style={{
        position: "absolute", width: W, height: H,
        background: "linear-gradient(180deg, #111 0%, #0D0D0D 100%)",
        borderRadius: borderR, zIndex: 1,
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)",
      }}/>

      {/* *** SCHATTEN auf Wand (rechts von Tür) – zeigt dass Tür aufknickt *** */}
      <div style={{
        position: "absolute",
        left:   `calc(50% + ${W / 2 - 6}px)`,
        top:    "50%",
        width:  `${shadowWidth}px`,
        height: H,
        transform: "translateY(-50%)",
        background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)",
        transition: "width 0.65s ease-in-out",
        zIndex: 6,
        pointerEvents: "none",
        borderRadius: "0 0 0 0",
      }}/>

      {/* Tür-Panel (gleiche Farbe wie Wand → erst durch 3D-Rotation erkennbar) */}
      <div style={{ perspective: "1100px", position: "absolute", zIndex: 4 }}>
        <div style={{
          width: W, height: H,
          background: doorBg,
          borderRadius: borderR,
          transformOrigin: "left center",
          transform: `rotateY(${doorAngle}deg)`,
          transition: `transform ${dp === "partial" ? 0.65 : 0.9}s cubic-bezier(0.4, 0, 0.2, 1), background 0.35s ease`,
          boxShadow: dp !== "flat" ? "inset -8px 0 20px rgba(0,0,0,0.15)" : "none",
        }}/>
      </div>

      {/* Hero kommt raus */}
      {dp === "hero" && (
        <div style={{
          position: "absolute", zIndex: 8,
          animation: "heroEntry 0.75s cubic-bezier(0.16,1,0.3,1) forwards",
        }}>
          <HeroComicDad />
        </div>
      )}
    </div>
  );
}

// ─── HAUPT-ANIMATION ──────────────────────────────────────────────────────────
export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase]    = useState<Phase>("walking");
  const [shown, setShown]    = useState(0); // wie viele Objekte sichtbar
  const [bangs, setBangs]    = useState<number[]>([]); // welche Bangs aktiv

  useEffect(() => {
    const objDur = DROP_OBJECTS.length * 520;
    const s: [Phase, number][] = [
      ["objects",  1600],
      ["bubble",   1600 + objDur + 300],
      ["zoom",     1600 + objDur + 1800],
      ["door",     1600 + objDur + 3700],
      ["paradise", 1600 + objDur + 6300],
      ["done",     1600 + objDur + 9200],
    ];
    const t = s.map(([p, ms]) => setTimeout(() => setPhase(p), ms));
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== "objects") return;
    let n = 0;
    const iv = setInterval(() => {
      n++;
      setShown(n);
      setBangs(prev => [...prev, n - 1]);
      // Bang nach 600ms wieder ausblenden
      setTimeout(() => setBangs(prev => prev.filter(i => i !== n - 1)), 600);
      if (n >= DROP_OBJECTS.length) clearInterval(iv);
    }, 520);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => { if (phase === "done") onDone(); }, [phase, onDone]);
  const skip = useCallback(() => onDone(), [onDone]);

  const inChaos = phase === "walking" || phase === "objects" || phase === "bubble";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none"
      style={{ background: "#FFFDE7" }}>

      {/* Skip */}
      <button onClick={skip}
        style={{
          position: "absolute", top: 20, right: 20, zIndex: 60,
          fontFamily: "Impact, Arial Black, sans-serif",
          fontSize: "0.85rem", fontWeight: 900,
          border: "2px solid #0D0D0D", borderRadius: 6,
          background: "rgba(255,255,255,0.6)", color: "#0D0D0D",
          padding: "6px 14px", cursor: "pointer", letterSpacing: 1,
        }}>
        SKIP →
      </button>

      {/* ══ CHAOS-PHASEN ════════════════════════════════════════════════════════ */}
      {inChaos && (
        <>
          {/* Comic Halftone Hintergrund */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}/>

          {/* Gelbliche Burst-Fläche im Zentrum */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: "min(70vw, 500px)", height: "min(70vw, 500px)",
              background: "radial-gradient(circle, rgba(255,214,10,0.25), transparent 70%)",
              borderRadius: "50%",
            }}/>
          </div>

          {/* Boden-Linie */}
          <div style={{
            position: "absolute", bottom: "10%", left: 0, right: 0,
            height: 4, background: "#0D0D0D", opacity: 0.18,
          }}/>

          {/* FALLENDE OBJEKTE */}
          {DROP_OBJECTS.slice(0, shown).map((o, i) => (
            <div key={i}
              style={{
                position: "absolute", left: o.left, bottom: o.bottom,
                fontSize: "clamp(2.2rem, 5vw, 3rem)",
                animation: `${o.fromRight ? "flyFromRight" : "flyFromLeft"} 0.55s cubic-bezier(0.16,1,0.3,1) forwards`,
                filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.3))",
              }}>
              {o.emoji}
            </div>
          ))}

          {/* BANG-EFFEKTE */}
          {DROP_OBJECTS.map((o, i) =>
            bangs.includes(i) ? (
              <ComicBang key={`bang-${i}`} text={o.bang} x={o.bx} y={o.by} />
            ) : null
          )}

          {/* MANN IM ZENTRUM */}
          <div className="absolute inset-0 flex items-end justify-center" style={{ paddingBottom: "10%" }}>
            <div className="flex flex-col items-center" style={{ gap: 32 }}>
              {phase === "bubble" && <ComicBubble />}
              <div style={{
                animation:
                  phase === "walking"
                    ? "walkIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards, walkBob 0.55s ease-in-out 0.9s infinite"
                    : phase === "objects"
                    ? "shakeMild 0.25s ease-in-out infinite"
                    : "none",
                filter: "drop-shadow(4px 4px 0 rgba(0,0,0,0.25))",
              }}>
                <StressedComicDad />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══ PAPALAPAPP ZOOM ═════════════════════════════════════════════════════ */}
      {phase === "zoom" && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ animation: "bgToYellow 2s ease-in forwards" }}>
          <div style={{ position: "relative", textAlign: "center", animation: "zoomPapalapapp 2s cubic-bezier(0.4,0,1,1) forwards" }}>
            {/* Burst hinter Text */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300 }}>
              <StarBurst color="#FFD60A" size={500} />
            </div>
            <span style={{
              position: "relative",
              fontFamily: "Impact, Arial Black, sans-serif",
              fontSize: "clamp(3.5rem, 9vw, 6rem)",
              fontWeight: 900,
              letterSpacing: "6px",
              color: "#FF3B30",
              WebkitTextStroke: "4px #0D0D0D",
              textShadow: "6px 6px 0 #0D0D0D",
              transform: "rotate(-4deg)",
              display: "block",
            }}>
              PAPALAPAPP
            </span>
          </div>
        </div>
      )}

      {/* ══ TÜR ═════════════════════════════════════════════════════════════════ */}
      {phase === "door" && <ComicDoor onDone={() => {}} />}

      {/* ══ PARADISE ════════════════════════════════════════════════════════════ */}
      {phase === "paradise" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "#FFFDE7" }}>
          {/* Halftone auch hier */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}/>
          {/* Großer Burst */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 600, pointerEvents: "none" }}>
            <StarBurst color="#FFD60A" size={700} />
          </div>

          <div className="relative text-center px-4"
            style={{ animation: "paradiseFlyIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            {/* Badge */}
            <div style={{
              display: "inline-block", marginBottom: 20,
              background: "#0057FF", border: "3px solid #0D0D0D",
              borderRadius: 999, padding: "6px 28px",
              boxShadow: "4px 4px 0 #0D0D0D",
            }}>
              <span style={{ fontFamily: "Impact, Arial Black, sans-serif", color: "white", fontSize: "0.85rem", letterSpacing: "3px" }}>
                HERZLICH WILLKOMMEN
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 style={{
                fontFamily: "Impact, Arial Black, sans-serif",
                fontSize: "clamp(4rem, 15vw, 10rem)",
                lineHeight: 0.88,
                color: "#FF3B30",
                WebkitTextStroke: "3px #0D0D0D",
                textShadow: "6px 6px 0 #0D0D0D",
                display: "block",
              }}>
                PAPA
              </h1>
              <h1 style={{
                fontFamily: "Impact, Arial Black, sans-serif",
                fontSize: "clamp(4rem, 15vw, 10rem)",
                lineHeight: 0.88,
                color: "#FFD60A",
                WebkitTextStroke: "3px #0D0D0D",
                textShadow: "6px 6px 0 #0D0D0D",
                display: "block",
              }}>
                PARADIES
              </h1>
            </div>

            <p style={{ marginTop: 24, fontFamily: "Impact, Arial Black, sans-serif", fontSize: "1.3rem", color: "#0D0D0D", letterSpacing: 2 }}>
              KEIN PAPALAPAPP MEHR — NUR LEGENDEN.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
