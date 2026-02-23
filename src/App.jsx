import { useState, useEffect, useRef } from "react";

// ── Hooks ──────────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Menu", "Gallery", "Testimonials", "Contact"];

const MENU = {
  Coffee: [
    { name: "Espresso Arôme", desc: "Single origin, dark roast", price: "18 MAD" },
    { name: "Café au Lait", desc: "Velvety steamed milk & espresso", price: "25 MAD" },
    { name: "Cappuccino Duo", desc: "House blend with cinnamon foam", price: "28 MAD" },
    { name: "Cold Brew Reserve", desc: "12-hour steep, served on ice", price: "35 MAD" },
  ],
  Breakfast: [
    { name: "Msemen Royal", desc: "Homemade flaky flatbread & honey", price: "30 MAD" },
    { name: "Avocado Toast", desc: "Sourdough, avocado, chili flakes", price: "45 MAD" },
    { name: "Œufs Bénédicte", desc: "Poached eggs, hollandaise, brioche", price: "55 MAD" },
    { name: "Granola Bowl", desc: "Greek yogurt, berries, organic honey", price: "40 MAD" },
  ],
  Brunch: [
    { name: "Brunch Duo Platter", desc: "A curated selection for two", price: "120 MAD" },
    { name: "Shakshuka Marocaine", desc: "Spiced tomatoes, eggs, herbs", price: "60 MAD" },
    { name: "Croque Madame", desc: "Ham, gruyère, béchamel, fried egg", price: "65 MAD" },
    { name: "Pancakes Dorés", desc: "Stacked with maple syrup & fruit", price: "50 MAD" },
  ],
  Desserts: [
    { name: "Tarte au Citron", desc: "Crispy shell, lemon curd, meringue", price: "35 MAD" },
    { name: "Fondant Chocolat", desc: "Warm dark chocolate, vanilla cream", price: "40 MAD" },
    { name: "Cheesecake Argan", desc: "Argan oil infused, berry coulis", price: "45 MAD" },
    { name: "Baklava Fusion", desc: "Classic Moroccan pastry, reimagined", price: "30 MAD" },
  ],
};

const GALLERY_ITEMS = [
  { label: "Interior", span: "col-span-2 row-span-2", bg: "#1a2e1a" },
  { label: "Espresso", span: "", bg: "#2d1a0e" },
  { label: "Pastries", span: "", bg: "#3d2b1a" },
  { label: "Terrace", span: "col-span-2", bg: "#0f2a1a" },
  { label: "Brunch", span: "", bg: "#2a1f0e" },
  { label: "Details", span: "", bg: "#1e2d1a" },
];

const TESTIMONIALS = [
  {
    name: "Yasmine El Fassi",
    role: "Food Blogger, Rabat",
    review: "Arôme Duo is without doubt the most elegant café experience I've had in Morocco. The espresso is divine, the ambiance transports you to Paris while keeping the Moroccan soul.",
    stars: 5,
  },
  {
    name: "Karim Benali",
    role: "Local Resident, Khénifra",
    review: "The brunch platter for two is absolutely incredible. Every weekend I come here — it has become my ritual. The service is warm and professional.",
    stars: 5,
  },
  {
    name: "Sophie Marchand",
    role: "Traveler, Lyon",
    review: "I stumbled upon this gem while passing through Khénifra. The Cheesecake Argan alone is worth the detour. A truly unforgettable stop.",
    stars: 5,
  },
];

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: scrolled ? "14px 5%" : "22px 5%",
      background: scrolled ? "rgba(10,28,20,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(198,167,94,0.2)" : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease",
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", color: "#c6a75e", fontSize: "1.5rem", letterSpacing: "0.05em", cursor: "pointer" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Arôme Duo
      </div>

      {/* Desktop */}
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}
        className="nav-desktop">
        {NAV_LINKS.map(l => (
          <li key={l}>
            <button onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#e8dcc8", fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.95rem", letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "color 0.3s", padding: 0,
            }}
              onMouseEnter={e => e.target.style.color = "#c6a75e"}
              onMouseLeave={e => e.target.style.color = "#e8dcc8"}>
              {l}
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => scrollTo("Contact")} style={{
        background: "transparent", border: "1px solid #c6a75e", color: "#c6a75e",
        padding: "8px 22px", fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
        cursor: "pointer", transition: "all 0.3s", borderRadius: "2px",
      }}
        onMouseEnter={e => { e.target.style.background = "#c6a75e"; e.target.style.color = "#0f3d2e"; }}
        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#c6a75e"; }}
        className="nav-desktop">
        Reserve
      </button>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} className="nav-mobile" style={{
        background: "none", border: "none", cursor: "pointer", color: "#c6a75e", fontSize: "1.5rem"
      }}>
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(10,28,20,0.98)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2.5rem",
          zIndex: 998,
        }}>
          <button onClick={() => setOpen(false)} style={{
            position: "absolute", top: "22px", right: "5%", background: "none",
            border: "none", cursor: "pointer", color: "#c6a75e", fontSize: "1.5rem"
          }}>✕</button>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#e8dcc8", fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem", letterSpacing: "0.08em",
            }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0a1c14 0%, #0f3d2e 40%, #1a4a35 70%, #0d2e20 100%)",
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
        border: "1px solid rgba(198,167,94,0.1)", top: "-100px", right: "-100px", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
        border: "1px solid rgba(198,167,94,0.08)", bottom: "-50px", left: "-80px", pointerEvents: "none"
      }} />

      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      }} />

      <div style={{
        textAlign: "center", zIndex: 1, padding: "90px 5% 0",
        animation: "fadeInUp 1.2s ease both",
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e",
          fontSize: "0.85rem", letterSpacing: "0.4em", textTransform: "uppercase",
          marginBottom: "1.5rem", opacity: 0.9,
        }}>
          Khénifra · Maroc · Est. 2024
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", color: "#f0e6d0",
          fontSize: "clamp(4rem, 10vw, 8rem)", margin: "0 0 0.2em",
          fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em",
        }}>
          Arôme Duo
        </h1>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "1rem", margin: "1.5rem 0 3rem",
        }}>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #c6a75e)" }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)", letterSpacing: "0.2em",
            textTransform: "uppercase", margin: 0,
          }}>
            Café · Petit Déjeuner · Brunch
          </p>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #c6a75e)" }} />
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif", color: "rgba(232,220,200,0.75)",
          fontSize: "clamp(1rem, 2vw, 1.2rem)", maxWidth: "500px", margin: "0 auto 3rem",
          lineHeight: 1.7, fontStyle: "italic",
        }}>
          A sanctuary of flavour and warmth, where every cup tells a story.
        </p>

        <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "14px 36px", background: "#c6a75e", color: "#0f3d2e",
            border: "none", fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.95rem", letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s", fontWeight: 700,
            borderRadius: "2px",
          }}
            onMouseEnter={e => { e.target.style.background = "#d4b870"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(198,167,94,0.3)"; }}
            onMouseLeave={e => { e.target.style.background = "#c6a75e"; e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
            View Menu
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{
            padding: "14px 36px", background: "transparent", color: "#c6a75e",
            border: "1px solid rgba(198,167,94,0.6)", fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.95rem", letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s", borderRadius: "2px",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#c6a75e"; e.target.style.background = "rgba(198,167,94,0.1)"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(198,167,94,0.6)"; e.target.style.background = "transparent"; e.target.style.transform = ""; }}>
            Book a Table
          </button>
        </div>

        <div style={{ marginTop: "5rem", animation: "bounce 2s ease-in-out infinite" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c6a75e" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="about" style={{ background: "#f5efe4", padding: "100px 5%" }}>
      <div ref={ref} style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition: "all 0.9s ease",
      }}>
        {/* Image side */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%", aspectRatio: "3/4", borderRadius: "4px", overflow: "hidden",
            background: "linear-gradient(145deg, #0f3d2e 0%, #1e5c3e 50%, #0a2a1a 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 30px 80px rgba(15,61,46,0.25)",
          }}>
            <div style={{ textAlign: "center", color: "rgba(198,167,94,0.4)" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>☕</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", letterSpacing: "0.2em" }}>CAFÉ PHOTO</p>
            </div>
          </div>
          {/* Offset accent box */}
          <div style={{
            position: "absolute", bottom: "-20px", right: "-20px",
            width: "120px", height: "120px", background: "#c6a75e", borderRadius: "2px",
            zIndex: -1,
          }} />
          <div style={{
            position: "absolute", top: "-15px", left: "-15px",
            border: "1px solid rgba(198,167,94,0.4)", width: "80px", height: "80px", borderRadius: "2px",
          }} />
        </div>

        {/* Text side */}
        <div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e",
            fontSize: "0.8rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem",
          }}>Our Story</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", color: "#0f3d2e",
            fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 1.5rem", lineHeight: 1.15,
          }}>
            Where Flavour<br />Finds Its Soul
          </h2>
          <div style={{ width: "50px", height: "2px", background: "#c6a75e", marginBottom: "2rem" }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", color: "#4a3c2a",
            fontSize: "1.1rem", lineHeight: 1.9, marginBottom: "1.5rem",
          }}>
            Born from a deep love for artisan coffee and the warmth of Moroccan hospitality, Arôme Duo opened its doors in the heart of Khénifra — a city framed by the Atlas Mountains and the Oum Er-Rbia River.
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", color: "#4a3c2a",
            fontSize: "1.1rem", lineHeight: 1.9, marginBottom: "2rem",
          }}>
            Our space blends French bistrot elegance with the rich warmth of Moroccan design. Every corner invites you to slow down, breathe deeply, and savour — the aroma of a perfectly pulled espresso, the sound of soft jazz, the golden light filtering through arched windows.
          </p>
          <div style={{ display: "flex", gap: "3rem" }}>
            {[["15+", "Menu Items"], ["4.9★", "Rating"], ["2024", "Est."]].map(([val, label]) => (
              <div key={label}>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#0f3d2e", fontSize: "1.8rem", margin: 0, fontWeight: 700 }}>{val}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: "4px 0 0" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Menu ───────────────────────────────────────────────────────────────────
function MenuCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0f3d2e" : "#fff",
        border: "1px solid rgba(198,167,94,0.2)",
        borderRadius: "4px", padding: "24px 28px",
        transition: "all 0.35s ease",
        boxShadow: hovered ? "0 20px 50px rgba(15,61,46,0.25)" : "0 4px 16px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "none",
        cursor: "default",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <h4 style={{
          fontFamily: "'Playfair Display', serif",
          color: hovered ? "#f0e6d0" : "#0f3d2e",
          fontSize: "1.05rem", margin: 0, transition: "color 0.35s",
        }}>{item.name}</h4>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#c6a75e", fontSize: "0.95rem", fontWeight: 700,
          whiteSpace: "nowrap", marginLeft: "12px",
        }}>{item.price}</span>
      </div>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        color: hovered ? "rgba(232,220,200,0.7)" : "#7a6a52",
        fontSize: "0.95rem", margin: 0, lineHeight: 1.6, transition: "color 0.35s",
      }}>{item.desc}</p>
    </div>
  );
}

function Menu() {
  const [active, setActive] = useState("Coffee");
  const [ref, visible] = useScrollReveal();
  return (
    <section id="menu" style={{ background: "#0f3d2e", padding: "100px 5%" }}>
      <div ref={ref} style={{
        maxWidth: "1100px", margin: "0 auto",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Savoury & Sweet
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#f0e6d0", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 1.5rem" }}>
            Our Menu
          </h2>
          <div style={{ width: "50px", height: "2px", background: "#c6a75e", margin: "0 auto" }} />
        </div>

        {/* Category Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "50px", flexWrap: "wrap" }}>
          {Object.keys(MENU).map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: "10px 28px", background: active === cat ? "#c6a75e" : "transparent",
              border: `1px solid ${active === cat ? "#c6a75e" : "rgba(198,167,94,0.4)"}`,
              color: active === cat ? "#0f3d2e" : "#c6a75e",
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem",
              letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.3s", borderRadius: "2px", fontWeight: active === cat ? 700 : 400,
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {MENU[active].map(item => <MenuCard key={item.name} item={item} />)}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────────────────
function Gallery() {
  const [ref, visible] = useScrollReveal();
  const COLORS = ["#1a2e1a", "#2d1a0e", "#3d2b1a", "#0f2a1a", "#2a1f0e", "#1e2d1a", "#3a2410", "#0d2518"];
  const EMOJIS = ["🏡", "☕", "🥐", "🌿", "🍳", "✨", "🥗", "🧆"];
  return (
    <section id="gallery" style={{ background: "#f5efe4", padding: "100px 5%" }}>
      <div ref={ref} style={{
        maxWidth: "1100px", margin: "0 auto",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Life at Arôme Duo
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0f3d2e", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 1.5rem" }}>
            Gallery
          </h2>
          <div style={{ width: "50px", height: "2px", background: "#c6a75e", margin: "0 auto" }} />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "200px 200px 200px",
          gap: "16px",
        }}>
          {[
            { colSpan: 2, rowSpan: 2 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 1, rowSpan: 1 },
            { colSpan: 2, rowSpan: 1 },
          ].map((item, i) => (
            <GalleryItem key={i} bg={COLORS[i]} emoji={EMOJIS[i]}
              colSpan={item.colSpan} rowSpan={item.rowSpan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ bg, emoji, colSpan, rowSpan }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`,
        background: bg, borderRadius: "4px", overflow: "hidden",
        position: "relative", cursor: "pointer",
        transform: hov ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.25)" : "0 4px 16px rgba(0,0,0,0.1)",
      }}>
      <span style={{ fontSize: colSpan > 1 ? "4rem" : "2.5rem", opacity: 0.4, transition: "opacity 0.3s", ...(hov ? { opacity: 0.6 } : {}) }}>{emoji}</span>
      <div style={{
        position: "absolute", inset: 0, background: "rgba(198,167,94,0.15)",
        opacity: hov ? 1 : 0, transition: "opacity 0.4s",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: "40px", height: "40px", border: "2px solid #c6a75e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c6a75e" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="testimonials" style={{ background: "#0f3d2e", padding: "100px 5%" }}>
      <div ref={ref} style={{
        maxWidth: "1100px", margin: "0 auto",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>
            What Our Guests Say
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#f0e6d0", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 1.5rem" }}>
            Testimonials
          </h2>
          <div style={{ width: "50px", height: "2px", background: "#c6a75e", margin: "0 auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(198,167,94,0.18)",
              borderRadius: "4px", padding: "36px 32px",
              transition: "all 0.35s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(198,167,94,0.07)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = ""; }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
                {Array(t.stars).fill(0).map((_, j) => (
                  <span key={j} style={{ color: "#c6a75e", fontSize: "1rem" }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", color: "rgba(232,220,200,0.85)",
                fontSize: "1.05rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: "24px",
              }}>
                "{t.review}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #c6a75e, #8a6a20)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 700,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", color: "#f0e6d0", fontSize: "0.95rem", margin: 0, fontWeight: 600 }}>{t.name}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", margin: "2px 0 0", letterSpacing: "0.05em" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(198,167,94,0.25)", borderRadius: "2px",
    color: "#e8dcc8", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.3s",
  };

  return (
    <section id="contact" style={{ background: "#f5efe4", padding: "100px 5%" }}>
      <div ref={ref} style={{
        maxWidth: "1100px", margin: "0 auto",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>
            We'd Love to Host You
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0f3d2e", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 1.5rem" }}>
            Contact & Reserve
          </h2>
          <div style={{ width: "50px", height: "2px", background: "#c6a75e", margin: "0 auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "60px", alignItems: "start" }}>
          {/* Info */}
          <div>
            {[
              { icon: "📍", label: "Location", value: "Avenue Mohammed V, Khénifra\nMoyen Atlas, Maroc" },
              { icon: "📞", label: "Phone", value: "+212 (0) 535 XX XX XX" },
              { icon: "✉️", label: "Email", value: "contact@aromeduo.ma" },
              { icon: "🕐", label: "Hours", value: "Mon–Fri: 7:00 – 21:00\nWeekends: 7:30 – 22:30" },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
                <div style={{
                  width: "44px", height: "44px", background: "#0f3d2e", borderRadius: "2px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#4a3c2a", fontSize: "1rem", margin: 0, lineHeight: 1.6, whiteSpace: "pre-line" }}>{value}</p>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["Instagram", "Facebook"].map(s => (
                <a key={s} href="#" style={{
                  padding: "10px 20px", border: "1px solid rgba(15,61,46,0.3)",
                  borderRadius: "2px", color: "#0f3d2e",
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem",
                  letterSpacing: "0.1em", textDecoration: "none",
                  transition: "all 0.3s", textTransform: "uppercase",
                }}
                  onMouseEnter={e => { e.target.style.background = "#0f3d2e"; e.target.style.color = "#c6a75e"; }}
                  onMouseLeave={e => { e.target.style.background = ""; e.target.style.color = "#0f3d2e"; }}>
                  {s}
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              marginTop: "36px", height: "200px", background: "linear-gradient(135deg, #0f3d2e, #1a5c3e)",
              borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(198,167,94,0.2)",
            }}>
              <div style={{ textAlign: "center", color: "rgba(198,167,94,0.6)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🗺️</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.2em" }}>
                  KHÉNIFRA, MAROC
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: "#0f3d2e", padding: "48px 40px", borderRadius: "4px",
            boxShadow: "0 30px 80px rgba(15,61,46,0.2)",
          }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#f0e6d0", fontSize: "1.6rem", margin: "0 0 8px" }}>
              Book a Table
            </h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(232,220,200,0.6)", fontSize: "0.95rem", margin: "0 0 32px" }}>
              Reserve your experience at Arôme Duo
            </p>

            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#c6a75e", fontSize: "1.2rem" }}>Reservation received!</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(232,220,200,0.7)", fontSize: "0.95rem" }}>We'll confirm shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[
                  { key: "name", label: "Full Name", type: "text" },
                  { key: "email", label: "Email Address", type: "email" },
                  { key: "date", label: "Preferred Date", type: "date" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label style={{ display: "block", fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>{label}</label>
                    <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#c6a75e"}
                      onBlur={e => e.target.style.borderColor = "rgba(198,167,94,0.25)"} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4} style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#c6a75e"}
                    onBlur={e => e.target.style.borderColor = "rgba(198,167,94,0.25)"} />
                </div>
                <button type="submit" style={{
                  marginTop: "8px", padding: "15px", background: "#c6a75e", color: "#0f3d2e",
                  border: "none", fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.95rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  cursor: "pointer", fontWeight: 700, borderRadius: "2px",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.target.style.background = "#d4b870"; e.target.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.target.style.background = "#c6a75e"; e.target.style.transform = ""; }}>
                  Send Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0a1c14", padding: "60px 5% 30px", borderTop: "1px solid rgba(198,167,94,0.15)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "60px", marginBottom: "50px" }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#c6a75e", fontSize: "1.8rem", margin: "0 0 16px" }}>
              Arôme Duo
            </h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(232,220,200,0.6)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "300px", margin: "0 0 24px" }}>
              A sanctuary of flavour and warmth in the heart of Khénifra, Morocco.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {["IG", "FB"].map(s => (
                <a key={s} href="#" style={{
                  width: "36px", height: "36px", border: "1px solid rgba(198,167,94,0.3)",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#c6a75e", fontSize: "0.75rem", fontFamily: "'Cormorant Garamond', serif",
                  textDecoration: "none", fontWeight: 700, transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#c6a75e"; e.currentTarget.style.color = "#0f3d2e"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#c6a75e"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 20px" }}>
              Quick Links
            </h4>
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                display: "block", fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(232,220,200,0.6)", fontSize: "0.95rem", textDecoration: "none",
                marginBottom: "10px", transition: "color 0.3s",
              }}
                onMouseEnter={e => e.target.style.color = "#c6a75e"}
                onMouseLeave={e => e.target.style.color = "rgba(232,220,200,0.6)"}>
                {l}
              </a>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", margin: "0 0 20px" }}>
              Hours
            </h4>
            {[["Mon – Fri", "7:00 – 21:00"], ["Saturday", "7:30 – 22:30"], ["Sunday", "8:00 – 22:30"]].map(([day, hrs]) => (
              <div key={day} style={{ marginBottom: "12px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(232,220,200,0.8)", fontSize: "0.9rem", margin: 0 }}>{day}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c6a75e", fontSize: "0.85rem", margin: "2px 0 0" }}>{hrs}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(198,167,94,0.12)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(232,220,200,0.4)", fontSize: "0.85rem", margin: 0 }}>
            © 2024 Arôme Duo – Café & Bistrot. Khénifra, Maroc.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(198,167,94,0.4)", fontSize: "0.8rem", margin: 0 }}>
            Crafted with ☕ & care
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #f5efe4; overflow-x: hidden; }
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
        @media (max-width: 900px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1.3fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 2fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: unset !important;
          }
        }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
