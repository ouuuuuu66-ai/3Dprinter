import { Home, PanelsTopLeft, Sparkles, UserRound } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'workspace', label: '工作台', icon: PanelsTopLeft },
  { key: 'create', label: '创作', icon: Sparkles },
  { key: 'mine', label: '我的', icon: UserRound },
]

export function BottomTabBar() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <nav className="bottom-tabs" aria-label="主导航">
      {tabs.map(({ key, label, icon: Icon }) => {
        const active = key === 'mine' ? location.pathname.startsWith('/mine') : location.pathname === `/tab/${key}`
        return <button key={key} className={active ? 'active' : ''} onClick={() => navigate(key === 'mine' ? '/mine' : `/tab/${key}`)}><Icon /><span>{label}</span></button>
      })}
    </nav>
  )
}
