import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Instagram, Mail, MoveUpRight, CalendarCheck } from 'lucide-react'
import logo from '/superui_logo.png'

const CAL_NAMESPACE = 'website-development'
const CAL_LINK = 'superui/website-development'
const CAL_CONFIG = JSON.stringify({ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' })
const SITE_URL = 'https://superui.in/'

// Props that make the button open the Cal.com booking popup on the same page
const calProps = {
  type: 'button',
  'data-cal-namespace': CAL_NAMESPACE,
  'data-cal-link': CAL_LINK,
  'data-cal-config': CAL_CONFIG,
}

// Grain texture (SVG noise) used by the background
const GRAIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --black: #000;
  --white: #fff;
  --gray: #5f5f5f;
  --orange: #ff6a1a;
  --smoke-bg: #fbf7f4;
  --gutter: clamp(14px, 4vw, 40px);
  --radius: 15px;
  --top-h: 78px;
  --bottom-h: 72px;
  --font: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--smoke-bg); color: var(--black); font-family: var(--font); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; height: auto; }
:focus-visible { outline: 2px solid var(--black); outline-offset: 3px; border-radius: var(--radius); }

.page { position: relative; isolation: isolate; overflow: hidden; height: 100vh; height: 100dvh; display: flex; background: var(--smoke-bg); }

/* =====================================================
   Smoke background: orange + white blobs that drift,
   morph and blend, with ribbed vertical stripes + grain
   ===================================================== */
.bg { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; background: var(--smoke-bg); }

.smoke { position: absolute; will-change: transform, border-radius; filter: blur(var(--blur, 70px)); }

/* strong orange: top right */
.s1 { --blur: 80px; width: 80vmax; height: 80vmax; top: -38vmax; right: -34vmax; background: radial-gradient(circle at 40% 40%, #ff4d00 0%, #ff6a1a 45%, rgba(255, 106, 26, 0) 72%); animation: smokeA 16s ease-in-out infinite alternate, morph1 11s ease-in-out infinite alternate; }
/* strong orange: bottom left */
.s2 { --blur: 80px; width: 85vmax; height: 85vmax; bottom: -44vmax; left: -40vmax; background: radial-gradient(circle at 55% 45%, #ff4d00 0%, #ff6a1a 45%, rgba(255, 106, 26, 0) 72%); animation: smokeB 19s ease-in-out infinite alternate, morph2 13s ease-in-out infinite alternate; }
/* soft peach drifting through the middle */
.s3 { --blur: 70px; width: 55vmax; height: 45vmax; top: 22%; left: 12%; background: radial-gradient(circle, rgba(255, 150, 100, 0.85) 0%, rgba(255, 190, 150, 0) 70%); animation: smokeC 23s ease-in-out infinite alternate, morph3 15s ease-in-out infinite alternate; }
/* white clouds that carve the light areas, like the reference */
.s4 { --blur: 90px; width: 60vmax; height: 50vmax; top: -10vmax; left: -22vmax; background: radial-gradient(circle, #fff 0%, rgba(255, 255, 255, 0) 70%); animation: smokeD 21s ease-in-out infinite alternate, morph2 17s ease-in-out infinite alternate; }
.s5 { --blur: 90px; width: 60vmax; height: 50vmax; bottom: -12vmax; right: -22vmax; background: radial-gradient(circle, #fff 0%, rgba(255, 255, 255, 0) 70%); animation: smokeE 25s ease-in-out infinite alternate, morph1 19s ease-in-out infinite alternate; }
/* small hot orange wisp */
.s6 { --blur: 60px; width: 30vmax; height: 30vmax; top: 40%; right: 8%; background: radial-gradient(circle, rgba(255, 77, 0, 0.75) 0%, rgba(255, 77, 0, 0) 70%); animation: smokeF 14s ease-in-out infinite alternate, morph3 9s ease-in-out infinite alternate; }

@keyframes smokeA { 0% { transform: translate(0, 0) rotate(0deg) scale(1); }    50% { transform: translate(-14vmax, 12vmax) rotate(25deg) scale(1.1); }  100% { transform: translate(-26vmax, 26vmax) rotate(50deg) scale(0.9); } }
@keyframes smokeB { 0% { transform: translate(0, 0) rotate(0deg) scale(1); }    50% { transform: translate(16vmax, -12vmax) rotate(-20deg) scale(1.12); } 100% { transform: translate(30vmax, -26vmax) rotate(-45deg) scale(0.92); } }
@keyframes smokeC { 0% { transform: translate(0, 0) rotate(0deg) scale(1); }    50% { transform: translate(20vmax, -10vmax) rotate(40deg) scale(1.25); } 100% { transform: translate(-10vmax, 14vmax) rotate(90deg) scale(0.85); } }
@keyframes smokeD { 0% { transform: translate(0, 0) scale(1); }                 50% { transform: translate(24vmax, 10vmax) scale(1.2); }                 100% { transform: translate(40vmax, 26vmax) scale(0.95); } }
@keyframes smokeE { 0% { transform: translate(0, 0) scale(1); }                 50% { transform: translate(-24vmax, -10vmax) scale(1.2); }               100% { transform: translate(-40vmax, -26vmax) scale(0.95); } }
@keyframes smokeF { 0% { transform: translate(0, 0) scale(1); }                 100% { transform: translate(-30vmax, 16vmax) scale(1.4); } }

@keyframes morph1 { 0% { border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%; } 100% { border-radius: 40% 60% 45% 55% / 60% 40% 60% 40%; } }
@keyframes morph2 { 0% { border-radius: 45% 55% 60% 40% / 55% 45% 55% 45%; } 100% { border-radius: 58% 42% 40% 60% / 42% 58% 42% 58%; } }
@keyframes morph3 { 0% { border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%; } 100% { border-radius: 42% 58% 58% 42% / 45% 55% 45% 55%; } }

/* ribbed vertical stripes like the reference */
.ribs { position: absolute; inset: 0; background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0, rgba(255, 255, 255, 0.22) 2px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0) 7px, rgba(255, 90, 20, 0.05) 7px, rgba(255, 90, 20, 0.05) 11px); mix-blend-mode: soft-light; opacity: 0.9; }
.ribs::after { content: ''; position: absolute; inset: 0; backdrop-filter: blur(1.5px); -webkit-backdrop-filter: blur(1.5px); mask-image: repeating-linear-gradient(90deg, #000 0, #000 3px, transparent 3px, transparent 11px); -webkit-mask-image: repeating-linear-gradient(90deg, #000 0, #000 3px, transparent 3px, transparent 11px); }

/* film grain */
.grain { position: absolute; inset: 0; background-image: ${GRAIN}; background-size: 220px 220px; opacity: 0.16; mix-blend-mode: multiply; animation: grainMove 1.2s steps(6) infinite; }
@keyframes grainMove { 0% { transform: translate(0, 0); } 20% { transform: translate(-3%, 2%); } 40% { transform: translate(2%, -3%); } 60% { transform: translate(-2%, -1%); } 80% { transform: translate(3%, 3%); } 100% { transform: translate(0, 0); } }
.grain { inset: -10%; }

/* ---------- Main: one centered container ---------- */
.main { flex: 1; min-height: 0; overflow-y: auto; display: flex; padding: clamp(16px, 4vh, 56px) var(--gutter); }
.container { width: 100%; max-width: 640px; margin: auto; padding: clamp(28px, 6vh, 64px) clamp(20px, 6vw, 64px); display: flex; flex-direction: column; align-items: center; text-align: center; background: var(--white); color: var(--black);  border-radius: var(--radius); box-shadow: 0 40px 90px -30px rgba(150, 45, 0, 0.5); }
.logo { width: clamp(64px, 11vh, 80px); height: clamp(64px, 11vh, 80px); object-fit: cover; border-radius: var(--radius); }
.brand-name { margin: 14px 0 0; font-size: 0.9375rem; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; }
h1 { margin: clamp(18px, 3.5vh, 32px) 0 0; font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 800; line-height: 1.12; letter-spacing: -0.04em; text-wrap: balance; }
.lead { margin: clamp(14px, 2.5vh, 24px) 0 0; max-width: 46ch; font-size: clamp(0.9375rem, 2vw, 1.125rem); font-weight: 500; line-height: 1.65; color: var(--gray); text-wrap: pretty; }
.btn { cursor: pointer; margin-top: clamp(24px, 4.5vh, 40px); width: 100%; max-width: 360px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 56px; padding: 0 28px; font-family: inherit; font-size: 1.0625rem; font-weight: 700; color: var(--white); background: var(--black); border: 2px solid var(--black); border-radius: var(--radius); transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease; }
.btn:hover { background: var(--white); color: var(--black); transform: translateY(-2px); }
.btn:active { transform: translateY(0) scale(0.98); }

/* ---------- Contact links at the bottom of the container ---------- */
.contact { width: 100%; margin-top: clamp(20px, 3.5vh, 32px); padding-top: clamp(16px, 3vh, 24px); border-top: 2px solid var(--black); display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.contact a { display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; font-size: 0.9375rem; font-weight: 600; border: 2px solid var(--black); border-radius: var(--radius); transition: background 0.2s ease, color 0.2s ease; }
.contact a:hover { background: var(--black); color: var(--white); }

/* ---------- Mobile-only fixed bars (hidden on larger screens) ---------- */
.m-top, .m-bottom { display: none; }

/* ---------- Responsive ---------- */
@media (max-width: 760px) {
  .container { max-width: 560px; }
}

/* Mobile: smaller sizes so everything fits in one screen (100dvh) */
@media (max-width: 560px) {
  .page { padding-top: calc(var(--top-h) + env(safe-area-inset-top, 0px)); padding-bottom: calc(var(--bottom-h) + env(safe-area-inset-bottom, 0px)); }

  .m-top { display: block; position: fixed; top: 0; left: 0; right: 0; z-index: 30; padding: calc(12px + env(safe-area-inset-top, 0px)) var(--gutter) 0; pointer-events: none; }
  .m-top-card { pointer-events: auto; padding: 14px 14px; text-align: center; background: var(--white); color: var(--black);  border-radius: var(--radius); box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.5); }
  .m-top-title { margin: 0; font-size: 0.875rem; font-weight: 800; letter-spacing: -0.01em; line-height: 1.25; }
  .m-top-text { margin: 2px 0 0; font-size: 0.6875rem; font-weight: 500; line-height: 1.3; color: var(--gray); }

  .m-bottom { display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; padding: 12px var(--gutter) calc(12px + env(safe-area-inset-bottom, 0px)); background: var(--white); border-top: 2px solid var(--black); }
  .m-site-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; min-height: 48px; padding: 0 16px; font-size: 0.9375rem; font-weight: 700; color: var(--white); background: var(--orange); border-radius: var(--radius); transition: transform 0.2s ease, filter 0.2s ease; }
  .m-site-btn:active { transform: scale(0.98); filter: brightness(0.95); }

  .smoke { --blur: 45px; }
  .ribs { background-size: auto; }
  .main { padding: 12px var(--gutter); }
  .container { padding: 22px 16px; box-shadow: 0 24px 60px -24px rgba(150, 45, 0, 0.5); }
  .logo { width: 56px; height: 56px; }
  .brand-name { margin-top: 10px; font-size: 0.75rem; letter-spacing: 0.14em; }
  h1 { margin-top: 14px; font-size: 1.5rem; line-height: 1.15; }
  .lead { margin-top: 10px; font-size: 0.875rem; line-height: 1.55; }
  .btn { margin-top: 18px; max-width: none; min-height: 48px; padding: 0 20px; font-size: 0.9375rem; }
  .contact { margin-top: 14px; padding-top: 12px; gap: 6px; }
  .contact a { justify-content: center; padding: 7px 10px; font-size: 0.75rem; gap: 6px; }
}

/* Very small phones */
@media (max-width: 360px) {
  h1 { font-size: 1.3125rem; }
  .lead { font-size: 0.8125rem; }
  .contact a { font-size: 0.6875rem; }
}

/* Short screens (small phones, landscape): tighten vertical space */
@media (max-height: 640px) {
  .main { padding-block: 8px; }
  .container { padding-block: 14px; }
  .logo { width: 44px; height: 44px; }
  .brand-name { margin-top: 6px; }
  h1 { margin-top: 10px; font-size: clamp(1.25rem, 4vw, 1.75rem); }
  .lead { margin-top: 8px; font-size: 0.8125rem; line-height: 1.45; }
  .btn { margin-top: 12px; min-height: 44px; }
  .contact { margin-top: 10px; padding-top: 10px; }
  .contact a { padding: 7px 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .smoke, .grain { animation: none !important; }
  * { transition: none !important; }
}
`

function App() {
  useEffect(() => {
    let active = true
    ;(async function () {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE })
        if (!active) return
        cal('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
        })
      } catch (error) {
        console.error('Cal.com booking could not be initialized.', error)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="page">
      <style>{css}</style>

      {/* Moving smoke background */}
      <div className="bg" aria-hidden="true">
        <span className="smoke s1" />
        <span className="smoke s2" />
        <span className="smoke s3" />
        <span className="smoke s4" />
        <span className="smoke s5" />
        <span className="smoke s6" />
        <span className="ribs" />
        <span className="grain" />
      </div>

      {/* Mobile only: fixed top info */}
      <header className="m-top">
        <div className="m-top-card">
          <p className="m-top-title">Welcome to SuperUI</p>
          <p className="m-top-text">We sell digital products and custom website development</p>
        </div>
      </header>

      <main className="main">
        <section className="container" aria-labelledby="title">
          <img className="logo" src={logo} alt="SuperUI logo" width="88" height="88" />
          <p className="brand-name">SuperUI</p>
          <h1 id="title">Have a web project in mind? Let’s talk it through.</h1>
          <p className="lead">
            Tell us what you’re working on. We’ll talk through your goals, requirements,
            and practical next steps. No big pitch, just a useful conversation.
          </p>
          <button className="btn" {...calProps}>
            <CalendarCheck size={20} className="pointer-events-none" aria-hidden="true" />
            <span className="pointer-events-none">Book call</span>
          </button>

          <nav className="contact" aria-label="Contact">
            <a href="mailto:hello.superui@gmail.com">
              <Mail size={16} aria-hidden="true" /> hello.superui@gmail.com
            </a>
            <a href="https://instagram.com/superui.in" target="_blank" rel="noopener noreferrer">
              <Instagram size={16} aria-hidden="true" /> @superui.in
              <MoveUpRight size={13} aria-hidden="true" />
            </a>
          </nav>
        </section>
      </main>

      {/* Mobile only: fixed bottom website button */}
      <div className="m-bottom">
        <a className="m-site-btn" href={SITE_URL} target="_blank" rel="noopener noreferrer">
          View SuperUI website <MoveUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export default App