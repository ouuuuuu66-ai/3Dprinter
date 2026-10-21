import { Bell, ChevronRight, Coins, FolderHeart, House, PenTool, Scissors, Settings, Video, Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BottomTabBar } from '../components/layout/BottomTabBar'
import { ModelCard } from '../components/mine/ModelCard'
import { ProfileCard } from '../components/mine/ProfileCard'
import { useAppState } from '../state/AppStateContext'

const categories = [
  { key: 'prints', label: '我的打印', icon: Printer },
  { key: 'creations', label: '我的创作', icon: PenTool },
  { key: 'favorites', label: '我的收藏', icon: FolderHeart },
  { key: 'slices', label: '我的切片', icon: Scissors },
  { key: 'videos', label: '模型视频', icon: Video },
] as const

export function MinePage() {
  const navigate = useNavigate()
  const { data, unreadCount } = useAppState()
  const [activeCategory, setActiveCategory] = useState<'prints' | 'creations' | 'slices' | 'favorites' | 'videos'>('prints')
  return (
    <div className="screen mine-screen">
      <div className="mine-top-actions">
        <h1>我的</h1>
        <div><button className="icon-button badge-button" onClick={() => navigate('/notifications')} aria-label="通知中心"><Bell />{unreadCount > 0 && <i />}</button><button className="icon-button" onClick={() => navigate('/settings')} aria-label="设置"><Settings /></button></div>
      </div>
      <div className="screen-scroll with-tabs mine-content">
        <ProfileCard />
        <div className="hero-grid"><button className="points-card" onClick={() => navigate('/points')}><span><Coins /><small>积分充值 · 当前积分</small><strong>{data.points}</strong></span><em>去充值 <ChevronRight /></em></button>
        <button className="family-card" onClick={() => navigate('/family')}><span><House /><strong>家庭管理</strong><small>查看家庭与成员</small></span><b>👨‍👩‍👧</b><ChevronRight /></button></div>
        <section className="content-card category-card"><h2>模型分类</h2><div>{categories.map(({ key, label, icon: Icon }) => <button className={activeCategory === key ? 'active' : ''} key={key} onClick={() => setActiveCategory(key)}><span><Icon /></span><small>{label}</small></button>)}</div></section>
        <ModelCard mode={activeCategory} />
      </div>
      <BottomTabBar />
    </div>
  )
}
