import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

const DESIGN_WIDTH = 941
const DESIGN_HEIGHT = 1672

function getScale() {
  const margin = window.innerWidth <= 600 ? 0 : 32
  return Math.min(
    (window.innerWidth - margin) / DESIGN_WIDTH,
    (window.innerHeight - margin) / DESIGN_HEIGHT,
    window.innerWidth <= 600 ? 1 : 0.56,
  )
}

export function AppPreview({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(getScale)
  useEffect(() => {
    const onResize = () => setScale(getScale())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const shellStyle = { width: DESIGN_WIDTH * scale, height: DESIGN_HEIGHT * scale } as CSSProperties
  const previewStyle = { transform: `scale(${scale})` } as CSSProperties
  return (
    <main className="preview-stage">
      <div className="app-preview-shell" style={shellStyle}>
        <section className="app-preview" style={previewStyle} aria-label="Ugee Maker 移动端预览">
          {children}
        </section>
      </div>
    </main>
  )
}
