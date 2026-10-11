import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cal, { getCalApi } from '@calcom/embed-react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import logo from '/superui_logo.png'

const CAL_NAMESPACE = 'website-development'
const CAL_LINK = 'superui/website-development'
const DIRECT_CAL_URL = 'https://cal.com/superui/website-development?overlayCalendar=true'

const css = `
:root {
  --black: #000;
  --white: #fff;
  --gray: #5f5f5f;
  --orange: #ff6a1a;
  --smoke-bg: #fbf7f4;
  --gutter: clamp(14px, 4vw, 40px);
  --radius: 15px;
}

.booking-page {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--smoke-bg);
  color: var(--black);
}

.booking-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px var(--gutter);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.nav-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--black);
  border: 2px solid var(--black);
  border-radius: var(--radius);
  text-decoration: none;
  transition: all 0.2s ease;
}
.nav-back:hover {
  background: var(--black);
  color: var(--white);
}

.nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--black);
  text-decoration: none;
}
.nav-brand img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: cover;
}

.nav-direct {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--gray);
  border-radius: var(--radius);
  background: rgba(0, 0, 0, 0.04);
  text-decoration: none;
  transition: all 0.2s ease;
}
.nav-direct:hover {
  background: rgba(0, 0, 0, 0.08);
  color: var(--black);
}

.booking-container {
  flex: 1;
  padding: clamp(16px, 3vh, 32px) var(--gutter);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.booking-card {
  width: 100%;
  max-width: 980px;
  min-height: 700px;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: 0 30px 80px -25px rgba(150, 45, 0, 0.35);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@media (max-width: 560px) {
  .nav-brand span { display: none; }
  .nav-back { font-size: 0.75rem; padding: 6px 10px; }
  .nav-direct { font-size: 0.75rem; padding: 6px 8px; }
  .booking-container { padding: 10px var(--gutter); }
  .booking-card { min-height: 600px; }
}
`

function OverlayCalendar() {
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
    <div className="booking-page">
      <style>{css}</style>

      {/* Top sticky navigation */}
      <header className="booking-nav">
        <Link to="/" className="nav-back" aria-label="Back to home">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Home</span>
        </Link>

        <Link to="/" className="nav-brand">
          <img src={logo} alt="SuperUI logo" />
          <span>SuperUI</span>
        </Link>

        <a
          href={DIRECT_CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-direct"
          aria-label="Open Cal.com in separate page"
        >
          <span>Open in Cal.com</span>
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </header>

      {/* Main calendar area */}
      <main className="booking-container">
        <div className="booking-card">
          <Cal
            namespace={CAL_NAMESPACE}
            calLink={CAL_LINK}
            style={{ width: '100%', height: '100%', minHeight: '700px', border: 'none' }}
            config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
          />
        </div>
      </main>
    </div>
  )
}

export default OverlayCalendar