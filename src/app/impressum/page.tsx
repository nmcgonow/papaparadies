export const metadata = { title: "Impressum – Papaparadies" };

export default function Impressum() {
  return (
    <main style={{ background: "#FFFBF0", minHeight: "100vh", padding: "60px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Header */}
        <a href="/" style={{
          display: "inline-block", marginBottom: 32,
          fontFamily: "Impact, Arial Black, sans-serif",
          fontSize: "1rem", color: "#0D0D0D", letterSpacing: 2,
          textDecoration: "none", border: "2px solid #0D0D0D",
          padding: "6px 16px", borderRadius: 6,
          boxShadow: "3px 3px 0 #0D0D0D",
        }}>← ZURÜCK</a>

        <h1 style={{
          fontFamily: "Impact, Arial Black, sans-serif",
          fontSize: "3rem", color: "#0D0D0D",
          WebkitTextStroke: "1px #0D0D0D",
          marginBottom: 8,
        }}>IMPRESSUM</h1>

        <div style={{
          height: 4, background: "#FFD60A",
          border: "2px solid #0D0D0D", marginBottom: 40,
          boxShadow: "3px 3px 0 #0D0D0D",
        }}/>

        <div style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "1rem", lineHeight: 1.8, color: "#0D0D0D",
        }}>

          <p style={{ marginBottom: 8 }}>
            <strong>Angaben gemäß § 5 TMG</strong>
          </p>

          <p style={{ marginBottom: 32 }}>
            [Dein Name]<br />
            [Straße Hausnummer]<br />
            [PLZ Ort]<br />
            Deutschland
          </p>

          <p style={{ marginBottom: 8 }}>
            <strong>Kontakt</strong>
          </p>
          <p style={{ marginBottom: 32 }}>
            E-Mail: <a href="mailto:hallo@papaparadies.de" style={{ color: "#0057FF" }}>hallo@papaparadies.de</a>
          </p>

          <p style={{ marginBottom: 8 }}>
            <strong>Inhaltlich Verantwortlicher</strong>
          </p>
          <p style={{ marginBottom: 32 }}>
            [Dein Name] (Anschrift wie oben)
          </p>

          <hr style={{ border: "none", borderTop: "2px solid #0D0D0D", margin: "32px 0" }}/>

          <p style={{ fontSize: "0.85rem", color: "#6B6B6B" }}>
            <strong>Haftungsausschluss:</strong> Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität übernehme ich keine Gewähr.
            Als Diensteanbieter bin ich für eigene Inhalte nach § 7 TMG verantwortlich.
            Für externe Links übernehme ich keine Haftung — zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
          </p>

        </div>
      </div>
    </main>
  );
}
