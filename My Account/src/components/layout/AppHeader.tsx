import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AppHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <header className="app-header">
      <button className="icon-button" onClick={() => navigate(-1)} aria-label="返回"><ChevronLeft /></button>
      <h1>{title}</h1>
      <div className="header-action">{right}</div>
    </header>
  )
}
